import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TryReportService {

  QuestionsLength:any;
  skippedQuestions:any;
  AttemptedQuestions:any;
  IncorrectQuestions:any;

  constructor() {

  }
  getQuestionsLength(length:any){
    this.QuestionsLength = length;
    console.log('get the length of questions--',this.QuestionsLength);
  }
  skippedQuestion(question:any){
    this.skippedQuestions = question;
     console.log('skipped questions', this.skippedQuestions);
   }
}
