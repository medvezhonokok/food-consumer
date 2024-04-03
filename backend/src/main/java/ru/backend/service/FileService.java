package ru.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    public String saveImageToStorage(MultipartFile imageFile) throws IOException {
        String uploadDirectory = "/root/food-consumer/backend/src/main/resources/static/news";
        String uniqueFileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();

        Path uploadPath = Paths.get(uploadDirectory);
        Path filePath = uploadPath.resolve(uniqueFileName);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(imageFile.getInputStream(), filePath);

        return uniqueFileName;
    }
}
