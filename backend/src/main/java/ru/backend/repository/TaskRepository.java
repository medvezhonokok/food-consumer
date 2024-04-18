package ru.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.backend.model.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query(value = "SELECT * FROM task", nativeQuery = true)
    List<Task> findAll();

    @Transactional
    @Modifying
    @Query(value = "UPDATE task SET user_id=?1 WHERE id=?2", nativeQuery = true)
    void setUserId(Long userId, Long taskId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE task SET is_done=TRUE WHERE id=?1", nativeQuery = true)
    void markAsDone(Long taskId);
}
