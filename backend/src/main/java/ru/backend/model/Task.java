package ru.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.annotation.Nullable;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Nullable
    private LocalDateTime creationTime;

    @NonNull
    private String content;

    private boolean isDone;

    private boolean isPermanent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User executor;
}
