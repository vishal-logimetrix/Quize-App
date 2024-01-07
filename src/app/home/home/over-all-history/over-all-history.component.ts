import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-over-all-history',
  templateUrl: './over-all-history.component.html',
  styleUrls: ['./over-all-history.component.css']
})
export class OverAllHistoryComponent implements OnInit{

  public columnChart: ChartType = 'bar';
  // columnChart: Chart | undefined;

  data = [100, 20, 50, 70];
  topicLabels = [];

  maxTime: any;
  convertedDay: any;
  convertedData = [];

  papers: any;
  myHistory: any;
  count = 0;
  chartOptions = {};
  highcharts = Highcharts;
  chartOptionsb = {};
  highchartsb = Highcharts;
  subjectNames = [];
  links: any;
  max_page!: number;
  pages = [];
  currentPage!: number;
  startPage: number = 1;
  endPage: number = 1;
  myExams: any;
  subjects: any;
  selectedSubjectId: any;
  chapters: any;
  paperType = 'paper';
  practiceHistory: any;
  paperHistory: any;
  selectedSubjectData: any;
  convertedDataChapter = [];
  chapterNames = [];
  showChapterGraph: boolean = false;
  convertedDataPracticeQuestions = [];
  convertedDataPaperQuestions = [];
  paperNamesPractice = [];
  paperNamesPaper = [];
  examId: any;
  sharedPaperType: any;
  columnChartPractice: Chart | undefined;
  topicLabelsPractice = [];
  convertedDataPractice = [];
  chartOptionspractice = {};
  showColumnPractie: boolean = false;
  showColumnPaper: boolean = false;
  userProfile = {};
  padding: number | undefined;
  paddingPractice: number | undefined;
  excellentChapters = null;
  averageChapters = null;
  poorChapter = null;
  columnWidth: number | undefined;
  scrHeight:any;
  scrWidth:any;
  activeCard: string = "";
  total_questions: number = 0;
  total_paper_time: number = 0;


  spinner:boolean = false;


  ngOnInit(): void {
    // setTimeout(() => {
    //   this.spinner = false;
    // },3000)
  }
  displaynoneicons(){

  }
  reattempt(data:any, da:any){

  }
  showShareOption(data:any){

  }
  shareinstaUrl(data:any, da:any, url:string){

  }
  sharemailUrl(data:any, da:any, url:string){

  }
  goToPage(data:any){

  }
  switchPaper(){

  }
  switchPractice(){

  }
  slideLeft(){

  }
  switchExam(data:any){

  }
  slideRight(){

  }
  slideLeftSubject(){

  }
  selectSubject(data:any){

  }
  slideRightSubject(){

  }
  slideLeftPractice(){

  }
  slideRightPractice(){

  }
slideLeftPracticeSubject(){

}
slideRightPracticeSubject(){

}
}
