import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss']
})
export class DigitalClockComponent implements OnInit, AfterViewInit {
  timerId: any;

  date: Date;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.timerId = this.getTime();
  }

  getTime() {
    return setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();
    }, 1000);
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

}
