// exam.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectBoardComponent } from './select-board/select-board.component';
import { DashboardComponent } from '../home/home/dashboard/dashboard.component';
import { ChoosePComponent } from './choose-p/choose-p.component';
import { ExamOverviewComponent } from './exam-overview/exam-overview.component';
import { ChapterComponent } from './chapter/chapter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { StartExamComponent } from './start-exam/start-exam.component';
import { ReportComponent } from './report/report.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';


// Define routes for the Exam Module
const routes: Routes = [
  { path: '', component: DashboardComponent,children: [
    { path: 'select-board', component: SelectBoardComponent},
    { path: 'choose-p', component: ChoosePComponent},
    { path: 'exam-overview', component: ExamOverviewComponent},
    { path: 'chapters', component: ChapterComponent},
    { path: 'start-Exam', component: StartExamComponent},
    { path: 'report/:score', component: ReportComponent},
  ]
}, 
{ path: '**', component: PageNotFoundComponent },
  ]
@NgModule({
  declarations: [
   SelectBoardComponent,
   ChoosePComponent,
   ExamOverviewComponent,
   ChapterComponent,
   StartExamComponent,
   ReportComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AppRoutingModule,
    HighchartsChartModule
  
  ],
})
export class ExamModule {
  constructor(){
    console.log("ExamModule")
  }
}
