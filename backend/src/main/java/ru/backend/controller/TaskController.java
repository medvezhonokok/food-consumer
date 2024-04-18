package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.backend.model.Task;
import ru.backend.model.User;
import ru.backend.service.JwtService;
import ru.backend.service.TaskService;
import ru.backend.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;
    private final JwtService jwtService;

    public TaskController(TaskService taskService, UserService userService, JwtService jwtService) {
        this.taskService = taskService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Task>> getTasks(@RequestParam String jwt) {
        if (jwtService.findUserByJWT(jwt) != null) {
            return new ResponseEntity<>(taskService.findAll(), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/take")
    public synchronized ResponseEntity<String> getTasks(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        if (jwtService.findUserByJWT(jwt) != null) {
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

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/mark_as_done")
    public ResponseEntity<String> markTaskAsDone(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        if (jwtService.findUserByJWT(jwt) != null) {
            long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
            Long taskId = Long.parseLong(String.valueOf(requestBody.get("taskId")));

            Task task = taskService.findById(taskId);
            User user = userService.findById(userId);

            if (task != null && task.getExecutor() != null && task.getExecutor().getId() == userId && user != null) {
                taskService.markAsDone(taskId);
                return new ResponseEntity<>("OK", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/add_and_assign_to_user")
    public ResponseEntity<String> addAndAssignToUser(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        User user = jwtService.findUserByJWT(jwt);
        long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
        String content = String.valueOf(requestBody.get("content"));
        User executor = userService.findById(userId);

        if (executor != null && user != null && user.isAdmin()) {
            Task task = new Task();

            task.setContent(content);
            task.setPermanent(false);
            task.setDone(false);
            task.setExecutor(executor);

            taskService.save(task);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }

        return new ResponseEntity<>("NOT_ADMIN", HttpStatus.BAD_REQUEST);
    }
}
