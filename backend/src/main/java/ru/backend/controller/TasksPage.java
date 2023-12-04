package ru.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.backend.model.Task;
import ru.backend.service.TaskService;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@Controller
public class TasksPage {
    private final TaskService taskService;

    public TasksPage(TaskService taskService) {
        this.taskService = taskService;
    }

    @ResponseBody
    @GetMapping(value = "tasks")
    public List<Task> getTasksOrNull() {
        List<Task> tasks = null;

        try {
            tasks = taskService.findAll();
        } catch (GeneralSecurityException | IOException ignored) {
            // No operations.
        }

        return tasks;
    }
}
