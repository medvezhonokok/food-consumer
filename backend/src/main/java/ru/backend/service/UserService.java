package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.User;
import ru.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
