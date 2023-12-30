package ru.backend.model;

import lombok.Getter;

@SuppressWarnings("NonAsciiCharacters")
@Getter
public enum Month {

    ДЕКАБРЬ(java.time.Month.DECEMBER),
    ЯНВАРЬ(java.time.Month.JANUARY),
    ФЕВРАЛЬ(java.time.Month.FEBRUARY),
    МАРТ(java.time.Month.MARCH);

    // TODO.....

    private final java.time.Month month;

    Month(java.time.Month month) {
        this.month = month;
    }
}