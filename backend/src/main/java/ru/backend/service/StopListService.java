package ru.backend.service;

import org.springframework.stereotype.Service;
import ru.backend.model.StopListElement;
import ru.backend.repository.StopListRepository;

import java.util.List;

@Service
public class StopListService {

    private final StopListRepository stopListRepository;

    public StopListService(StopListRepository stopListRepository) {
        this.stopListRepository = stopListRepository;
    }

    public List<StopListElement> getStopList() {
        return stopListRepository.findAll();
    }

    public void save(StopListElement stopListElement) {
        stopListRepository.save(stopListElement);
    }

    public void removeById(Long id) {
        stopListRepository.deleteById(id);
    }

    public StopListElement findById(Long id) {
        return stopListRepository.findById(id).orElse(null);
    }
}
