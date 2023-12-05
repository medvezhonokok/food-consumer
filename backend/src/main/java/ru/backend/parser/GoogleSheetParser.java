package ru.backend.parser;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
import org.apache.log4j.Logger;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public final class GoogleSheetParser {
    private static final Logger logger = Logger.getLogger(GoogleSheetParser.class);
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY);

    private GoogleSheetParser() {
    }

    private static Credential getCredentials(final NetHttpTransport httpTransport) {
        try {
            InputStream in = GoogleSheetParser.class.getResourceAsStream(CREDENTIALS_FILE_PATH);

            if (in == null) {
                logger.error("No such resource by path: " + CREDENTIALS_FILE_PATH);
                throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
            }

            GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    httpTransport, JSON_FACTORY, clientSecrets, SCOPES)
                    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                    .setAccessType("offline")
                    .build();

            LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();

            return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
        } catch (IOException e) {
            logger.error("Exception while getting google credentials: " + e);
            throw new RuntimeException(e);
        }
    }

    private static List<String> toUTF8StringList(List<Object> list) {
        return list.stream()
                .map(object -> new String(object.toString().getBytes(StandardCharsets.UTF_8)))
                .collect(Collectors.toList());
    }

    public static List<List<String>> getSpreadsheetData(String spreadsheetId, String range) {
        try {
            NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

            logger.info("Started getting spreadsheet[id=" + spreadsheetId + "] data...");

            Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                    .setApplicationName("Google Sheets API")
                    .build();

            ValueRange response = service.spreadsheets().values()
                    .get(spreadsheetId, range)
                    .execute();

            logger.info("Successfully get all spreadsheet[id=" + spreadsheetId + "] data.");

            return response.getValues().stream().map(GoogleSheetParser::toUTF8StringList).collect(Collectors.toList());
        } catch (GeneralSecurityException | IOException e) {
            logger.error("Unexpected exception while parsing spreadsheet[id=" + spreadsheetId + "]: " + e);
            throw new RuntimeException(e);
        }
    }
}
