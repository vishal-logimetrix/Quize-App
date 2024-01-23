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
import { authGuard } from 'src/app/auth.guard';
import { AppRoutingModule } from 'src/app/app-routing.module';

const routes: Routes = [
  { path: '',component: DashboardComponent,canActivate: [authGuard], children: [
    { path: 'overall-history', component: OverAllHistoryComponent, canActivate: [authGuard]},
    { path: 'post-your-query', component: PostYourQueryComponent , canActivate: [authGuard]},
    { path: 'home-content', component: HomeContentComponent, canActivate: [authGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'contact-Us', component: ContactUsComponent, canActivate: [authGuard]},
    { path: 'about-Us', component: AboutUsComponent, canActivate: [authGuard]},
  ]},
  
    
  
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
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    AppRoutingModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { 
  constructor(){
    console.log("HomeModule")
  }
}
