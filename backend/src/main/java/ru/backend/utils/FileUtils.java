package ru.backend.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public final class FileUtils {

    private FileUtils() {
        // No operations.
    }

    public static String saveFileAndGetOriginalName(MultipartFile file) throws IOException {
        Path path = Paths.get("src", "main", "resources", "static", "news");
        Path directory = Files.createDirectories(path);
        String filename = UUID.randomUUID().toString();
        Path filePath = directory.resolve(filename);
        Files.write(filePath, file.getBytes());
        return filename;
    }
}
