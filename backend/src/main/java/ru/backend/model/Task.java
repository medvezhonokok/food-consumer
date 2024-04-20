package ru.backend.model;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String content;

    private boolean isDone;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User executor;

    @Nullable
    private LocalDateTime creationTime;

    @Nullable
    @Column(columnDefinition = "ENUM('MORNING', 'DAY', 'EVENING')")
    @Enumerated(EnumType.STRING)
    private PermanentTaskType type;

    private boolean isPermanent;
}
