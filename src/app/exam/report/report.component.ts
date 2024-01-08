import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { TryReportService } from 'src/Services/try-report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  paperDetails: any;
  showGraph: boolean = true;
  hasSubjective: boolean = false;
  highcharts = Highcharts;
  excellent: any;
  average: any;
  poor: any;
  overallPerc:any;
  attemptedPerc: any;
  skippedPerc: any;
  incorrectPerc: any;
  correctPerc: any;
  chartOptions = {};
  chartOptionsa = {};
  chartOptionsb = {};
  chartOptionsc = {};
  convertedData = [];
  convertedDataAttempt = [];
  convertedDataCorrect = [];
  convertedDataIncorrect = [];
  UserScore:any;
  percentValue:any;
  skippedQuestions: any[] = [];
  questionsLength:any[] = [];
  constructor(private _router: Router, private _route : ActivatedRoute, private _tryReport: TryReportService){

  }
  ngOnInit(): void {
    this.UserScore = this._route.snapshot.paramMap.get('score');
    this.UserScore = this.UserScore.split(':')[1]; 
    // console.log('getting score in report component',this.UserScore)

    this.initGraph();
    this.initGrapha();
    this.initGraphb();
    this.initGraphc();
    this.getValuesFromService();
    this.calculatePercent();
  }

  getValuesFromService(){
    this.skippedQuestions = this._tryReport.skippedQuestions;
    this.questionsLength = this._tryReport.QuestionsLength;
  }
  calculatePercent() {
    const correctAnswers = Number(this.UserScore);
    const totalQuestions = this.questionsLength.length;
    this.percentValue = (correctAnswers / totalQuestions) * 100;
    console.log('Percentage:', this.percentValue + '%');
  }
  
  onPrint() {
    window.print();
  }
  submitFilterForm(){

  }

  initGraph() {
    const correctScore = Number(this.UserScore);
    this.chartOptions = {   
       chart: {
          type: 'pie',
          backgroundColor : '#F5F4F4'
       },
       credits: {
         enabled: false
       },
       tooltip: { enabled: false },
       title: {
          text: `${this.percentValue}`,
          verticalAlign: 'middle',
          floating: true
       },
       
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
              dataLabels: {
                  enabled: false,
              }
        }
      },
      colors: [
        correctScore >= 0 && correctScore < 10 ? '#1FD115' : '#808080', // Green for correct
        correctScore >= 0 && correctScore < 10 ? '#FF1900' : '#808080' // Red for incorrect
    ],
    series:  [{
      innerSize: '80%',
      data: [{
        name : `Correct`,
        y: correctScore
      },
    {
      name: `InCorrect`,
      y: 10 - correctScore
    }]
    }],
    
    };
 }

 initGrapha() {
  this.chartOptionsa = {   
     chart: {
      height: 150,
      width: 150,
        type: 'pie',
        backgroundColor : '#FFFFFF'
     },
     credits: {
      enabled: false
    },
    tooltip: { enabled: false },
     title: {
      text: this.attemptedPerc,
      verticalAlign: 'middle',
      floating: true
     },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
            dataLabels: {
                enabled: false,
            }
      }
    },
    colors: [
      '#6699FF',
      '#9460FF',
      '#56BE89',
      '#808080'
  ],
  series:  [{
    innerSize: '80%',
    data: this.convertedDataAttempt
  }],
  
  };
}

initGraphb() {
  this.chartOptionsb = {   
     chart: {
      height: 150,
      width: 150,
        type: 'pie',
        backgroundColor : '#FFFFFF'
     },
     credits: {
      enabled: false
    },
    tooltip: { enabled: false },
     title: {
      text: this.skippedPerc,
      verticalAlign: 'middle',
      floating: true
     },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
            dataLabels: {
                enabled: false,
            }
      }
    },
    colors: [
      '#6699FF',
      '#ffa500',
      '#56BE89',
      '#808080'
  ],
  series:  [{
    innerSize: '80%',
    data: this.convertedDataCorrect
  }],
  
  };
}

initGraphc() {
  this.chartOptionsc = {   
     chart: {
      height: 150,
      width: 150,
        type: 'pie',
        backgroundColor : '#FFFFFF'
     },
     credits: {
      enabled: false
    },
    tooltip: { enabled: false },
     title: {
      text: this.incorrectPerc,
      verticalAlign: 'middle',
      floating: true
     },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
            dataLabels: {
                enabled: false,
            }
      }
    },
    colors: [
      '#6699FF',
      '#FF1900',
      '#56BE89',
      '#808080'
  ],
  series:  [{
    innerSize: '80%',
    data: this.convertedDataIncorrect
  }],
  
  };
}

}
