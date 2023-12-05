package ru.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.model.Dish;
import ru.backend.service.DishService;

import java.util.List;

@RestController
public class DishesPage {
    private final DishService dishService;

    public DishesPage(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping(value = "dishes")
    public List<Dish> getDishes() {
        return dishService.getStopList();
    }
}
