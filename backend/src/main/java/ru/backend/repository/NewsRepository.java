package ru.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.backend.model.News;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
}
