package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.model.ScheduleItem;
import ru.backend.model.User;
import ru.backend.service.JwtService;
import ru.backend.service.ScheduleService;

import java.util.Set;

@RestController
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final JwtService jwtService;

    public ScheduleController(ScheduleService scheduleService, JwtService jwtService) {
        this.scheduleService = scheduleService;
        this.jwtService = jwtService;
    }

    @GetMapping(value = "/api/schedule")
    public ResponseEntity<Set<ScheduleItem>> getSchedule(@RequestParam String jwt) {
        User user = jwtService.findUserByJWT(jwt);

        if (user != null) {
            return new ResponseEntity<>(scheduleService.getSchedule(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
