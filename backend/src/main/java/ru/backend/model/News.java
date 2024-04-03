package ru.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "news")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(min = 1, max = 250)
    private String description;

    @NotEmpty
    @Size(min = 1, max = 250)
    private String pathToFile;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    @JsonManagedReference
    @OneToMany(mappedBy = "news")
    private List<Comment> comments;

    @CreationTimestamp
    private LocalDateTime creationTime;
}
