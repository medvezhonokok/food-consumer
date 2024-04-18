package ru.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.backend.model.StopListElement;

@Repository
public interface StopListRepository extends JpaRepository<StopListElement, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE stop_list SET name=?2 WHERE id=?1", nativeQuery = true)
    void updateNameById(Long stopListElementId, String name);
}
