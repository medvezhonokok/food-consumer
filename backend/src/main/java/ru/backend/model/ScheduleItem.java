package ru.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ScheduleItem {
    private String workerName;

    private LocalDateTime creationTime;

    private String info;

    private boolean waiter;

    private Role role;

    public ScheduleItem(String workerName, LocalDateTime creationTime, String info, Role role) {
        this.workerName = workerName;
        this.creationTime = creationTime;
        this.info = info;
        this.role = role;
    }
}
