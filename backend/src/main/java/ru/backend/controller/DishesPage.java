package ru.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.model.Dish;
import ru.backend.service.DishService;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class DishesPage {
    private final DishService dishService;

    public DishesPage(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping(value = "dishes")
    public List<Dish> getDishes() {
        List<Dish> dishes = new ArrayList<>();

        try {
            dishes = dishService.getStopList();
        } catch (GeneralSecurityException | IOException ignored) {
            // No operations.
        }

        return dishes;
    }
}
