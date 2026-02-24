import { IDatetime } from "./IDatetime";

export class DateTimeModel implements IDatetime{
    month: number = 1;
    year: number = 1900;
    day: number = 1;
    amPm: string = "AM";
    time: number = 800;
    dateTime!: Date;

    calculateDateTimeISO8601
    () : void{

        let timeString : string = String(this.time);

        let hour: string = timeString.substring(0, timeString.length - 2);
        let minute: string = timeString.substring(timeString.length - 2, timeString.length);

        let time : string = "T" + hour.padStart(2, "0") + ":" + minute.padStart(2, "0") + ":00Z";
        
        let monthAndYear : string = String(this.year) + "-" + String(this.month).padStart(2, "0") + 
            "-" + String(this.day).padStart(2, "0");

        let datetime: string = monthAndYear + time;

        this.dateTime = new Date(datetime);
                 
    };

    
    
}