package ru.backend.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {
    private static final Logger logger = Logger.getLogger(FileService.class);

    @Value("${image.directory}")
    private String imageDirectory;

    public String saveImageToStorage(MultipartFile imageFile) throws IOException {
        String uniqueFileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();

        Path uploadPath = Paths.get(imageDirectory);
        Path filePath = uploadPath.resolve(uniqueFileName);

        if (!Files.exists(uploadPath)) {
            logger.info("Creating new directory: " + uploadPath);
            Files.createDirectories(uploadPath);
        }

        logger.info("Saving image by path: " + filePath);

        Files.copy(imageFile.getInputStream(), filePath);

        return uniqueFileName;
    }
}
