package ru.backend.controller;

import org.springframework.web.bind.annotation.*;
import ru.backend.model.PermanentTask;
import ru.backend.model.Task;
import ru.backend.model.User;
import ru.backend.service.TaskService;
import ru.backend.service.UserService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
public class TaskController {
    private final TaskService taskService;

    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping(value = "/api/tasks")
    public List<Task> getTasks() {
        return taskService.findAll();
    }

    @GetMapping(value = "/api/perm_tasks")
    public List<PermanentTask> getPermanentTasks() {
        return taskService.getPermanentTasks();
    }

    @PostMapping(value = "/api/take_or_return_task")
    public synchronized String takeOrReturnTask(@RequestParam(name = "taskId") Long taskId,
                                                @RequestParam(name = "userId") Long userId) {
        PermanentTask task = taskService.findPermanentTaskById(taskId);

        // TODO: ADD LOGGING
        if (task.getUserId() == null) {
            taskService.updateUserId(taskId, userId);
            return "OK";
        } else if (!task.getUserId().equals(userId)) {
            return "ALREADY_TAKEN";
        } else {
            taskService.updateUserId(taskId, null);
            return "OK";
        }
    }

    @PostMapping(value = "/api/remove_task")
    public void removeTaskById(@RequestParam(name = "taskId") Long taskId,
                               @RequestParam(name = "userId") Long userId) {
        User user = userService.findById(userId);

        if (user != null && user.isAdmin()) {
            taskService.removePermanentTaskById(taskId);
        }
    }

    @PostMapping(value = "/api/add_new_perm_task")
    public void addNewPermanentTask(@RequestBody Map<String, Object> requestBody) {
        String content = (String) requestBody.get("content");
        String dateTimeString = (String) requestBody.get("time");
        Long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));

        User user = userService.findById(userId);
        if (user != null && user.isAdmin()) {
            PermanentTask task = new PermanentTask();

            LocalDateTime taskTime = LocalDateTime.parse(dateTimeString, DateTimeFormatter.ISO_LOCAL_DATE_TIME);

            task.setCreationTime(taskTime);
            task.setContent(content);

            taskService.save(task);
        }
    }

}
