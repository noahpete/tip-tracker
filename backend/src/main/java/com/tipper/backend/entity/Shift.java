package com.tipper.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "Shift")
@Table(name = "shifts")
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private Long version;

    @Column(name = "owner")
    private String owner;

    @Column(name = "cash_tips")
    private Float cashTips;

    @Column(name = "credit_tips")
    private Float creditTips;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "created")
    private LocalDateTime created;

    @Column(name = "updated")
    private LocalDateTime updated;

    public Shift(Long id, String owner, Float cashTips, Float creditTips, LocalDate date, LocalDateTime startTime, LocalDateTime endTime, LocalDateTime created, LocalDateTime updated) {
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

    public Shift() {
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

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Shift)) return false;
        final Shift other = (Shift) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        final Object this$cashTips = this.getCashTips();
        final Object other$cashTips = other.getCashTips();
        if (this$cashTips == null ? other$cashTips != null : !this$cashTips.equals(other$cashTips)) return false;
        final Object this$creditTips = this.getCreditTips();
        final Object other$creditTips = other.getCreditTips();
        if (this$creditTips == null ? other$creditTips != null : !this$creditTips.equals(other$creditTips))
            return false;
        final Object this$date = this.getDate();
        final Object other$date = other.getDate();
        if (this$date == null ? other$date != null : !this$date.equals(other$date)) return false;
        final Object this$startTime = this.getStartTime();
        final Object other$startTime = other.getStartTime();
        if (this$startTime == null ? other$startTime != null : !this$startTime.equals(other$startTime)) return false;
        final Object this$endTime = this.getEndTime();
        final Object other$endTime = other.getEndTime();
        if (this$endTime == null ? other$endTime != null : !this$endTime.equals(other$endTime)) return false;
        final Object this$created = this.getCreated();
        final Object other$created = other.getCreated();
        if (this$created == null ? other$created != null : !this$created.equals(other$created)) return false;
        final Object this$updated = this.getUpdated();
        final Object other$updated = other.getUpdated();
        if (this$updated == null ? other$updated != null : !this$updated.equals(other$updated)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Shift;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        final Object $cashTips = this.getCashTips();
        result = result * PRIME + ($cashTips == null ? 43 : $cashTips.hashCode());
        final Object $creditTips = this.getCreditTips();
        result = result * PRIME + ($creditTips == null ? 43 : $creditTips.hashCode());
        final Object $date = this.getDate();
        result = result * PRIME + ($date == null ? 43 : $date.hashCode());
        final Object $startTime = this.getStartTime();
        result = result * PRIME + ($startTime == null ? 43 : $startTime.hashCode());
        final Object $endTime = this.getEndTime();
        result = result * PRIME + ($endTime == null ? 43 : $endTime.hashCode());
        final Object $created = this.getCreated();
        result = result * PRIME + ($created == null ? 43 : $created.hashCode());
        final Object $updated = this.getUpdated();
        result = result * PRIME + ($updated == null ? 43 : $updated.hashCode());
        return result;
    }

    public String toString() {
        return "Shift(id=" + this.getId() + ", cashTips=" + this.getCashTips() + ", creditTips=" + this.getCreditTips() + ", date=" + this.getDate() + ", startTime=" + this.getStartTime() + ", endTime=" + this.getEndTime() + ", created=" + this.getCreated() + ", updated=" + this.getUpdated() + ")";
    }
}
