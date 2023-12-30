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

//    private long id;


    public ScheduleItem(String workerName, LocalDateTime creationTime, String info) {
        this.workerName = workerName;
        this.creationTime = creationTime;
        this.info = info;
    }
}
