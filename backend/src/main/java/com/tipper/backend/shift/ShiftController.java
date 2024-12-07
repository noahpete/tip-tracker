package com.tipper.backend;

import com.tipper.backend.shift.Shift;
import com.tipper.backend.shift.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ShiftController {

    private final ShiftService shiftService;

    @Autowired
    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

//    @GetMapping("/")
//    public ResponseEntity<List<Shift>> getAllShifts() {
//        return ResponseEntity.ok().body(shiftService.getAllShifts());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Shift> getShiftById(@PathVariable Integer id) {
//        return ResponseEntity.ok().body(shiftService.getShiftById(id));
//    }
//
//    @PostMapping("/")
//    public ResponseEntity<Shift> saveShift(@RequestBody Shift shift) {
//        return ResponseEntity.ok().body(shiftService.saveShift(shift));
//    }
//
//    @PutMapping("/")
//    public ResponseEntity<Shift> updateShift(@RequestBody Shift shift) {
//        return ResponseEntity.ok().body(shiftService.updateShift(shift));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteShiftById(@PathVariable Integer id) {
//        shiftService.deleteShiftById(id);
//        return ResponseEntity.ok().body("Deleted shift successfully");
//    }
}
