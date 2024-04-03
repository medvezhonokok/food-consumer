package ru.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.backend.model.News;
import ru.backend.model.User;
import ru.backend.service.NewsService;
import ru.backend.service.UserService;
import ru.backend.utils.FileUtils;

import java.io.IOException;
import java.util.List;

@RestController
public class NewsController {
    private final NewsService newsService;
    private final UserService userService;

    public NewsController(NewsService newsService, UserService userService) {
        this.newsService = newsService;
        this.userService = userService;
    }

    @GetMapping("/api/news")
    public List<News> getAll() {
        return newsService.findAll();
    }

    @PostMapping("/api/news/add")
    public synchronized void addNews(@RequestParam("file") MultipartFile file,
                        @RequestParam("description") String description,
                        @RequestParam("userId") Long userId) {
        User author = userService.findById(userId);

        if (author != null && author.isAdmin()) {
            News news = new News();
            news.setDescription(description);
            news.setAuthor(author);
            try {
                String filePath = FileUtils.saveFileAndGetOriginalName(file);
                news.setPathToFile(filePath);
                newsService.addNews(news);
            } catch (IOException e) {
                // No operations.
            }
        }
    }
}
