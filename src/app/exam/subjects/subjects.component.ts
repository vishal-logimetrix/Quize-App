import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/Services/login.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {

  id:any;

  selectedCategoryId = null;
  courses: any;
  searchTerm: any;
  examCategories: any;
  announcements: any;
  categoryDetails: any;
  links: any;
  max_page: number | undefined;
  pages = [];
  currentPage: number = 1;
  startPage: number = 1;
  endPage: number = 1;


  subjects: any[] = [];

  constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService){

  }
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this._loginService.getSubject(this.id).subscribe((subject: any) => {
      this.subjects = subject.Subjects;
      // console.log('getting subject', this.subjects);
      for (let i = 0; i < this.subjects.length; i++) {
        const subjectData = this.subjects[i];
        // console.log('Subject ID:', subjectData.id);
        // console.log('Subject Name:', subjectData.name);
        // console.log('Subject Description:', subjectData.description);
      }
    });
  }
  checkOverflow (element:any) {
    return element.offsetHeight < element.scrollHeight ||
           element.offsetWidth < element.scrollWidth;
  }
  selectExam(id:any) {
  }

  searchCourses() {
    // let tmpCourses = [];
    // for (var i = 0; i < this.courses.length; i++) {
    //   if (this.courses[i]['title'].toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
    //     tmpCourses.push(this.courses[i]); 
    //   }
    // }
    // this.courses = tmpCourses;
    // console.log("filtered domains ", this.courses);
  }
  getDomains() {
    // this.networkRequest.getWithHeaders('/api/domain/')
    //   .subscribe(
    //     data => {
    //       console.log("domains ", data);
    //       // Populate Selected Assessment list with server data
    //       this.courses = data;
    //       if (this.searchTerm) {
    //         this.searchCourses();
    //       }
    //     },
    //     error => {
    //       console.log("error ", error);
    //     }
    //   );
  }

  fetchDetails(id:any) {
    // this.networkRequest.getWithHeaders(`/api/examcategory/${id}/`)
    // .subscribe(
    //   data => {
    //     console.log("category details ", data);
    //     this.categoryDetails = data;
    //   },
    //   error => {
    //   });
  }

  fetchByCategory(id:any) {
    // this.selectedCategoryId = id;
    // if (id == 'all') {
    //   this.selectedCategoryId = null;
    //   this.getDomains();
    //   return;
    // }
    // this.networkRequest.getWithHeaders(`/api/domain/?category_id=${id}`)
    // .subscribe(
    //   data => {
    //     console.log("filtered domains ", data);
    //     // Populate Selected Assessment list with server data
    //     this.courses = data;
    //     if (this.searchTerm) {
    //       this.searchCourses();
    //     }
    //     this.goToPage(1);
    //   },
    //   error => {
    //     console.log("error ", error);
    //   }
    // );
  }
  selectCourse(id:any,s_name:AnalyserNode) {
    console.log('gettingChapterID', id);
    this._router.navigate([`/chapters/${id}/${s_name}`]);

  }

  goToPage(pageIndex:any) {
    // this.currentPage = pageIndex;
    // this.fetchAnnouncements();
  }
  
  fetchAnnouncements() {
    // let domainIds;
    // for (let i = 0; i < this.courses.length; i++) {
    //   if (i==0) {
    //     domainIds = this.courses[i]['id'];
    //   }
    //   else {
    //     domainIds = domainIds + ','+ this.courses[i]['id'];
    //   }
    // }
    // this.networkRequest.getWithHeaders(`/api/multipledomainannouncement/?domains=${domainIds}&page=${this.currentPage}`)
    // .subscribe(
    //   data => {
    //     console.log("announcements ", data);
    //     this.announcements = data['results'];
    //   },
    //   error => {
    //     console.log("error ", error);
    //   }
    // );
  }

 

  ngOnDestroy() {
    // this.courseswitchservice.updateExamPageStatus(false);
  }

}
