package ru.backend.service;

import lombok.Getter;
import org.apache.log4j.Logger;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import ru.backend.model.Month;
import ru.backend.model.Role;
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
    private static final String SPREADSHEET_SCHEDULE_DATE_HEADER_RANGE = "MO5:NT7";

    private static final String SPREADSHEET_WORKER_WAITER_RANGE = "B30:B40";
    private static final String SPREADSHEET_SCHEDULE_DATE_BODY_WAITER_RANGE = "MO30:NT40";

    private static final String SPREADSHEET_WORKER_BARISTA_RANGE = "B15:B19";
    private static final String SPREADSHEET_SCHEDULE_DATE_BODY_BARISTA_RANGE = "MO15:NT19";

    private static final String SPREADSHEET_WORKER_MANAGER_RANGE = "B9:B12";
    private static final String SPREADSHEET_SCHEDULE_DATE_BODY_MANAGER_RANGE = "MO9:NT12";

    private final GoogleSheetParser googleSheetParser;

    @Getter
    private final Set<ScheduleItem> schedule = new HashSet<>();


    public ScheduleService(GoogleSheetParser googleSheetParser) {
        this.googleSheetParser = googleSheetParser;

        long before = System.currentTimeMillis();

        List<String> waiters = getWorkerListBySpreadSheetRange(SPREADSHEET_WORKER_WAITER_RANGE);
        List<String> baristas = getWorkerListBySpreadSheetRange(SPREADSHEET_WORKER_BARISTA_RANGE);
        List<String> managers = getWorkerListBySpreadSheetRange(SPREADSHEET_WORKER_MANAGER_RANGE);

        logger.info(("Successfully get spreadsheet `workers` data from spreadsheet. "
                + "Total workers count is: %d").formatted(waiters.size() + baristas.size() + managers.size()));

        List<List<String>> scheduleHeader = googleSheetParser
                .getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_SCHEDULE_DATE_HEADER_RANGE);

        List<List<String>> mainWaiterSchedule = googleSheetParser
                .getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_SCHEDULE_DATE_BODY_WAITER_RANGE);

        List<List<String>> mainBaristaSchedule = googleSheetParser
                .getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_SCHEDULE_DATE_BODY_BARISTA_RANGE);

        List<List<String>> mainManagerSchedule = googleSheetParser
                .getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_SCHEDULE_DATE_BODY_MANAGER_RANGE);

        logger.info("Successfully get spreadsheet `schedule` data from spreadsheet.");

        java.time.Month predMonth = getEnglishUpperCaseMonthOrNull(scheduleHeader.get(0).get(0).trim().toUpperCase());

        if (predMonth == null) {
            logger.error("Cannot parse initial month.");
            throw new RuntimeException("Bad `initial month` parse result");
        } else {
            logger.info("Started parsing spreadsheet schedule data with month: '" + predMonth.name() + "'.");
        }

        addWorkersSchedule(waiters, mainWaiterSchedule, scheduleHeader, predMonth, schedule, Role.WAITER);
        addWorkersSchedule(baristas, mainBaristaSchedule, scheduleHeader, predMonth, schedule, Role.BARISTA);
        addWorkersSchedule(managers, mainManagerSchedule, scheduleHeader, predMonth, schedule, Role.MANAGER);

        long after = System.currentTimeMillis();

        logger.info("Successfully sent " + schedule.size() + " schedule items in " + (after - before) + "ms.");
    }

    @NonNull
    private List<String> getWorkerListBySpreadSheetRange(String spreadSheetRange) {
        return googleSheetParser.getSpreadsheetData(SPREADSHEET_ID, spreadSheetRange)
                .stream().filter(workerName -> workerName != null && workerName.size() == 1)
                .map(workerName -> workerName.get(0)).toList();
    }

    private void addWorkersSchedule(List<String> workers,
                                    List<List<String>> mainSchedule,
                                    List<List<String>> scheduleHeader,
                                    java.time.Month predMonth,
                                    Set<ScheduleItem> schedule,
                                    Role role) {
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
                    int scheduleItemYear = 2024;

                    LocalDateTime dateTime = LocalDateTime.of(scheduleItemYear, scheduleItemMonth, scheduleItemDay, 0, 0);
                    schedule.add(new ScheduleItem(workers.get(i), dateTime, mainSchedule.get(i).get(j), role));
                }

                scheduleDateIndex++;
            }
        }
    }


    private java.time.Month getEnglishUpperCaseMonthOrNull(String monthName) {
        if (monthName != null) {
            return Arrays.stream(Month.values()).filter(month -> month.name().equals(monthName.toUpperCase().trim())).findFirst()
                    .map(Month::getMonth).orElse(null);
        }

        return null;
    }
}