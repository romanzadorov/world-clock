import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-digital-clock-moment',
  templateUrl: './digital-clock-moment.component.html',
  styleUrls: ['./digital-clock-moment.component.scss']
})
export class DigitalClockMomentComponent implements OnInit, AfterViewInit {
  clock: any;

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.clock = moment();
    }, 1000);
  }

}
