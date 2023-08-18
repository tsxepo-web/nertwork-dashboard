import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

import { ClientInfoService } from '../client-info.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit, OnChanges {
  @Input() downloadSpeed: number = 0;
  @Input() uploadSpeed: number = 0;

  clientInfo: any = {};
  userId: string = '';
  speedChart: Chart<"doughnut", any[], string> | undefined;

  constructor(
    private clientInfoService: ClientInfoService,
    private userService: UserService) {}
  
  ngOnInit(): void {
    this.fetchClientInfo();
    this.userId = this.userService.getUserId();
  }
  ngOnChanges(changes: SimpleChanges) {
    if ((changes['downloadSpeed'] || changes['uploadSpeed']) && this.speedChart) {
      this.updateChart();
    }
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.speedChart = new Chart('speedChart', {
      type: 'doughnut',
      data: {
        labels: ['Download', 'Upload'],
        datasets: [{
          data: [.4, .5],
          backgroundColor: ['#36A2EB', '#FFCE56'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
  updateChart() {
    this.speedChart!.data.datasets[0].data = [this.downloadSpeed || 0, this.uploadSpeed || 0];
    this.speedChart!.update();
  }

  fetchClientInfo() {
    this.clientInfoService.getClientInfo().subscribe(
      (data) => {
        this.clientInfo = data;
        this.clientInfoService.storeClientInfoInSessionStorage(data.ip_address, data.connection.organization_name)
      },
      (error) => {
        console.error('Error fetching client info', error);
      }
    );
  }
}