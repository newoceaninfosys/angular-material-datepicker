import { EventEmitter, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Month } from './month.model';
import { Weekday } from './weekday.model';
export declare class CalendarComponent implements OnInit {
    private readonly calendarService;
    private dateVal;
    dateChange: EventEmitter<Date>;
    date: Date;
    cancel: EventEmitter<void>;
    submit: EventEmitter<Date>;
    dayNames: Array<Weekday>;
    monthNames: Array<Month>;
    today: Date;
    currentMonth: Month;
    currentMonthNumber: number;
    currentYear: number;
    currentDay: number;
    currentDayOfWeek: Weekday;
    displayMonth: Month;
    displayMonthNumber: number;
    displayYear: number;
    displayDays: Array<number>;
    animate: string;
    constructor(calendarService: CalendarService);
    ngOnInit(): void;
    private updateDate(date);
    private updateDisplay(year, month);
    private equalsDate(date1, date2);
    getDayBackgroundColor(day: Date): "day-background-selected" | "day-background-normal";
    getDayForegroundColor(day: Date): "day-foreground-selected" | "day-foreground-today" | "day-foreground-normal";
    onToday(): void;
    onPrevMonth(): void;
    onNextMonth(): void;
    onSelectDate(date: Date): void;
    onCancel(): void;
    onOk(): void;
    private triggerAnimation(direction);
}