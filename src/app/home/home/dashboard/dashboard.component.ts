import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  UserName:any;
  splittedUserName:any ;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _toastr: ToastrService){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.copyRoute = this.router.url;
        if (this.copyRoute.charAt(0) === '/') {
          this.currentRoute = this.copyRoute.slice(1);
        }
      });
      setInterval(() => {
        this.currentTime = new Date();
      }, 1000); 
  }
  ngOnInit(): void {
    if (this.copyRoute=='/dashboard') {
      this.dashboardContentShow = true;
    }
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
    
   
    this.UserName = localStorage.getItem('userMessage');
    if (this.UserName) {
      const nameParts = this.UserName.split(' ').map((part:any) => part.replace(',', ''));
      this.splittedUserName = nameParts.slice(0, 2).join(' ');
    }
    
  }
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  UserLogout(){
    console.log('logged out');
    localStorage.removeItem('userMessage');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this._toastr.success('Logged out!');
    this.router.navigate(['/login']);
  }
}
