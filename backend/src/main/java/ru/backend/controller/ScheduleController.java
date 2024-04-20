package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.model.ScheduleItem;
import ru.backend.service.ScheduleService;

import java.util.Set;

@RestController
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping(value = "/api/schedule")
    public ResponseEntity<Set<ScheduleItem>> getSchedule() {
        return new ResponseEntity<>(scheduleService.getSchedule(), HttpStatus.OK);
    }
}
