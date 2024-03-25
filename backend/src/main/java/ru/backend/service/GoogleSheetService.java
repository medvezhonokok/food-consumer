package ru.backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
import org.apache.log4j.Logger;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public final class GoogleSheetService {
    private static final Logger logger = Logger.getLogger(GoogleSheetService.class);
    private final ResourceLoader resourceLoader;

    public GoogleSheetService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public List<List<String>> getSpreadsheetData(String spreadsheetId, String range) {
        try {
            Resource resource = resourceLoader.getResource("classpath:/service-account-key.json");
            InputStream inputStream = resource.getInputStream();

            GoogleCredential credential = GoogleCredential.fromStream(inputStream)
                    .createScoped(Collections.singleton(SheetsScopes.SPREADSHEETS_READONLY));

            Sheets service = new Sheets.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance(),
                    credential)
                    .setApplicationName("Google Sheets API")
                    .build();

            ValueRange response = service.spreadsheets().values()
                    .get(spreadsheetId, range)
                    .execute();

            return response.getValues().stream().map(GoogleSheetService::toUTF8StringList).collect(Collectors.toList());
        } catch (NullPointerException | IOException | GeneralSecurityException e) {
            logger.error("Unexpected exception while parsing spreadsheet[id=" + spreadsheetId + "]: " + e);
            return new ArrayList<>();
        }
    }

    private static List<String> toUTF8StringList(List<Object> list) {
        return list.stream()
                .map(object -> new String(object.toString().getBytes(StandardCharsets.UTF_8)))
                .collect(Collectors.toList());
    }
}
