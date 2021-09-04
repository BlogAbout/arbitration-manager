package ru.arbitration.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.arbitration.manager.dto.PageListDto;
import ru.arbitration.manager.entity.User;
import ru.arbitration.manager.pojo.IDefaultParam;
import ru.arbitration.manager.service.UserService;

@RestController
@RequestMapping("/users")
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

    @GetMapping("{id}")
    public ResponseEntity<User> info(@PathVariable("id") User user) {
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}