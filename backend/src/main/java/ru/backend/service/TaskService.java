package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.Task;
import ru.backend.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task findById(Long taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }

    public void setUserId(Long taskId, Long userId) {
        taskRepository.setUserId(userId, taskId);
    }

    public void markAsDone(Long taskId) {
        taskRepository.markAsDone(taskId);
    }

    public void save(Task task) {
        taskRepository.save(task);
    }
}
