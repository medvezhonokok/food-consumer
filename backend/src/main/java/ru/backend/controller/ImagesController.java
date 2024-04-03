package ru.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImagesController {
    private static final String IMAGE_DIRECTORY = "/root/food-consumer/backend/src/main/resources/static/images/";

    @GetMapping("/images/{fileName:.+}")
    @ResponseBody
    public synchronized ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        Path filePath = Paths.get(IMAGE_DIRECTORY + fileName);
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);
                return new ResponseEntity<>(resource, headers, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
