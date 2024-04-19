package ru.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.backend.model.CheckList;

import java.util.List;

@Repository
public interface CheckListRepository extends JpaRepository<CheckList, Long> {
    @Query(value = "SELECT * FROM check_list", nativeQuery = true)
    List<CheckList> findAll();

    @Transactional
    @Modifying
    @Query(value = "UPDATE check_list SET user_id=?1 WHERE id=?2", nativeQuery = true)
    void setUserId(Long userId, Long checkListId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE check_list SET is_done=TRUE WHERE id=?1", nativeQuery = true)
    void markAsDone(Long checkListId);
}
