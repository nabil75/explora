import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';

@Component({
  selector: 'app-gauge',
  standalone: true,
  imports: [CommonModule, NgxGaugeModule],
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent {

  gaugeType: any = "arch";
  gaugeValue = 75.3;
  gaugeLabel = "Speed";
  gaugeAppendText = "km/hr";
  thresholdConfig = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
};

}
