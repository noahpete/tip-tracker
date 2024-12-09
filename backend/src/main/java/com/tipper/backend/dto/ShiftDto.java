package com.tipper.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ShiftDto {
    private Long id;
    private String owner;
    private Float cashTips;
    private Float creditTips;
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime created;
    private LocalDateTime updated;

    public ShiftDto(Long id, String owner, Float cashTips, Float creditTips, LocalDate date, LocalDateTime startTime, LocalDateTime endTime, LocalDateTime created, LocalDateTime updated) {
        this.id = id;
        this.owner = owner;
        this.cashTips = cashTips;
        this.creditTips = creditTips;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.created = created;
        this.updated = updated;
    }

    public ShiftDto() {
    }

    public Long getId() {
        return this.id;
    }

    public String getOwner() {
        return this.owner;
    }

    public Float getCashTips() {
        return this.cashTips;
    }

    public Float getCreditTips() {
        return this.creditTips;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public LocalDateTime getStartTime() {
        return this.startTime;
    }

    public LocalDateTime getEndTime() {
        return this.endTime;
    }

    public LocalDateTime getCreated() {
        return this.created;
    }

    public LocalDateTime getUpdated() {
        return this.updated;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setCashTips(Float cashTips) {
        this.cashTips = cashTips;
    }

    public void setCreditTips(Float creditTips) {
        this.creditTips = creditTips;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }
}
