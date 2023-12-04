package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.Task;
import ru.backend.parser.GoogleSheetParser;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class TaskService {

    // Link to 'tasks' google spreadsheet: https://docs.google.com/spreadsheets/d/1y5PpIKd2fJdDN4d44vTm90nJBI4fB__GDcwUneRpS_I/edit#gid=0
    private static final String SPREADSHEET_ID = "1y5PpIKd2fJdDN4d44vTm90nJBI4fB__GDcwUneRpS_I";
    private static final String SPREADSHEET_RANGE = "A2:Z";

    private static LocalDateTime getLocalDateTime(String date, String time) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("d.M.u"));
        LocalTime localTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("H:m"));

        return localDate.atStartOfDay().plusHours(localTime.getHour()).plusMinutes(localTime.getMinute());
    }

    public List<Task> findAll() throws GeneralSecurityException, IOException {
        List<Task> tasks = new ArrayList<>();
        List<List<String>> spreadsheetData = GoogleSheetParser.getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_RANGE);

        spreadsheetData.stream().filter(row -> row != null && row.size() > 2).forEach(row -> {
            String date = row.get(0);
            String time = row.get(1);

            LocalDateTime dateTime = getLocalDateTime(date, time);
            String collector = IntStream.range(2, row.size()).mapToObj(row::get).collect(Collectors.joining());

            tasks.add(new Task(dateTime, collector));
        });

        return tasks;
    }
}
