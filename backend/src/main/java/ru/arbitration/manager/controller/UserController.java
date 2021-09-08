package ru.arbitration.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import ru.arbitration.manager.dto.ERole;
import ru.arbitration.manager.dto.PageListDto;
import ru.arbitration.manager.entity.Question;
import ru.arbitration.manager.entity.User;
import ru.arbitration.manager.pojo.IDefaultParam;
import ru.arbitration.manager.service.UserService;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController implements IDefaultParam {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<PageListDto> list(
            @PageableDefault(size = ITEM_PER_PAGE, sort = { "id" }, direction = Sort.Direction.ASC) Pageable pageable
    ) {
        PageListDto list = userService.findAll(pageable);

        return new ResponseEntity<PageListDto>(list, HttpStatus.OK);
    }

    @GetMapping("{username}")
    public ResponseEntity<User> info(@PathVariable("username") String username, @AuthenticationPrincipal User user) {
        try {
            User userFromDb = (User) userService.loadUserByUsername(username);
            if (user.getId() == userFromDb.getId() || user.getRole().contains(ERole.ROLE_ADMIN)) {
                return new ResponseEntity<User>(userFromDb, HttpStatus.OK);
            } else {
                return new ResponseEntity<User>(user, HttpStatus.OK);
            }
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(
            @PathVariable("id") User userFromDb,
            @RequestBody User userRequest,
            @AuthenticationPrincipal User user
    ) {
        if (user.getId() != userFromDb.getId() && !user.getRole().contains(ERole.ROLE_ADMIN))
            return new ResponseEntity<String>("Ошибка доступа.", HttpStatus.ACCEPTED);

        try {
            User updated  = userService.update(userFromDb, userRequest);
            return new ResponseEntity<User>(updated, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<String>("Ошибка обновления данных.", HttpStatus.ACCEPTED);
        }
    }
}