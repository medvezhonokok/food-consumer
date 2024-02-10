package ru.backend.service;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import ru.backend.model.Month;
import ru.backend.model.ScheduleItem;
import ru.backend.parser.GoogleSheetParser;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ScheduleService {
    private static final Logger logger = Logger.getLogger(ScheduleService.class);

    // Link to 'tasks' google spreadsheet: https://docs.google.com/spreadsheets/d/17bOXz5NI-1QTsRJNjKb-7F67jbjswHqC0zEtBkjjrfY/edit#gid=592135575
    private static final String SPREADSHEET_ID = "17bOXz5NI-1QTsRJNjKb-7F67jbjswHqC0zEtBkjjrfY";
    private static final String SPREADSHEET_WORKER_RANGE = "B30:B40";
    private static final String SPREADSHEET_SCHEDULE_DATE_HEADER_RANGE = "KT5:NK7";
    private static final String SPREADSHEET_SCHEDULE_DATE_BODY_RANGE = "KT30:NK40";

    public Set<ScheduleItem> getSchedule() {
        long before = System.currentTimeMillis();
        Set<ScheduleItem> schedule = new HashSet<>();

        List<String> workers = GoogleSheetParser.getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_WORKER_RANGE)
                .stream().filter(workerName -> workerName != null && workerName.size() == 1)
                .map(workerName -> workerName.get(0)).toList();

        logger.info("Successfully get spreadsheet `workers` data from spreadsheet.");

        List<List<String>> scheduleHeader = GoogleSheetParser
                .getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_SCHEDULE_DATE_HEADER_RANGE);

        List<List<String>> mainSchedule = GoogleSheetParser
                .getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_SCHEDULE_DATE_BODY_RANGE);

        logger.info("Successfully get spreadsheet `schedule` data from spreadsheet.");

        java.time.Month predMonth = getEnglishUpperCaseMonthOrNull(scheduleHeader.get(0).get(0).trim().toUpperCase());

        if (predMonth == null) {
            logger.error("Cannot parse initial month.");
            throw new RuntimeException("Bad `initial month` parse result");
        } else {
            logger.info("Stated parsing spreadsheet schedule data with month: '" + predMonth.name() + "'.");
        }

        for (int i = 0; i < workers.size(); i++) {
            int scheduleDateIndex = 0;

            for (int j = 0; j < mainSchedule.get(i).size(); j++) {
                java.time.Month scheduleItemMonth = null;

                try {
                    scheduleItemMonth = getEnglishUpperCaseMonthOrNull(scheduleHeader.get(0).get(scheduleDateIndex));
                } catch (Exception ignored) {
                    // No operations.
                }

                if (scheduleItemMonth != null) {
                    predMonth = scheduleItemMonth;
                } else {
                    scheduleItemMonth = predMonth;
                }

                if (mainSchedule.get(i).get(j) != null && !mainSchedule.get(i).get(j).isEmpty()) {
                    int scheduleItemDay = Integer.parseInt(scheduleHeader.get(2).get(scheduleDateIndex));
                    int scheduleItemYear = 2023;

                    if (!scheduleItemMonth.equals(java.time.Month.DECEMBER)) {
                        scheduleItemYear = 2024;
                    }

                    LocalDateTime dateTime = LocalDateTime.of(scheduleItemYear, scheduleItemMonth, scheduleItemDay, 0, 0);
                    schedule.add(new ScheduleItem(workers.get(i), dateTime, mainSchedule.get(i).get(j)));
                }

                scheduleDateIndex++;
            }
        }
        long after = System.currentTimeMillis();

        logger.info("Successfully sent " + schedule.size() + " schedule items in " + (after - before) + "ms.");

        return schedule;
    }


    private java.time.Month getEnglishUpperCaseMonthOrNull(String monthName) {
        if (monthName != null) {
            return Arrays.stream(Month.values()).filter(month -> month.name().equals(monthName.toUpperCase().trim())).findFirst()
                    .map(Month::getMonth).orElse(null);
        }

        return null;
    }
}