package ru.backend.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "User")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(name = "handle")
    private String handle;

    @Column(name = "isManager")
    private boolean isManager;

    @Column(name = "isWaiter")
    private boolean isWaiter;
}
