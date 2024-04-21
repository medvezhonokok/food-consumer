package ru.backend.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.backend.annotation.NotRequireJwtParam;
import ru.backend.exception.ValidationException;
import ru.backend.form.UserCredentials;
import ru.backend.form.validator.UserCredentialsEnterValidator;
import ru.backend.model.User;
import ru.backend.service.JwtService;
import ru.backend.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/2")
public class JwtController {
    private final JwtService jwtService;
    private final UserService userService;
    private final UserCredentialsEnterValidator userCredentialsEnterValidator;

    public JwtController(JwtService jwtService,
                         UserService userService,
                         UserCredentialsEnterValidator userCredentialsEnterValidator) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.userCredentialsEnterValidator = userCredentialsEnterValidator;
    }

    @InitBinder("userCredentials")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(userCredentialsEnterValidator);
    }

    @PostMapping("/jwt")
    @NotRequireJwtParam
    public String enter(@RequestBody @Valid UserCredentials userCredentials, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult);
        }

        User user = userService.findByLoginAndPassword(userCredentials.getLogin(), userCredentials.getPassword());
        return jwtService.create(user);
    }
}
