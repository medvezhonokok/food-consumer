package ru.backend.service;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import ru.backend.model.Task;
import ru.backend.parser.GoogleSheetParser;

import java.text.ParseException;
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
    private static final Logger logger = Logger.getLogger(TaskService.class);

    // Link to 'tasks' google spreadsheet: https://docs.google.com/spreadsheets/d/1y5PpIKd2fJdDN4d44vTm90nJBI4fB__GDcwUneRpS_I/edit#gid=0
    private static final String SPREADSHEET_ID = "1y5PpIKd2fJdDN4d44vTm90nJBI4fB__GDcwUneRpS_I";
    private static final String SPREADSHEET_RANGE = "A2:Z";

    private final GoogleSheetParser googleSheetParser;

    public TaskService(GoogleSheetParser googleSheetParser) {
        this.googleSheetParser = googleSheetParser;
    }

    private static LocalDateTime getLocalDateTime(String date, String time) throws ParseException {
        try {
            LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("d.M.u"));
            LocalTime localTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("H:m"));

            return localDate.atStartOfDay().plusHours(localTime.getHour()).plusMinutes(localTime.getMinute());
        } catch (Exception ignored) {
            logger.error("Unable to parse date['" + date + "'] or time['" + time + "'], make sure it follows reg.exp: '[d.M.u]' / '[H:m]'");
            throw new ParseException("Bad format for date/time: [" + date + ", " + time + "].", 1);
        }
    }

    public List<Task> findAll() {
        List<Task> tasks = new ArrayList<>();
        List<List<String>> spreadsheetData = googleSheetParser.getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_RANGE);

        spreadsheetData.stream().filter(row -> row != null && row.size() > 2).forEach(row -> {
            String date = row.get(0);
            String time = row.get(1);

            try {
                LocalDateTime dateTime = getLocalDateTime(date, time);
                String collector = IntStream.range(2, row.size()).mapToObj(row::get).collect(Collectors.joining());

                tasks.add(new Task(dateTime, collector));
            } catch (ParseException ignored) {
                // No operations.
            }
        });

        return tasks;
    }
}
