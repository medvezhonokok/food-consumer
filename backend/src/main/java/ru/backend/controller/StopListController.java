package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.backend.model.StopListElement;
import ru.backend.service.JwtService;
import ru.backend.service.StopListService;
import ru.backend.service.TelegramBotNotifierService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stop_list/")
public class StopListController {
    private final StopListService stopListService;
    private final TelegramBotNotifierService notifierService;

    public StopListController(StopListService stopListService, JwtService jwtService, TelegramBotNotifierService notifierService) {
        this.stopListService = stopListService;
        this.notifierService = notifierService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<StopListElement>> getStopList() {
        return new ResponseEntity<>(stopListService.getStopList(), HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addStopListElement(@RequestBody Map<String, Object> requestBody) {
        String name = String.valueOf(requestBody.get("name"));

        if (name != null && !name.isBlank()) {
            StopListElement stopListElement = new StopListElement();
            stopListElement.setName(name);
            notifierService.sendMessageToEveryone(String.format("`%s` теперь на стопе", name));
            stopListService.save(stopListElement);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/remove")
    public ResponseEntity<String> removeStopListElement(@RequestBody Map<String, Object> requestBody) {
        Long stopListElementId = Long.parseLong(String.valueOf(requestBody.get("stopListElementId")));
        StopListElement stopListElement = stopListService.findById(stopListElementId);

        if (stopListElement != null) {
            notifierService.sendMessageToEveryone(String.format("`%s` убрано со стопа", stopListElement.getName()));
            stopListService.removeById(stopListElementId);

            return new ResponseEntity<>("OK", HttpStatus.OK);
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
}
