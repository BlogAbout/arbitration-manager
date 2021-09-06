package ru.arbitration.manager.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.arbitration.manager.dto.ERole;
import ru.arbitration.manager.dto.PageListDto;
import ru.arbitration.manager.entity.Property;
import ru.arbitration.manager.entity.User;
import ru.arbitration.manager.pojo.IDefaultParam;
import ru.arbitration.manager.service.PropertyService;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/property")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PropertyController implements IDefaultParam {
    private final PropertyService propertyService;
    private final ObjectMapper objectMapper;

    @Autowired
    public PropertyController(PropertyService propertyService, ObjectMapper objectMapper) {
        this.propertyService = propertyService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<PageListDto> list(
            @PageableDefault(size = ITEM_PER_PAGE, sort = { "id" }, direction = Sort.Direction.ASC) Pageable pageable
    ) {
        PageListDto list = propertyService.findAll(pageable);

        return new ResponseEntity<PageListDto>(list, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Property> info(@PathVariable("id") Property property) {
        return new ResponseEntity<Property>(property, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestParam(value = "model") String jsonData,
            @RequestParam(value = "file") MultipartFile file,
            @AuthenticationPrincipal User user
    ) {
        if (!user.getRole().contains(ERole.ROLE_ADMIN))
            return new ResponseEntity<String>("Ошибка доступа.", HttpStatus.ACCEPTED);

        try {
            Property property = objectMapper.readValue(jsonData, Property.class);
            Property updated  = propertyService.create(property, file, user);
            return new ResponseEntity<Property>(updated, HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<String>("Ошибка получения данных.", HttpStatus.ACCEPTED);
        } catch (IOException e) {
            return new ResponseEntity<String>("Ошибка создания записи.", HttpStatus.ACCEPTED);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(
            @PathVariable("id") Property propertyFromDb,
            @RequestParam(value = "model") String jsonData,
            @RequestParam(value = "file") MultipartFile file,
            @AuthenticationPrincipal User user
    ) {
        try {
            Property property = objectMapper.readValue(jsonData, Property.class);
            Property updated = propertyService.update(propertyFromDb, file, property, user);
            return new ResponseEntity<Property>(updated, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<String>("Ошибка получения данных.", HttpStatus.ACCEPTED);
        } catch (IOException e) {
            return new ResponseEntity<String>("Ошибка обновления записи.", HttpStatus.ACCEPTED);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Property property) {
        propertyService.delete(property);
        return new ResponseEntity<String>("Запись удалена.", HttpStatus.NO_CONTENT);
    }
}