package ru.backend;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public class Examples {

    public static void main(String[] args) throws GeneralSecurityException, IOException {
        showFirstExample();
        showSecondExample();
    }

    /**
     * Dumps the first 16 'C' rows of the spreadsheet.
     * <p>
     * Link to spreadsheet is <a href="https://docs.google.com/spreadsheets/d/1qetwX5q3fMc8Lw0LNwluWdsHBNX6jcJ8vUdMYQ05EoU/edit#gid=0">here</a>
     */
    private static void showFirstExample() throws GeneralSecurityException, IOException {
        String spreadsheetId = "1qetwX5q3fMc8Lw0LNwluWdsHBNX6jcJ8vUdMYQ05EoU";
        String range = "public_scores_table!C1:C16";
        dumpSpreadSheetDataByIdAndRange(spreadsheetId, range);
    }

    /**
     * Dumps the first 2 whole columns  of the spreadsheet.
     * <p>
     * Link to spreadsheet is <a href="https://docs.google.com/spreadsheets/d/1PFfkd3B95-gpxjjCW3f0UYIrsWHfGwRh_2GtWz_9bE8/edit?pli=1#gid=0">here</a>
     */
    private static void showSecondExample() throws GeneralSecurityException, IOException {
        String spreadsheetId = "1PFfkd3B95-gpxjjCW3f0UYIrsWHfGwRh_2GtWz_9bE8";
        String range = "Main!A:B";
        dumpSpreadSheetDataByIdAndRange(spreadsheetId, range);
    }

    private static void dumpSpreadSheetDataByIdAndRange(String id, String range) throws IOException, GeneralSecurityException {
        List<List<String>> spreadsheetData = GoogleSheetParser.getSpreadsheetData(id, range);

        spreadsheetData.forEach(strings -> {
            strings.stream().map(string -> string + " ").forEach(System.out::print);
            System.out.println();
        });
    }
}
