import { Component, OnDestroy } from '@angular/core';
import { DownloadSpeedService } from '../download-speed.service';
import { Subscription, concatMap } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.css']
})
export class SpeedTestComponent {
  downloadSpeed: number = 0;
  uploadSpeed: number = 0;

  constructor(
    private downloadService: DownloadSpeedService,
    private uploadService: UploadService) {}
  
  startTest() {
    this.downloadService.startDownload()
      .pipe(
        concatMap((downloadDuration) => {
          this.downloadSpeed = this.calculateSpeed(downloadDuration.duration, downloadDuration.fileSize);
          return this.uploadService.uploadFile();
        })
      )
      .subscribe(
        uploadDuration => {
          this.uploadSpeed = this.calculateSpeed(uploadDuration.duration, uploadDuration.fileSize);
        },
        error => {
          console.error(error);
        }
      );
  }

  private calculateSpeed(duration: number, dataSizeInBytes: number): number {
    const dataSizeInBits = dataSizeInBytes * 8;
    const durationInSeconds = duration / 1000;
    return (dataSizeInBits / durationInSeconds) / 1024 / 1024;
  }

  private calculatePercentage(duration: number, maxDuration: number): number {
    return (duration / maxDuration) * 100;
  }
}
