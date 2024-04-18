package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.backend.model.StopListElement;
import ru.backend.service.JwtService;
import ru.backend.service.StopListService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stop_list/")
public class StopListController {
    private final StopListService stopListService;
    private final JwtService jwtService;

    public StopListController(StopListService stopListService, JwtService jwtService) {
        this.stopListService = stopListService;
        this.jwtService = jwtService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<StopListElement>> getStopList(@RequestParam String jwt) {
        if (jwtService.findUserByJWT(jwt) != null) {
            return new ResponseEntity<>(stopListService.getStopList(), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addStopListElement(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        if (jwtService.findUserByJWT(jwt) != null) {
            String name = String.valueOf(requestBody.get("name"));

            if (name != null && !name.isBlank()) {
                StopListElement stopListElement = new StopListElement();
                stopListElement.setName(name);

                stopListService.save(stopListElement);
                return new ResponseEntity<>("OK", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/remove")
    public ResponseEntity<String> removeStopListElement(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        if (jwtService.findUserByJWT(jwt) != null) {
            Long id = Long.parseLong(String.valueOf(requestBody.get("stopListElementId")));
            stopListService.removeById(id);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
}
