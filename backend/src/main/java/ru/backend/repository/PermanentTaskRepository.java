package ru.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.backend.model.PermanentTask;
import ru.backend.model.User;

import java.util.List;

@Repository
public interface PermanentTaskRepository extends JpaRepository<PermanentTask, Long> {
    @Query(value = "SELECT * FROM perm_task", nativeQuery = true)
    List<PermanentTask> findAll();

    @Transactional
    @Modifying
    @Query(value = "UPDATE perm_task SET user_id=?2 WHERE id=?1", nativeQuery = true)
    void updateUserIdByTaskId(Long taskId, Long userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE perm_task SET user_id = null", nativeQuery = true)
    void resetUserId();
}
