package ru.arbitration.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.arbitration.manager.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}