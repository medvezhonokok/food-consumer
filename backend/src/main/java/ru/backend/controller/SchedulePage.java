package ru.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.model.ScheduleItem;
import ru.backend.service.ScheduleService;

import java.util.Set;

@RestController
public class SchedulePage {
    private final ScheduleService scheduleService;

    public SchedulePage(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping(value = "schedule")
    public Set<ScheduleItem> getSchedule() {
        return scheduleService.getSchedule();
    }
}
