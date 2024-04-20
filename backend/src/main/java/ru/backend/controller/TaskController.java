package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.backend.model.Task;
import ru.backend.model.User;
import ru.backend.service.JwtService;
import ru.backend.service.TaskService;
import ru.backend.service.TelegramBotNotifierService;
import ru.backend.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;
    private final JwtService jwtService;
    private final TelegramBotNotifierService notifierService;

    public TaskController(TaskService taskService, UserService userService,
                          JwtService jwtService, TelegramBotNotifierService notifierService) {
        this.taskService = taskService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.notifierService = notifierService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Task>> getTasks() {
        return new ResponseEntity<>(taskService.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/take")
    public synchronized ResponseEntity<String> getTasks(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
        Long taskId = Long.parseLong(String.valueOf(requestBody.get("taskId")));

        Task task = taskService.findById(taskId);
        User user = userService.findById(userId);

        if (task != null && task.getExecutor() == null && user != null) {
            taskService.setUserId(taskId, userId);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("ALREADY_TAKEN", HttpStatus.OK);
        }
    }

    @PostMapping(value = "/mark_as_done")
    public ResponseEntity<String> markTaskAsDone(@RequestBody Map<String, Object> requestBody) {
        long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
        Long taskId = Long.parseLong(String.valueOf(requestBody.get("taskId")));

        Task task = taskService.findById(taskId);
        User user = userService.findById(userId);

        if (task != null && task.getExecutor() != null && task.getExecutor().getId() == userId && user != null) {
            taskService.markAsDone(taskId);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/add_and_assign_to_user")
    public ResponseEntity<String> addAndAssignToUser(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        User user = jwtService.findUserByJWT(jwt);
        long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
        String content = String.valueOf(requestBody.get("content"));
        String time = String.valueOf(requestBody.get("dateTime"));
        User executor = userService.findById(userId);

        if (executor != null && user != null && user.isAdmin()) {
            Task task = new Task();

            task.setContent(content);
            task.setExecutor(executor);
            task.setCreationTime(LocalDateTime.parse(time));

            if (executor.getTelegramChatId() != null) {
                notifierService.sentNotificationToUser(executor.getTelegramChatId(),
                        "У тебя новая задача. Проверь `Tasks`.");
            }

            taskService.save(task);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }

        return new ResponseEntity<>("NOT_ADMIN", HttpStatus.BAD_REQUEST);
    }
}
