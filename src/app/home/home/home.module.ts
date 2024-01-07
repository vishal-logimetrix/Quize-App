import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverAllHistoryComponent } from './over-all-history/over-all-history.component';
import { PostYourQueryComponent } from './post-your-query/post-your-query.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
// const routes: Routes = [
//   { path: '',component: DashboardComponent},
//   {path: 'chapters',component: ChaptersComponent}
// ];
const routes: Routes = [
  { path: '',component: DashboardComponent, children: [
    { path: 'overall-history', component: OverAllHistoryComponent},
    { path: 'post-your-query', component: PostYourQueryComponent},
    { path: 'home-content', component: HomeContentComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'contact-Us', component: ContactUsComponent},
    { path: 'about-Us', component: AboutUsComponent},
  ]}
];

@NgModule({
  declarations: [
    DashboardComponent,
    OverAllHistoryComponent,
    PostYourQueryComponent,
    HomeContentComponent,
    FooterComponent,
    ProfileComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ]
})
export class HomeModule { 
  constructor(){
    console.log("HomeModule")
  }
}
