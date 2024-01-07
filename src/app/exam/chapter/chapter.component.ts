import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  subjects: any[] =  [
        {
            "id": 5407,
            "title": "MATHAMATICS",
            "total_questions": 0,
            "attempted": 10,
            "percentage": 50,
            "videos_available": true
        },
        {
            "id": 5408,
            "title": "E.V.S",
            "total_questions": 0,
            "attempted": 6,
            "percentage": 100,
            "videos_available": true
        },
        
];


chapters:any[] = [
  {
      "id": 5407,
      "title": "Numbers",
      "total_questions": 0,
      "attempted": 10,
      "percentage": 50,
      "videos_available": true
  },
  {
      "id": 5408,
      "title": "Money",
      "total_questions": 0,
      "attempted": 6,
      "percentage": 100,
      "videos_available": true
  },
  {
      "id": 5409,
      "title": "Measurement",
      "total_questions": 10,
      "attempted": 8,
      "percentage": 30,
      "videos_available": true
  },
  {
      "id": 5429,
      "title": "Data Handling",
      "total_questions": null,
      "attempted": null,
      "percentage": null,
      "videos_available": true
  },
  {
      "id": 5439,
      "title": "Patterns",
      "total_questions": null,
      "attempted": null,
      "percentage": null,
      "videos_available": true
  }
]

currentQuestionIndex: number = 0;
  selectedOption: number | null = null;
  showResult: boolean = false;



Question = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1, // Index 1 corresponds to "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Venus", "Mars", "Saturn"],
    correctAnswer: 2, // Index 2 corresponds to "Mars"
  },
  // Add more questions similarly
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    correctAnswer: 0, // Index 0 corresponds to "Leonardo da Vinci"
  },
  {
    id: 4,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1, // Index 1 corresponds to "Blue Whale"
  },
  // Add more questions here...
];

 selectOption(index: number) {
    this.selectedOption = index;
  }
  nextQuestion() {
    this.selectedOption = null;
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === this.Question.length) {
      this.showResult = true;
    }
  }
  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.showResult = false;
  }


@ViewChild('closeModald') closeModald!: ElementRef;
// value!:number;
// ckeConfig: any;
// mycontent!: string;
log: string = '';
chooseSubjectsFlag: boolean = true;
examId!: number;
// pathQuestions: any;
examDetails: any;
// domainId: any;
selectedSubjectId!: string;
// selectedChapters = [];
// selectedSubjects = [];
// totalQuestions: number = 10;
// totalTime: number = 0;
// questionTypes = [];
difficulty: number = 5;
// fetchedQuestions!:any;
paperType = 'practice';
// totalMarks!:any;
// avgtime!:any;
totalusers!:any;
// linkedTypes!:any;
// showTime: boolean = true;
// subjectChapters!:any;
// errorMsg!:any;
selectedChapter!:any;
// submitStatus: boolean = false;
abcd:boolean = true;
efgh:boolean = false;
// mockParameterFound: boolean = false;
selectedChapterid!:any;
// quesTypes = [];
showSubjective: boolean = false;
// includeSubjectiveflag: boolean = true;
// excludeSubjectiveflag: boolean = false;
ifanydifficulty: boolean = false;
spinner:boolean = true;

@ViewChild("myckeditor", {static: false}) ckeditor: any;
@ViewChild('widgetsContent') widgetsContent!: ElementRef;

  constructor(private _router: Router){    
  }
  ngOnInit(): void {

  }
  getChapters(id:number){
    console.log('getChapters ID',id)
  }
  
  slideRight(){
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }
  slideLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }
  saveChapterId(id:any){
    this.selectedChapterid = id;
    this.selectDifficultyLevel(2, 5);
    // this._router.navigate(['/start-Exam']);
  }

  selectDifficultyLevel(i:number, level:number) {
    this.ifanydifficulty = false;
    this.difficulty = level;
    let id = "";
    for (let i = 1; i < 4; i++){
      id = "regi" + i;
      document.getElementById(id)?.classList.remove("selected");
    }
    id = "";
    id = "regi" + i;
    document.getElementById(id)?.classList.add("selected");
    document.getElementById('allrange')?.classList.remove("selected");
  }



  selectAnyRange() {
    this.ifanydifficulty = true;
    let id = "";
    for (let i = 1; i < 4; i++){
      id = "regi" + i;
      document.getElementById(id)?.classList.remove("selected");
    }
    document.getElementById('allrange')?.classList.add("selected");
  }


  // @ViewChild('myModal') myModal!: ModalDirective;

  submitFilterForm(){
    // this.closeModald.nativeElement.hide();
    this._router.navigate([`/start-Exam`]);
  }


  includeSubjective(evenyt:any){

  }
  includeObjective(event:any){

  }
}
