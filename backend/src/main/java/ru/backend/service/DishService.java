package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.Dish;
import ru.backend.parser.GoogleSheetParser;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class DishService {

    // Link to 'tasks' google spreadsheet: https://docs.google.com/spreadsheets/d/1IcdPgskjx4qDOF-SgHK_-cOH5Ua5iKgV9_i-bf2zE00/edit#gid=0
    private static final String SPREADSHEET_ID = "1IcdPgskjx4qDOF-SgHK_-cOH5Ua5iKgV9_i-bf2zE00";
    private static final String SPREADSHEET_RANGE = "A2:Z";

    public List<Dish> getStopList() throws GeneralSecurityException, IOException {
        List<Dish> dishes = new ArrayList<>();
        List<List<String>> spreadsheetData = GoogleSheetParser.getSpreadsheetData(SPREADSHEET_ID, SPREADSHEET_RANGE);

        spreadsheetData.stream().filter(obj -> Objects.nonNull(obj) && !obj.isEmpty()).forEach(row -> {
            String name = String.join("", row);
            
            if (!name.isBlank()) {
                dishes.add(new Dish(name));
            }
        });

        return dishes;
    }
}
