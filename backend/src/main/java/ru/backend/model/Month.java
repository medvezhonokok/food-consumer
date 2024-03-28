package ru.backend.model;

import lombok.Getter;

@SuppressWarnings("NonAsciiCharacters")
@Getter
public enum Month {

    ДЕКАБРЬ(java.time.Month.DECEMBER),
    ЯНВАРЬ(java.time.Month.JANUARY),
    ФЕВРАЛЬ(java.time.Month.FEBRUARY),
    МАРТ(java.time.Month.MARCH),
    АПРЕЛЬ(java.time.Month.APRIL),
    МАЙ(java.time.Month.MAY),
    ИЮНЬ(java.time.Month.JUNE),
    ИЮЛЬ(java.time.Month.JULY),
    АВГУСТ(java.time.Month.AUGUST),
    СЕНТЯБРЬ(java.time.Month.SEPTEMBER),
    НОЯБРЬ(java.time.Month.NOVEMBER);

    private final java.time.Month month;

    Month(java.time.Month month) {
        this.month = month;
    }
}