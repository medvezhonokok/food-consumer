package ru.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.model.Task;
import ru.backend.service.TaskService;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TasksPage {
    private final TaskService taskService;

    public TasksPage(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping(value = "tasks")
    public List<Task> getTasks() {
        List<Task> tasks = new ArrayList<>();

        try {
            tasks = taskService.findAll();
        } catch (GeneralSecurityException | IOException ignored) {
            // No operations.
        }

        return tasks;
    }
}
