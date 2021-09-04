package ru.arbitration.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.arbitration.manager.entity.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}