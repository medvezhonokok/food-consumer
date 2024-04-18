package ru.backend.service;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import ru.backend.form.UserCredentials;
import ru.backend.model.User;
import ru.backend.repository.UserRepository;

import java.util.List;

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

    public boolean isPhoneNumberVacant(String phoneNumber) {
        return userRepository.countByPhoneNumber(phoneNumber) == 0;
    }

    public void register(UserCredentials credentials) {
        logger.info("Started to register new user {login=" + credentials.getLogin()
                + ", phoneNumber=" + credentials.getPhoneNumber() + "}");

        User user = new User();

        user.setName(credentials.getName());
        user.setLogin(credentials.getLogin());
        user.setPhoneNumber(credentials.getPhoneNumber());

        user.setManager(credentials.isManager());
        user.setBarista(credentials.isBarista());
        user.setWaiter(credentials.isWaiter());

        userRepository.save(user);
        userRepository.updatePasswordSha(user.getId(), user.getLogin(), credentials.getPassword());

        logger.info("Successfully registered user{login=" + credentials.getLogin() + ", phoneNumber=" + credentials.getPhoneNumber() + "}");
    }

    public void updateUserSettingsById(long userId, UserCredentials userCredentials) {
        String phoneNumber = userCredentials.getPhoneNumber();
        String name = userCredentials.getName();
        String about = userCredentials.getAbout();

        logger.info("Stated updating user settings with id=" + userId + ", name=\"" + name + "\"");

        if (phoneNumber != null && !phoneNumber.isBlank()) {
            userRepository.updatePhoneNumber(userId, phoneNumber);
        }

        if (name != null && !name.isBlank()) {
            userRepository.updateUserName(userId, name);
        }

        if (about != null && !about.isBlank()) {
            userRepository.updateAbout(userId, about);
        }
    }

    public User findUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
