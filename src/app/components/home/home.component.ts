import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ecoeff = 5;// coefficient of restitution
  
  initialHeight = 100;
  timeaxis = [];
  heightaxis = [];
  bounces;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData;

   /*
   * logic
   * height1 is new height and height0 is initial height and e = ecoeff
   * height1 = height0*e^2;
   * s = ut + 1/2at^2;
   * u = 0; since start at rest
   * t = (2s/g)^(1/2) make time the subject
   * 
   */

  constructor() { }
  
  ngOnInit() {
    // console.log(this.ecoeff);
    this.newPlot();
  }

  //plot the graph
  plotGraph() {
    while(Math.round((this.initialHeight + Number.EPSILON) * 100) / 100 != 0) {
      this.plotTime(this.initialHeight);
      this.plotHeight(this.initialHeight);
      this.bounces++;
    }
  }

  plotTime(s) {
    let time = Math.sqrt(2*s/10);  // using the above formula t = (2s/g)^(1/2)
    this.timeaxis.push(Math.round((time + Number.EPSILON) * 100) / 100);
  }

  plotHeight(h) {
    let height = h*this.ecoeff/100*this.ecoeff/100; // using the above formula height1 = height0*e^2;
    this.heightaxis.push(height);
    this.initialHeight = height;
  }

  // initialize paramters for graph plotting
  initGraph() {
    this.timeaxis = [];
    this.heightaxis = [];
    this.initialHeight = 100;
    this.bounces = 0;
    this.timeaxis.push(0);
    this.barChartLabels = this.timeaxis;
    this.heightaxis.push(this.initialHeight);
    this.barChartData = [
      {data: this.heightaxis, label: 'Height Vs Time'},
    ];
  }

  // start a new graph plot
  newPlot() {
    this.initGraph();
    this.plotGraph();
  }

}

