import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren,} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TryReportService } from 'src/Services/try-report.service';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css'],
})
export class StartExamComponent implements OnInit {
  selectedOptionIndex: number = -1;

  questions: any = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 1, // Index 1 corresponds to "Paris"
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Jupiter', 'Venus', 'Mars', 'Saturn'],
      correctAnswer: 2, // Index 2 corresponds to "Mars"
    },
    // Add more questions similarly
    {
      id: 3,
      question: 'Who painted the Mona Lisa?',
      options: [
        'Leonardo da Vinci',
        'Pablo Picasso',
        'Vincent van Gogh',
        'Michelangelo',
      ],
      correctAnswer: 0, // Index 0 corresponds to "Leonardo da Vinci"
    },
    {
      id: 4,
      question: 'What is the largest mammal in the world?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
      correctAnswer: 1, // Index 1 corresponds to "Blue Whale"
    },
    {
      id: 5,
      question: 'What is the capital of Maharastra?',
      options: ['Pune', 'Mumbai', 'thane', 'nagpur'],
      correctAnswer: 1, // Index 1 corresponds to "Blue Whale"
    },
    {
      id: 6,
      question: 'What is the capital of India?',
      options: ['Pune', 'mumbai', 'Delhi', 'Banglore'],
      correctAnswer: 2, // Index 1 corresponds to "Blue Whale"
    },
    {
      id: 7,
      question: 'Who is PM of India?',
      options: [
        'Yogi Adityanath',
        'Narendra Modi',
        'Nitin Gadakari',
        'Devendra Fadnvis',
      ],
      correctAnswer: 1, // Index 1 corresponds to "Blue Whale"
    },
    {
      id: 8,
      question: 'Who won  the ODI worldcup in 2023?',
      options: ['IND', 'PAK', 'ENG', 'AUS'],
      correctAnswer: 3, // Index 1 corresponds to "Blue Whale"
    },
    // Add more questions here...
  ];

  selectedOptions: number[] = [];
  questionTexts: any;
  currentQuestionIndex: number = 0;


  constructor(private renderer: Renderer2, private _router: Router, private _tryReportService: TryReportService) {
    this._tryReportService.getQuestionsLength(this.questions);
  }


  testObj: any;
  question: any;
  bookmarks: any;
  currentQuesBookmarked: boolean = false;
  issueType = 'Question Unclear';
  hiddenDiv: boolean = false;

  // answeredQuestions: { questionId: string; answer: string }[] = [];
  answeredQuestions: { questionId: string; answer: string; selectedOptionId?: number }[] = [];

  ngOnInit() {
  this.findCurrentQuestion();
  this.findAnsweredQuestions();
  this.findNotAttemptedQuestions();
  this.findAnsweredQuestionValues();
  this.findVisitedNotAnsweredQuestions();
  }

  closeSolutionFunction() {
    this.hiddenDiv = false;
  }
  selectErrorType(i: number, type: any) {
    this.issueType = type;
    let id = '';
    for (let i = 1; i < 6; i++) {
      id = 'regi' + i;
      document.getElementById(id)?.classList.remove('selected');
    }
    id = '';
    id = 'regi' + i;
    document.getElementById(id)?.classList.add('selected');
  }
  
  // Question Count
  notAnswerdCount = [];
  completedCount = [];
  savedReviewCount = [];
  reviewCount = [];
  currentQuestion = 0;
  totalQuestions: any;
  questionIds = [];
  paperDetails: any;
  questionDetails: any;
  solutionDetails: any;
  correctAnswers: number[] = [];
  notAttemptedQuestions:any;
  answeredQuestionValues:any;
  visitedNotAnsweredQuestions:any;
  findCurrentQuestion() {
    const currentQuestion = this.currentQuestion;
    const question = this.questions[currentQuestion];
    // console.log('Current Question:', question);
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
    const selectedOptionId = optionIndex; // Modify this to get the ID of the selected option if available
  
    const existingAnswerIndex = this.answeredQuestions.findIndex(
      (q) => q.questionId === questionId
    );
    
    if (existingAnswerIndex !== -1) {
      this.answeredQuestions[existingAnswerIndex].answer = selectedAnswer;
      this.answeredQuestions[existingAnswerIndex].selectedOptionId = selectedOptionId; // Store the selected option ID
    } else {
      this.answeredQuestions.push({ questionId, answer: selectedAnswer, selectedOptionId });
    }
    // console.log('question and answer', this.answeredQuestions);
  }
  

  urls = [];
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
    this.selectErrorType(1, 'Question Unclear');
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
      console.log(
        `Question ID: ${currentQuestionId}, Attempted Answer: ${attemptedAnswer.answer}`
      );
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
    // this.showQuestion();
    // this.fetchQuestionDetails(this.questionIds[questionIndex]);
  }

  /**
   * Get Question status circle color
   */
  getCircleClass(questionIndex: any) {
    const question = this.testObj['data']['questions'][questionIndex];
    if (question['review']) {
      return 'btn-review';
    } else if (question['sReview']) {
      return 'sbtn-review';
    } else if (question['completed'] || question['attempt']) {
      return 'btn-success';
    } else if (question['visited']) {
      return 'btn-danger';
    } else {
      return 'btn-not-visited';
    }
  }
  
  completeTest() {
  
      document.getElementById("dimissModal")?.click();
      let score = 0;
      this.answeredQuestions.forEach((answer) => {
        const question = this.questions.find(
          (q: any) => q.id === answer.questionId
        );
        if (
          question &&
          question.correctAnswer === question.options.indexOf(answer.answer)
        ) {
          score++;
        }
      });
      console.log('Score:', score);
        //save the notAttemptedQuestions into service
      this._tryReportService.skippedQuestion(this.notAttemptedQuestions);
      this._tryReportService.getQuestionsLength(this.questions);
      this._router.navigate([`report/:${score}`]);

  }
  

}
