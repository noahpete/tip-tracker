package com.tipper.backend.mapper;

import com.tipper.backend.dto.ShiftDto;
import com.tipper.backend.entity.Shift;

public class ShiftMapper {
    public static ShiftDto mapToShiftDto(Shift shift) {
        return new ShiftDto(
                shift.getId(),
                shift.getOwner(),
                shift.getCashTips(),
                shift.getCreditTips(),
                shift.getDate(),
                shift.getStartTime(),
                shift.getEndTime(),
                shift.getCreated(),
                shift.getUpdated()
        );
    }

    public static Shift mapToShift(ShiftDto shiftDto) {
        return new Shift(
                shiftDto.getId(),
                shiftDto.getOwner(),
                shiftDto.getCashTips(),
                shiftDto.getCreditTips(),
                shiftDto.getDate(),
                shiftDto.getStartTime(),
                shiftDto.getEndTime(),
                shiftDto.getCreated(),
                shiftDto.getUpdated()
        );
    }
}
