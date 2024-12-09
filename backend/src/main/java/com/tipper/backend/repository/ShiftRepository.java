package com.tipper.backend.repository;

import com.tipper.backend.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findByOwner(String owner);
}
