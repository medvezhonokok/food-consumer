package ru.backend.repository.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ru.backend.repository.PermanentTaskRepository;

/**
 * This component class represents a database updater
 * that resets the userId field of permanent tasks in the database.
 *
 * It includes a scheduled method to trigger the update process daily at 00:01.
 */
@Component
public class DatabaseUpdater {

    private final PermanentTaskRepository permTaskRepository;

    public DatabaseUpdater(PermanentTaskRepository permTaskRepository) {
        this.permTaskRepository = permTaskRepository;
    }

    public void resetUserIdField() {
        permTaskRepository.resetUserId();
    }

    @Scheduled(cron = "0 1 0 * * *")
    public void updateDatabase() {
        resetUserIdField();
    }
}
