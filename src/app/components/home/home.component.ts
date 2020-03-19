import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import * as Chart from 'chart.js';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ecoeff = 5;// coefficient of restitution
  
  /*
   * height1 = height0*e^2;
   * s = ut + 1/2at^2;
   * u = 0;
   * t = (2s/g)^(1/2)
   *
   */
  
  initialHeight = 100;
  timeaxis = [];
  heightaxis = [];
  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData;
  ngOnInit() {
    // console.log(this.ecoeff);
    this.newPlot();
  }

  plotGraph() {
    while(Math.round((this.initialHeight + Number.EPSILON) * 100) / 100 != 0) {
      this.plotTime(this.initialHeight);
      this.plotHeight(this.initialHeight);
    }
  }

  plotTime(s) {
    let time = Math.sqrt(2*s/10);
    this.timeaxis.push(Math.round((time + Number.EPSILON) * 100) / 100);
  }

  plotHeight(h) {
    let height = h*this.ecoeff/100*this.ecoeff/100;
    this.heightaxis.push(height);
    this.initialHeight = height;
    // console.log(Math.round((this.initialHeight + Number.EPSILON) * 100) / 100);
  }

  initGraph() {
    this.timeaxis = [];
    this.heightaxis = [];
    this.initialHeight = 100;
    this.timeaxis.push(0);
    this.barChartLabels = this.timeaxis;
    this.heightaxis.push(this.initialHeight);
    // console.log(Math.round((this.initialHeight + Number.EPSILON) * 100) / 100);
    this.barChartData = [
      {data: this.heightaxis, label: 'Height Vs Time'},
    ];
  }

  newPlot() {
    this.initGraph();
    this.plotGraph();
  }

}

