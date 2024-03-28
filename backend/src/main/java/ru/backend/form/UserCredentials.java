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
    @Size(min = 6, max = 36)
    private String name;

    @NotEmpty
    @Size(min = 1, max = 60)
    private String password;

    @NotEmpty
    @Size(min = 3, max = 12)
    @Pattern(regexp = "[+]?[0-9]+", message = "Excepted numbers or plus")
    private String phoneNumber;

    @Size(max = 250)
    private String about;

    private boolean isManager;

    private boolean isWaiter;

    private boolean isBarista;
}
