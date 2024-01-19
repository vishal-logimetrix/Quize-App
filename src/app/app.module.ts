import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home/home.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { ExamModule } from './exam/exam.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HomeModule,
    HighchartsChartModule,
    ExamModule,
    HttpClientModule,

  ],
  providers: [ { provide: 'authGuard', useValue: authGuard } ],

  bootstrap: [AppComponent]
})
export class AppModule { }
