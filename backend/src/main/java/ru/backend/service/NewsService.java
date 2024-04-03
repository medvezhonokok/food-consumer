package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.News;
import ru.backend.repository.NewsRepository;

import java.util.List;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public List<News> findAll() {
        return newsRepository.findAll();
    }

    public void addNews(News news) {
        newsRepository.save(news);
    }

    public News findById(Long newsId) {
        return newsRepository.findById(newsId).orElse(null);
    }
}
