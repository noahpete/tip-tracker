package com.tipper.backend.shift;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ShiftService {

//    private final ShiftRepository shiftRepository;
//
//    public ShiftService(ShiftRepository shiftRepository) {
//        this.shiftRepository = shiftRepository;
//    }

//    public List<Shift> getAllShifts() {
//        return shiftRepository.findAll();
//    }
//
//    public Shift getShiftById(Integer id) {
//        Optional<Shift> optionalShift = shiftRepository.findById(id);
//        if (optionalShift.isPresent()) {
//            return optionalShift.get();
//        }
//        log.info("Shift with id: {} doesn't exist", id);
//        return null;
//    }
//
//    public Shift saveShift (Shift shift) {
//        shift.setCreatedAt(LocalDateTime.now());
//        shift.setUpdatedAt(LocalDateTime.now());
//        Shift savedShift = shiftRepository.save(shift);
//        log.info("Shift with id: {} saved successfully", shift.getId());
//        return savedShift;
//    }
//
//    public Shift updateShift (Shift shift) {
//        Optional<Shift> existingShift = shiftRepository.findById(shift.getId());
//        shift.setCreatedAt(existingShift.get().getCreatedAt());
//        shift.setUpdatedAt(LocalDateTime.now());
//        Shift updatedShift = shiftRepository.save(shift);
//        log.info("Shift with id: {} updated successfully", shift.getId());
//        return updatedShift;
//    }
//
//    public void deleteShiftById (Integer id) {
//        shiftRepository.deleteById(id);
//    }
}
