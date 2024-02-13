package ru.backend.service;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import ru.backend.form.UserCredentials;
import ru.backend.model.User;
import ru.backend.repository.UserRepository;

@Service
public class UserService {
    private static final Logger logger = Logger.getLogger(UserService.class);
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByLoginAndPassword(String login, String password) {
        return login == null || password == null ? null : userRepository.findByLoginAndPassword(login, password);
    }

    public User findById(Long id) {
        return id == null ? null : userRepository.findById(id).orElse(null);
    }

    public boolean isLoginVacant(String login) {
        return userRepository.countByLogin(login) == 0;
    }

    public void register(UserCredentials credentials) {
        logger.info("Started to register new user {login=" + credentials.getLogin() + ", phoneNumber=" + credentials.getPhoneNumber() + "}");

        User user = new User();
        user.setLogin(credentials.getLogin());
        user.setPhoneNumber(credentials.getPhoneNumber());

        userRepository.save(user);
        userRepository.updatePasswordSha(user.getId(), user.getLogin(), credentials.getPassword());

        logger.info("Successfully registered user{login=" + credentials.getLogin() + ", phoneNumber=" + credentials.getPhoneNumber() + "}");
    }

    public void updateUserSettingsById(long userId, String phoneNumber) {
        logger.info("Stated updating user settings with id=" + userId + ", updated phoneNumber=" + phoneNumber);

        userRepository.updatePhoneNumber(userId, phoneNumber);
    }

    public User findUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }
}
