import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { TryReportService } from 'src/Services/try-report.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { LoginService } from 'src/Services/login.service';

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
  skippedScore:any;
  wrongScore:any;

  percentValue:any;
  skippedQuestions: any[] = [];
  questionsLength:any[] = [];

  correctAnswer:any = undefined;
  totalMarks:any = undefined;
  totalQuestion:any = undefined;
  unattempts:any = undefined;
  wrongAnswer:any = undefined;

  previousUrl: string | null = null;
  
  constructor(private _router: Router, private _route : ActivatedRoute, private _loginService:LoginService, private _tryService: TryReportService){

  }
  ngOnInit(): void {
    this.correctAnswer = this._tryService.correctAnswer;
    this.totalMarks =   this._tryService.totalMarks;
    this.totalQuestion  = this._tryService.totalQuestions; 
    this.unattempts = this._tryService.unattempts;
    this.wrongAnswer = this._tryService.wrongAnswer;

     // Set correct values for the charts
     this.UserScore = this.correctAnswer; // Assuming this is the correct property
     this.skippedScore = this.unattempts; // Assuming this is the correct property
     this.wrongScore = this.wrongAnswer; // Assuming this is the correct property
     this.percentValue = (this.correctAnswer / this.totalQuestion) * 100;
     this.skippedPerc = ( this.unattempts / this.totalQuestion ) * 100;
     this.incorrectPerc = (this.wrongAnswer / this.totalQuestion) * 100;
    
    this.initGraph();
    // this.initGrapha();
    this.initGraphb();
    this.initGraphc();
  }

  onPrint() {
    window.print();
  }

initGraph() {
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: '#F5F4F4'
      },
      credits: {
        enabled: false
      },
      tooltip: { enabled: false },
      title: {
        text: `${this.percentValue.toFixed(2)}%`, // Ensure a fixed number of decimal places
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
        this.UserScore > 0 ? '#1FD115' : '#808080', // Green for correct
        this.UserScore < this.totalQuestion ? '#FF1900' : '#808080' // Red for incorrect
      ],
      series: [{
        innerSize: '80%',
        data: [{
          name: `Correct`,
          y: this.UserScore
        },
        {
          name: `InCorrect`,
          y: this.totalQuestion - this.UserScore
        }]
      }],
    };
  }

  initGraphb() {
    this.chartOptionsb = {   
      chart: {
        height: 150,
        width: 150,
        type: 'pie',
        backgroundColor: '#FFFFFF'
      },
      credits: {
        enabled: false
      },
      tooltip: { enabled: false },
      title: {
        text: `${this.skippedPerc.toFixed(2)}%`,
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
        this.skippedScore > 0 ? '#9460ff' : '#808080', 
        this.skippedScore < this.totalQuestion ? '#e7eaeb' : '#808080'
      ],
      series: [{
        innerSize: '80%',
        data: [{
          name: `Correct`,
          y: this.skippedScore
        },
        {
          name: `InCorrect`,
          y: this.totalQuestion - this.skippedScore
        }]
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
      text: `${this.incorrectPerc.toFixed(2)}%`,
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
      this.wrongScore > 0 ? '#ffa500' : '#808080', 
      this.wrongScore < this.totalQuestion ? '#e7eaeb' : '#808080'
  ],
  series: [{
    innerSize: '80%',
    data: [{
      name: `Correct`,
      y: this.wrongScore
    },
    {
      name: `InCorrect`,
      y: this.totalQuestion - this.wrongScore
    }]
  }],
  
  };
}

generatePDF() {
  const reportElement = document.getElementById('printinvoice')!; // Get the HTML element to convert
  setTimeout(() => {
    html2canvas(reportElement, { scale: 2 }).then((canvas) => {
  html2canvas(reportElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('result-Report.pdf');
  });
});
}, 800);
}

}
