package com.tipper.backend.controller;

import com.tipper.backend.dto.ShiftDto;
import com.tipper.backend.service.ShiftService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/shifts")
public class ShiftController {
    @Autowired
    private ShiftService shiftService;

    @PostMapping
    public ResponseEntity<ShiftDto> createShift(@RequestBody ShiftDto shiftDto) {
        ShiftDto savedShift = shiftService.createShift(shiftDto);
        return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ShiftDto> getShiftById(@PathVariable("id") Long shiftId) {
        ShiftDto shiftDto = shiftService.getShiftById(shiftId);
        return ResponseEntity.ok(shiftDto);
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<ShiftDto>> getShiftsByOwner(@PathVariable("ownerId") String ownerId) {
        List<ShiftDto> shifts = shiftService.getShiftsByOwner(ownerId);
        return ResponseEntity.ok(shifts);
    }

    @GetMapping
    public ResponseEntity<List<ShiftDto>> getAllShifts() {
        List<ShiftDto> shifts = shiftService.getAllShifts();
        return ResponseEntity.ok(shifts);
    }

    @PutMapping("{id}")
    public ResponseEntity<ShiftDto> updateShift(@PathVariable("id") Long shiftId, @RequestBody ShiftDto updatedShift) {
        ShiftDto shiftDto = shiftService.updateShift(shiftId, updatedShift);
        return ResponseEntity.ok(shiftDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteShift(@PathVariable("id") Long shiftId) {
        shiftService.deleteShift(shiftId);
        return ResponseEntity.ok("Shift successfully deleted.");
    }
}
