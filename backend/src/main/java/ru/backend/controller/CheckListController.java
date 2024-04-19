package ru.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.backend.model.CheckList;
import ru.backend.model.User;
import ru.backend.service.CheckListService;
import ru.backend.service.JwtService;
import ru.backend.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/check_list")
public class CheckListController {
    private final CheckListService checkListService;
    private final UserService userService;
    private final JwtService jwtService;

    public CheckListController(CheckListService checkListService, UserService userService, JwtService jwtService) {
        this.checkListService = checkListService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

//    @GetMapping(value = "/all")
//    public ResponseEntity<List<CheckList>> getCheckList(@RequestParam String jwt) {
//        if (jwtService.findUserByJWT(jwt) != null) {
//            return new ResponseEntity<>(checkListService.findAll(), HttpStatus.OK);
//        }
//
//        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<CheckList>> getCheckList() {
        return new ResponseEntity<>(checkListService.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/take")
    public synchronized ResponseEntity<String> takeCheckListTask(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        if (jwtService.findUserByJWT(jwt) != null) {
            Long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
            Long checkListId = Long.parseLong(String.valueOf(requestBody.get("checkListId")));

            CheckList checkList = checkListService.findById(checkListId);
            User user = userService.findById(userId);

            if (checkList != null && checkList.getExecutor() == null && user != null) {
                checkListService.setUserId(checkListId, userId);
                return new ResponseEntity<>("OK", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("ALREADY_TAKEN", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/mark_as_done")
    public ResponseEntity<String> markCheckListTaskAsDone(@RequestParam String jwt, @RequestBody Map<String, Object> requestBody) {
        if (jwtService.findUserByJWT(jwt) != null) {
            long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
            Long checkListId = Long.parseLong(String.valueOf(requestBody.get("checkListId")));

            CheckList checkList = checkListService.findById(checkListId);
            User user = userService.findById(userId);

            if (checkList != null && checkList.getExecutor() != null && checkList.getExecutor().getId() == userId && user != null) {
                checkListService.markAsDone(checkListId);
                return new ResponseEntity<>("OK", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
}
