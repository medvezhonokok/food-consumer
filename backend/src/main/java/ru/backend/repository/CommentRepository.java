package ru.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.backend.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
//    @Transactional
//    @Modifying
//    @Query(value = "UPDATE stop_list SET name=?2 WHERE id=?1", nativeQuery = true)
//    void updateNameById(Long dishId, String name);
}
