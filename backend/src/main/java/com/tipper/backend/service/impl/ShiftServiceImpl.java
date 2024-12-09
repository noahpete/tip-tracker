package com.tipper.backend.service.impl;

import com.tipper.backend.dto.ShiftDto;
import com.tipper.backend.entity.Shift;
import com.tipper.backend.exception.ResourceNotFoundException;
import com.tipper.backend.mapper.ShiftMapper;
import com.tipper.backend.repository.ShiftRepository;
import com.tipper.backend.service.ShiftService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShiftServiceImpl implements ShiftService {

    @Autowired
    private ShiftRepository shiftRepository;

    @Override
    public ShiftDto createShift(ShiftDto shiftDto) {
        System.out.println("Received ShiftDto: " + shiftDto);
        Shift shift = ShiftMapper.mapToShift(shiftDto);
        System.out.println("Mapped Shift Entity: " + shift);
        Shift savedShift = shiftRepository.save(shift);
        System.out.println("Saved Shift Entity: " + savedShift);
        return ShiftMapper.mapToShiftDto(savedShift);
    }

    @Override
    public ShiftDto getShiftById(Long shiftId) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new ResourceNotFoundException("Shift does not exist with given id: " + shiftId));
        return ShiftMapper.mapToShiftDto(shift);
    }

    @Override
    public List<ShiftDto> getShiftsByOwner(String owner) {
        List<Shift> shifts = shiftRepository.findByOwner(owner);
        return shifts.stream().map(ShiftMapper::mapToShiftDto).collect(Collectors.toList());
    }


    @Override
    public List<ShiftDto> getAllShifts() {
        List<Shift> shifts = shiftRepository.findAll();
        return shifts.stream().map(ShiftMapper::mapToShiftDto)
                .collect(Collectors.toList());
    }

    @Override
    public ShiftDto updateShift(Long shiftId, ShiftDto updatedShift) {
        Shift shift = shiftRepository.findById(shiftId).orElseThrow(
                () -> new ResourceNotFoundException(("Shift does not exist with given id: " + shiftId))
        );
        shift.setCreditTips(updatedShift.getCreditTips());
        shift.setCashTips(updatedShift.getCashTips());
        shift.setDate(updatedShift.getDate());
        shift.setStartTime(updatedShift.getStartTime());
        shift.setEndTime(updatedShift.getEndTime());
        shift.setUpdated(updatedShift.getUpdated());
        Shift updatedShiftObj = shiftRepository.save(shift);
        return ShiftMapper.mapToShiftDto(updatedShiftObj);
    }

    @Override
    public void deleteShift(Long shiftId) {
        Shift shift = shiftRepository.findById(shiftId).orElseThrow(
                () -> new ResourceNotFoundException(("Shift does not exist with given id: " + shiftId))
        );
        shiftRepository.deleteById(shiftId);
    }
}
