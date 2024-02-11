package ru.backend.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.backend.form.UserCredentials;
import ru.backend.form.validator.UserCredentialsRegisterValidator;
import ru.backend.model.User;
import ru.backend.service.JwtService;
import ru.backend.service.UserService;

import javax.validation.Valid;
import javax.validation.ValidationException;


@RestController
@RequestMapping("/api/1/users")
public class UserController {
    private final JwtService jwtService;
    private final UserService userService;
    private final UserCredentialsRegisterValidator userCredentialsRegisterValidator;

    public UserController(JwtService jwtService,
                          UserService userService,
                          UserCredentialsRegisterValidator userCredentialsRegisterValidator) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.userCredentialsRegisterValidator = userCredentialsRegisterValidator;
    }

    @InitBinder("userCredentialsRegister")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(userCredentialsRegisterValidator);
    }

    @GetMapping("/auth")
    public User findUserByJwt(@RequestParam String jwt) {
        return jwtService.findUserByJWT(jwt);
    }

    @PostMapping
    public void register(@RequestBody @Valid UserCredentials credentials, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().toString());
        }
        userService.register(credentials);
    }
}
