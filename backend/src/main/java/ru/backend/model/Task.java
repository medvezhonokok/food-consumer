package ru.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Task {

    private LocalDateTime creationTime;

    private String content;

    public Task(LocalDateTime creationTime, String content) {
        this.creationTime = creationTime;
        this.content = content;
    }
}
