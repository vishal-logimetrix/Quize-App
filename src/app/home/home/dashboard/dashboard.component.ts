import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  spinner:boolean = true;
  @ViewChild('sidebar', { static: true }) sidebarElement!: ElementRef;
  isSidebarOpen: boolean = false;
  copyRoute:string = '';
  currentRoute: string = '';
  currentTime: Date = new Date();
  dashboardContentShow: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.copyRoute = this.router.url;
        if (this.copyRoute.charAt(0) === '/') {
          this.currentRoute = this.copyRoute.slice(1);
        }
      });
      setInterval(() => {
        this.currentTime = new Date();
      }, 1000); // Update time every second (1000ms)
  }
  ngOnInit(): void {
    if (this.copyRoute=='/dashboard') {
      this.dashboardContentShow = true;
    }
        // setTimeout(() => {
    //   this.spinner = false;
    // },3000)
  }
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    // this.adjustWidth();
  }
  adjustWidth() {
    const content = document.querySelector('.content') as HTMLElement;
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (this.isSidebarOpen) {
        content.style.marginLeft = '250px'; // Set sidebar width
        navbar.style.width = 'calc(100% - 250px)'; // Adjust navbar width
    } else {
        content.style.marginLeft = '0'; // Hide sidebar
        navbar.style.width = '100%'; // Adjust navbar to full width
    }
}
}
