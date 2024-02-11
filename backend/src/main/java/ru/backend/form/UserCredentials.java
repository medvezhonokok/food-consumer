package ru.backend.form;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Setter
@Getter
public class UserCredentials {
    @NotEmpty
    @Size(min = 2, max = 24)
    @Pattern(regexp = "[a-zA-Z]{2,24}", message = "Expected Latin letters")
    private String login;

    @NotEmpty
    @Size(min = 1, max = 60)
    private String password;

    @NotEmpty
    @Size(min = 3, max = 12)
    @Pattern(regexp = "[+]?[0-9]+", message = "Excepted numbers or plus")
    private String phoneNumber;
}
