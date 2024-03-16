package ru.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.model.Task;
import ru.backend.service.TaskService;

import java.util.List;

@RestController
public class TasksPage {
    private final TaskService taskService;

    public TasksPage(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping(value = "/api/tasks")
    public List<Task> getTasks() {
        return taskService.findAll();
    }
}
