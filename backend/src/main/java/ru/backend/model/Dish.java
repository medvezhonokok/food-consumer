package ru.backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Dish {

    private String name;

//    private long id;

    public Dish(String name) {
        this.name = name;
    }
}
