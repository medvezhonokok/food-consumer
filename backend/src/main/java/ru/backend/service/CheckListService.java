package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.CheckList;
import ru.backend.repository.CheckListRepository;

import java.util.List;

@Service
public class CheckListService {
    private final CheckListRepository checkListRepository;

    public CheckListService(CheckListRepository checkListRepository) {
        this.checkListRepository = checkListRepository;
    }

    public List<CheckList> findAll() {
        return checkListRepository.findAll();
    }

    public CheckList findById(Long checkListId) {
        return checkListRepository.findById(checkListId).orElse(null);
    }

    public void setUserId(Long checkListId, Long userId) {
        checkListRepository.setUserId(userId, checkListId);
    }

    public void markAsDone(Long checkListId) {
        checkListRepository.markAsDone(checkListId);
    }

    public void save(CheckList checkList) {
        checkListRepository.save(checkList);
    }
}
