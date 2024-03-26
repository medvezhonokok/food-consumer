package ru.backend.controller;

import org.springframework.web.bind.annotation.*;
import ru.backend.model.Dish;
import ru.backend.service.DishService;

import java.util.List;
import java.util.Map;

@RestController
public class DishController {
    private final DishService dishService;

    public DishController(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping(value = "/api/dishes")
    public List<Dish> getDishes() {
        return dishService.getStopList();
    }

    @PostMapping(value = "/api/update_dish")
    public void updateDish(@RequestBody Map<String, Object> requestBody) {
        String name = String.valueOf(requestBody.get("name"));
        Long dishId = Long.parseLong(String.valueOf(requestBody.get("dishId")));

        Dish dish = dishService.findById(dishId);

        if (dish != null) {
            dishService.updateNameById(name, dishId);
        }
    }
}
