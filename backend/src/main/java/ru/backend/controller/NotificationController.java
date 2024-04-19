package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.backend.model.User;
import ru.backend.service.JwtService;
import ru.backend.service.TelegramBotNotifierService;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications/")
public class NotificationController {
    private final JwtService jwtService;
    private final TelegramBotNotifierService notifierService;

    public NotificationController(JwtService jwtService, TelegramBotNotifierService notifierService) {
        this.notifierService = notifierService;
        this.jwtService = jwtService;
    }

    @PostMapping(value = "/sent")
    public ResponseEntity<String> sentNotification(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        User user = jwtService.findUserByJWT(jwt);
        String message = (String) requestBody.get("message");

        if (user != null && message != null && user.getTelegramChatId() != null) {
            notifierService.sentMessageToEveryoneExceptChatId(message, user.getTelegramChatId());
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
