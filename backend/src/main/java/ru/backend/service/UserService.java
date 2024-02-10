package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.form.UserCredentials;
import ru.backend.model.User;
import ru.backend.repository.UserRepository;

@Service
public class UserService {
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
        User user = new User();
        user.setLogin(credentials.getLogin());
        userRepository.save(user);
        userRepository.updatePasswordSha(user.getId(), user.getLogin(), credentials.getPassword());
    }
}
