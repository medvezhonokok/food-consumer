package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.backend.annotation.SkipJwt;
import ru.backend.model.News;
import ru.backend.model.User;
import ru.backend.service.FileService;
import ru.backend.service.NewsService;
import ru.backend.service.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {
    private final NewsService newsService;
    private final UserService userService;
    private final FileService fileService;

    public NewsController(NewsService newsService,
                          UserService userService,
                          FileService fileService) {
        this.newsService = newsService;
        this.userService = userService;
        this.fileService = fileService;
    }

    @GetMapping("/all")
    @SkipJwt
    public ResponseEntity<List<News>> getAll() {
        List<News> news = newsService.findAll();
        return ResponseEntity.ok().body(news);
    }

    @PostMapping("/add")
    @SkipJwt
    public synchronized ResponseEntity<String> addNews(@RequestParam("file") MultipartFile file,
                                                       @RequestParam("description") String description,
                                                       @RequestParam("userId") Long userId) {
        User author = userService.findById(userId);

        if (author != null && author.isAdmin()) {
            News news = new News();
            news.setDescription(description);
            news.setAuthor(author);

            try {
                String filePath = fileService.saveImageToStorage(file);
                news.setPathToFile(filePath);
                newsService.addNews(news);
                return ResponseEntity.ok().body("SUCCESS");
            } catch (IOException e) {
                // No operations.
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("FAILED");
    }
}
