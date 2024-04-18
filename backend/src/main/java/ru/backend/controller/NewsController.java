package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.backend.model.Comment;
import ru.backend.model.News;
import ru.backend.model.User;
import ru.backend.service.*;

import java.io.IOException;
import java.util.List;

@RestController
public class NewsController {
    private final NewsService newsService;
    private final UserService userService;
    private final JwtService jwtService;
    private final FileService fileService;
    private final CommentService commentService;

    public NewsController(NewsService newsService, UserService userService, JwtService jwtService, FileService fileService, CommentService commentService) {
        this.newsService = newsService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.fileService = fileService;
        this.commentService = commentService;
    }

    @GetMapping("/api/news")
    public ResponseEntity<List<News>> getAll(@RequestParam String jwt) {
        User user = jwtService.findUserByJWT(jwt);

        if (user != null) {
            List<News> news = newsService.findAll();
            return ResponseEntity.ok().body(news);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/api/news/add")
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

    @PostMapping("/api/news/add_comment_{newsId}")
    public ResponseEntity<String> addComment(@PathVariable("newsId") Long newsId,
                                             @RequestParam("text") String text,
                                             @RequestParam("userId") Long userId) {
        News news = newsService.findById(newsId);
        User commentAuthor = userService.findById(userId);

        if (news != null && commentAuthor != null) {
            Comment comment = new Comment();

            comment.setAuthor(commentAuthor);
            comment.setText(text);
            comment.setNews(news);
            news.getComments().add(comment);

            commentService.save(comment);
            return ResponseEntity.ok().body("SUCCESS");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add comment");
    }
}
