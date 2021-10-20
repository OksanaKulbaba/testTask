import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts';
import {SaveDataService} from '../save-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Array<Color> = [
    {
      borderColor: 'black',
      backgroundColor: '#69f0ae',
    },
  ];
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public resultByDate$ = this.saveDataService.resultByDate$;

  constructor(public saveDataService: SaveDataService) {}

  ngOnInit(): void {
    this.saveDataService.calcResultByDate();
    this.resultByDate$ = this.saveDataService.resultByDate$;
  }

}
