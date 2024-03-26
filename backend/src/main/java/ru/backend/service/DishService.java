package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.Dish;
import ru.backend.repository.DishRepository;

import java.util.List;

@Service
public class DishService {

    private final DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public List<Dish> getStopList() {
        return dishRepository.findAll();
    }

    public Dish findById(Long dishId) {
        return dishRepository.findById(dishId).orElse(null);
    }

    public void updateNameById(String name, Long dishId) {
        dishRepository.updateNameById(dishId, name);
    }
}
