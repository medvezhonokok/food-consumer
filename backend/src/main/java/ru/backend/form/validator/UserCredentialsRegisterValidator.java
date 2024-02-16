package ru.backend.form.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.backend.form.UserCredentials;
import ru.backend.service.UserService;

@SuppressWarnings("NullableProblems")
@Component
public class UserCredentialsRegisterValidator implements Validator {
    private final UserService userService;

    public UserCredentialsRegisterValidator(UserService userService) {
        this.userService = userService;
    }

    public boolean supports(Class<?> clazz) {
        return UserCredentials.class.equals(clazz);
    }

    public void validate(Object target, Errors errors) {
        if (!errors.hasErrors()) {
            UserCredentials registerForm = (UserCredentials) target;
            if (!userService.isLoginVacant(registerForm.getLogin())) {
                errors.rejectValue("login",
                        "login-in-use",
                        "Login already in use");
            }

            if (!userService.isPhoneNumberVacant(registerForm.getPhoneNumber())) {
                errors.rejectValue("phoneNumber",
                        "phoneNumber-in-use",
                        "This phone number has already registered");
            }
        }
    }
}
