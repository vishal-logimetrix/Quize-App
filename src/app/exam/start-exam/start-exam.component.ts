import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren,} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/Services/login.service';
import { TryReportService } from 'src/Services/try-report.service';
@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css'],
})
export class StartExamComponent implements OnInit {
  selectedOptionIndex: number = -1;
  questions:any[] = [];
  selectedOptions: number[] = [];
  questionTexts: any;
  currentQuestionIndex: number = 0;
  userAnswers: any[] = [];
  UserResultData:any[]=[];
  selectedOptionsMap: { [questionId: string]: number } = {};

  constructor(private renderer: Renderer2, private _router: Router, private _tryReportService: TryReportService, private _loginService:LoginService, private _route: ActivatedRoute) {
  }
  testObj: any;
  // question: any;
  bookmarks: any;
  currentQuesBookmarked: boolean = false;
  // issueType = 'Question Unclear';
  // hiddenDiv: boolean = false;
  subjectName:any;
  chapter_id:any;
  answeredQuestions: { questionId: string; answer: string; selectedOptionId?: any }[] = [];
  ngOnInit() {
  this.findCurrentQuestion();
  this.findAnsweredQuestions();
  this.findNotAttemptedQuestions();
  this.findAnsweredQuestionValues();
  this.findVisitedNotAnsweredQuestions();
  this.subjectName = this._route.snapshot.paramMap.get('s_name');
  this.chapter_id = this._route.snapshot.paramMap.get('chapter_id');
  this._loginService.getQuestions(this.subjectName, this.chapter_id).subscribe((apiResponse: any) => {
    if (apiResponse.status && apiResponse.all_question && Array.isArray(apiResponse.all_question)) {
      this.questions = apiResponse.all_question.map((apiQuestion:any) => {
        return {
          id: apiQuestion.id,
          question: apiQuestion.question,
          options: [
            apiQuestion.optiona,
            apiQuestion.optionb,
            apiQuestion.optionc,
            apiQuestion.optiond,
          ],
          // correctAnswer: // Your logic to map the correct answer based on the API response,
        };
      });
    } else {
      console.error('API response is not as expected:', apiResponse);
    }
  }, (error) => {
  }, () => {
  });
  for (const answeredQuestion of this.answeredQuestions) {
    this.selectedOptionsMap[answeredQuestion.questionId] = answeredQuestion.selectedOptionId;
  }
  }
  isQuestionAnswered(questionIndex: number): boolean {
    return this.answeredQuestions.some(answer => answer.questionId === this.questions[questionIndex].id);
}
  // Question Count
  // notAnswerdCount = [];
  // completedCount = [];
  // savedReviewCount = [];
  // reviewCount = [];
  currentQuestion = 0;
  // totalQuestions: any;
  // questionIds = [];
  paperDetails: any;
  questionDetails: any;
  // solutionDetails: any;
  // correctAnswers: number[] = [];
  notAttemptedQuestions:any;
  answeredQuestionValues:any;
  visitedNotAnsweredQuestions:any;

  findCurrentQuestion() {
    const currentQuestion = this.currentQuestion;
    const question = this.questions[currentQuestion];
  }
  // Find Answered Questions
findAnsweredQuestions() {
  const answeredQuestions = this.answeredQuestions.map(answer => {
    const question = this.questions.find((q:any) => q.id === answer.questionId);
    return { ...answer, question };
  });
  // console.log('Answered Questions:', answeredQuestions);
}
findAnsweredQuestionValues() {
  this.answeredQuestionValues = this.answeredQuestions.map(answer => {
    return {
      questionId: answer.questionId,
      selectedAnswer: answer.answer,
      selectedOptionId: answer.selectedOptionId 
    };
  });
  // console.log('Answered Questions Values:', this.answeredQuestionValues);
}
// Find Not Attempted Questions
findNotAttemptedQuestions() {
  this.notAttemptedQuestions = this.questions.filter((question:any) => {
    return !this.answeredQuestions.some(answer => answer.questionId === question.id);
  });
  // console.log('not attempted questions --',this.notAttemptedQuestions);
}
findVisitedNotAnsweredQuestions() {
  this.visitedNotAnsweredQuestions = this.questions.filter((question: any) => {
    // Check if the question is visited but not answered
    const questionId = question.id;
    const isVisited = this.testObj?.data?.questions[questionId]?.visited ?? false;
    const isAnswered = this.answeredQuestions.some((answered: any) => answered.questionId === questionId);
    return isVisited && !isAnswered;
  });
  // console.log('Visited but not Answered Questions:', this.visitedNotAnsweredQuestions);
}
  selectMCQ(event: any, optionIndex: any) {
    const selectedAnswer = this.questions[this.currentQuestion].options[optionIndex];
    const questionId = this.questions[this.currentQuestion].id;
    this.selectedOptionsMap[questionId] = optionIndex;
    const existingAnswerIndex = this.answeredQuestions.findIndex(
      (q) => q.questionId === questionId
    );
    if (existingAnswerIndex !== -1) {
      this.answeredQuestions[existingAnswerIndex].answer = selectedAnswer;
      this.answeredQuestions[existingAnswerIndex].selectedOptionId = optionIndex; // Store the selected option ID
    } else {
      this.answeredQuestions.push({ questionId, answer: selectedAnswer, selectedOptionId: optionIndex });
    }
    // console.log('question and answer', this.answeredQuestions);
  }
  showLoader = {
    visibility: false,
  };
  unmark() {
    for (let i = 0; i < this.bookmarks.length; i++) {
      if (this.questionDetails['id'] == this.bookmarks[i]['question']['id']) {
      }
    }
  }
  bookmark() {
    var subject;
    this.currentQuesBookmarked = true;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i]['id'] == this.questionDetails['id']) {
        subject = this.questions[i]['subject'];
      }
    }
    const formData = {
      paper: this.paperDetails['id'],
      question: this.questionDetails['id'],
      subject: subject,
    };
  }
  resetIssue() {
    // this.selectErrorType(1, 'Question Unclear');
  }
  fetchQuestionDetails(id: any) {}
  question_score: any;
  showQuestion() {}
  nextQuestion() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    }
    const currentQuestionId = this.questions[this.currentQuestion].id;
    const attemptedAnswer = this.answeredQuestions.find(
      (q) => q.questionId === currentQuestionId
    );
    if (attemptedAnswer) {
      // console.log(
      //   `Question ID: ${currentQuestionId}, Attempted Answer: ${attemptedAnswer.answer}`
      // );
    } else {
    }
  this.findCurrentQuestion();
  this.findAnsweredQuestions();
  this.findNotAttemptedQuestions();
  this.findAnsweredQuestionValues();
  this.findVisitedNotAnsweredQuestions();
  }
  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }
  jumpToQuestion(questionIndex: any) {
    this.currentQuestion = questionIndex;
  }
  // getCircleClass(questionIndex: any) {
  //   const question = this.testObj['data']['questions'][questionIndex];
  //   if (question['review']) {
  //     return 'btn-review';
  //   } else if (question['sReview']) {
  //     return 'sbtn-review';
  //   } else if (question['completed'] || question['attempt']) {
  //     return 'btn-success';
  //   } else if (question['visited']) {
  //     return 'btn-danger';
  //   } else {
  //     return 'btn-not-visited';
  //   }
  // }
  completeTest() {
    const score: any= 5;
    document.getElementById("dimissModal")?.click();
    const selected_by_user: any[] = [];
    // Create a separate array with information about all questions
    const allQuestionsInfo = this.questions.map((question) => {
      const answer = this.answeredQuestions.find((a) => a.questionId === question.id);
      const selectedOption = answer ? this.getOptionLetter(answer.selectedOptionId) : '';
      selected_by_user.push({
        id: question.id,
        selected_answer: selectedOption,
      });
      return {
        id: question.id,
        selected_answer: selectedOption,
      };
    });
    this._loginService.getResult({selected_by_user}).subscribe((response:any) =>{
    console.log('getting result',response.data);
      this.UserResultData = response.data;
    this._loginService.resultData = this.UserResultData;
    this._tryReportService.correctAnswer = response.data.correctAnswer;
    this._tryReportService.totalMarks = response.data.totalMarks;
    this._tryReportService.totalQuestions = response.data.totalQuestions;
    this._tryReportService.unattempts = response.data.unattempts;
    this._tryReportService.wrongAnswer = response.data.wrongAnswer;
    this._router.navigate([`/report`]);
    });
  }
  getOptionLetter(index: number | undefined): string {
    const optionLetters = ['a', 'b', 'c', 'd'];
    return index !== undefined ? optionLetters[index] : '';
  }
}
