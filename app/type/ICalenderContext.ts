'use strict';

export interface ICalendarEvent {
    summary: string,
    location: string,
    description: string,
    start: {
        dateTime: string,
        timeZone: string
    },
    end: {
        dateTime: string,
        timeZone: string
    }
}

