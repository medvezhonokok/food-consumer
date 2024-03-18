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

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof ScheduleItem item) {
            return item.getInfo().equals(info) && item.getWorkerName().equals(workerName)
                    && item.getRole() == role && item.waiter == waiter;
        }

        return false;
    }
}
