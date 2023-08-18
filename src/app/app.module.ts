import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DonutComponent } from './donut/donut.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SpeedTestComponent } from './speed-test/speed-test.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DonutComponent,
    BarChartComponent,
    SpeedTestComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
