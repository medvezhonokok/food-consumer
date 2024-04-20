package ru.backend.bot;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import ru.backend.model.User;
import ru.backend.service.UserService;

@Component
@AllArgsConstructor
@PropertySource("classpath:application.properties")
public class TelegramBot extends TelegramLongPollingBot {

    private final Environment environment;

    @Autowired
    private UserService userService;

    @Override
    public String getBotUsername() {
        return environment.getProperty("telegram.bot.username");
    }

    @SuppressWarnings("deprecation")
    @Override
    public String getBotToken() {
        return environment.getProperty("telegram.bot.token");
    }

    @Override
    public void onUpdateReceived(Update update) {
        // TODO: MAKE THIS EMPTY AFTER INIT ALL USERS CHAT ID...
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            String chatId = String.valueOf(update.getMessage().getChatId());

            String firstName = update.getMessage().getFrom().getFirstName();
            String lastName = update.getMessage().getFrom().getLastName();
            String userName = update.getMessage().getFrom().getUserName();

            System.out.printf("`%s [%s] %s` sent text `%s` with chatId `%s`\n", firstName, userName, lastName, messageText, chatId);
            String[] parts = messageText.split("\\s+");

            switch (parts[0]) {
                case "/start":
                    startCommandReceived(chatId, update.getMessage().getChat().getFirstName());
                    break;
                case "/register":
                    try {
                        Long userId = Long.parseLong(parts[1]);
                        User user = userService.findById(userId);
                        if (user != null && user.getTelegramChatId() == null) {
                            userService.setChatIdByUserId(Long.parseLong(chatId), userId);
                            sendMessageByChatId(chatId, "Ура, зарегистрировано, теперь можно расслабиться");
                        } else {
                            sendMessageByChatId(chatId, "Бля нет, ну введи число просто ```/register 2``` или ```/register 52```, только вставь свой id");
                        }
                    } catch (Exception ignored) {
                        sendMessageByChatId(chatId, "Бля нет, ну введи число просто ```/register 2``` или ```/register 52```, только вставь свой id");
                    }
                    break;
                default:
                    sendMessageByChatId(chatId, ".....чел.... че делаешь?");
                    break;
            }
        }
    }

    // TODO: REMOVE AFTER INIT
    private void startCommandReceived(String chatId, String name) {
        String answer = "Hi, " + name + ", nice to meet you!";
        sendMessageByChatId(chatId, answer);
    }

    public void sendMessageByChatId(String chatId, String textToSend) {
        SendMessage sendMessage = new SendMessage();
        sendMessage.setChatId(chatId);
        sendMessage.setText(textToSend);
        try {
            execute(sendMessage);
        } catch (TelegramApiException ignored) {
            // NO OPERATIONS.
        }
    }
}
