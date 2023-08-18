import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  title = 'D3 Bar Chart';
  width: number = 0;
  height: number = 0;
  margin = { top: 20, right: 20, bottom: 30, left: 40};
  x: any;
  y: any;
  svg: any;
  g: any;

  stats = [
    {company: 'Apple', frequency: 100000},
    {company: 'IBM', frequency: 80000},
    {company: 'HP', frequency: 20000},
    {company: 'Facebook', frequency: 70000},
    {company: 'TCS', frequency: 12000},
    {company: 'Google', frequency: 110000},
    {company: 'Wipro', frequency: 5000},
    {company: 'EMC', frequency: 4000},
  ]
  constructor() { 
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }
  
  initSvg() {
    this.svg = d3.select('#bar-chart')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 900 500');

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3.scaleBand().rangeRound([this.height, 0]);

    this.x.domain(this.stats.map((d) => d.company));
    this.y.domain([0, d3.max(this.stats, (d) => d.frequency)]);
  }

  drawAxis() {
    this.g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(this.x));

    this.g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(this.y))
    .append('text')
    .attr('class', 'axis-title')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('ttext-anchor', 'end')
    .text('Frequency')
  }

  drawBars() {
    this.g.selectAll('.bar')
    .data(this.stats)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d: { company: any; }) => this.x(d.company))
    .attr('y', (d: { frequency: any; }) => this.y(d.frequency))
    .attr('width', this.x.bandwidth())
    .attr('fill', '#4498bfc')
    .attr('height', (d: { frequency: any; }) => this.height - this.y(d.frequency));
  }

}
