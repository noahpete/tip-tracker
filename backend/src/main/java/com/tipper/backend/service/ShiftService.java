package com.tipper.backend.service;

import com.tipper.backend.dto.ShiftDto;

import java.util.List;

public interface ShiftService {
    ShiftDto createShift(ShiftDto shiftDto);
    ShiftDto getShiftById(Long shiftId);
    List<ShiftDto> getShiftsByOwner(String owner);
    List<ShiftDto> getAllShifts();
    ShiftDto updateShift(Long shiftId, ShiftDto updatedShift);
    void deleteShift(Long shiftId);
}
