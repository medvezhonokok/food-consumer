package ru.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "check_list")
public class CheckList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "ENUM('MORNING', 'DAY', 'EVENING')")
    @Enumerated(EnumType.STRING)
    private CheckListType type;

    @NonNull
    private String content;

    private boolean isDone;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User executor;
}
