package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.bot.TelegramBot;
import ru.backend.model.User;

import java.util.List;
import java.util.Objects;

@Service
public class TelegramBotNotifierService {
    private final TelegramBot telegramBot;
    private final UserService userService;

    public TelegramBotNotifierService(UserService userService, TelegramBot telegramBot) {
        this.userService = userService;
        this.telegramBot = telegramBot;
    }

    public void sendMessageToEveryone(String message) {
        List<String> chatIds = userService.findAll().stream()
                .filter(Objects::nonNull)
                .map(User::getTelegramChatId)
                .filter(Objects::nonNull)
                .toList();

        if (!chatIds.isEmpty()) {
            for (String chatId : chatIds) {
                telegramBot.sendMessageByChatId(chatId, message);
            }
        }
    }

    public void sentMessageToEveryoneExceptChatId(String message, String chatId) {
        List<String> chatIds = userService.findAll().stream()
                .filter(Objects::nonNull)
                .map(User::getTelegramChatId)
                .filter(telegramChatId -> telegramChatId != null && !telegramChatId.equals(chatId))
                .toList();

        if (!chatIds.isEmpty()) {
            for (String userChatId : chatIds) {
                telegramBot.sendMessageByChatId(userChatId, message);
            }
        }
    }

    public void sentNotificationToUser(String chatId, String message) {
        telegramBot.sendMessageByChatId(chatId, message);
    }
}
