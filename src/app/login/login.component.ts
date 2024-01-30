import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, NgForm } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BootstrapService } from 'src/Services/bootstrap.service';
import { LoginService } from 'src/Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  phoneNumber: any;
  otp: any;
  showLogin: boolean = true;
  showRegister: boolean = false;
  showOtp: boolean = false;
  registrationPhoneNumber: any;
  name: any;
  validLoginNo: boolean = false;
  showOtpRegister: boolean = false;
  passwordLogin: boolean = true;
  phonepattern = /^[6-9]\d{9}$/;
  otppattern = /^[0-9]\d{6}$/;
  namepattern = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
  password: any;
  signupAsStudent: boolean = true;
  activeCard: string = "student";
  timer: number = 30;
  timervar: any;
  registrationOTP: any;
  validName: boolean = false;
  activeFaq: boolean = false;
  activeAssociation: boolean = false;
  activeAbout: boolean = false;
  activeGoal: boolean = false;
  private routerSubscription!: Subscription;
  ModelPopUp: boolean = false;




  isLogin: boolean = true;
  isRegister: boolean = false;
  registerSuccessMsg:boolean= false;
  registerForm!: FormGroup;
  class_id:any;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _loginService: LoginService, private _toastr: ToastrService, private _bt: BootstrapService){}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      selectedClass: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator.bind(this)
    });

    localStorage.removeItem('userMessage');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    //IMPORTANT-->
    this.routerSubscription = this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Remove modal backdrop on navigation start
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
      }
      if (event instanceof NavigationEnd) {
        // Ensure modal backdrop is removed after navigation is complete
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
      }
    });

  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

  }
  changeLoginForm(){
    this.isLogin =false;
    this.isRegister = true;
  }
  changeRegisterForm(){
    this.isLogin = true;
    this.isRegister = false;
    this.registerSuccessMsg = false;
  }
  RegisterStudent(){
    if(this.registerForm.valid){
      console.log('registerStudent form values updated', this.registerForm.value);
      //add API key to register here.
      this._toastr.success('Registration done successfully!');
        this.registerSuccessMsg = true;
    this.isLogin = false;
    this.isRegister = !this.isRegister;
    }
  }
  loginUser(user:any){
    // this.ModelPopUp = false;
    // this.showLogin = false;
    // this.isLogin = false;
    // this.passwordLogin = false; 
    this._bt.hideModal();
    // this._loginService.loginUser(user).subscribe((result:any)=>{
    //   if (result) {
    //     this._toastr.success(result.user.message);
    //     const userMessage = result.user.message;
    //     const userToken = result.user.token;
    //     localStorage.setItem('userMessage', userMessage);
    //     localStorage.setItem('userToken', userToken);
    //     localStorage.setItem('user', JSON.stringify(result));
    //     this.class_id = result.user.class_id[0]
    //     localStorage.setItem('id',this.class_id);
    //   }
    // })  
    this._router.navigate(['/dashboard']);
    console.log('login credentials-', user);
  }

  showLoginForm() {
    this.ModelPopUp = true;
    this.phoneNumber = null;
    this.showLogin = true;
    this.showOtp = false;
  }
  openRegister() {
    this.registrationPhoneNumber = null;
    this.name = null;
    this.showLogin = false;
    this.validLoginNo = false;
    this.showOtpRegister = false;
  }
  validateLoginNumber() {
    if (!this.phoneNumber.match(this.phonepattern)) {
      this.validLoginNo = false;
    }
    else {
      this.validLoginNo = true;
    }
  }

  loginUsingPassword() {

    const username = this.phoneNumber;
    const password = this.password;
    this._bt.hideModal();
  }

  signUpStudent() {
    this.signupAsStudent = true;
    this.activeCard = 'student';
  }

  signUpTeacher() {
    this.signupAsStudent = false;
    this.activeCard = 'teacher';

  }

  sendOTPRegister(){

  }
  verifyOtp(otp:any) {

  }
  register() {
    const fullname = this.name;
    const phone = this.registrationPhoneNumber;

    const user = {
      user: {
        phonenumber: phone,
        fullname: fullname,
        password: this.password
      }
    };
  }

  validateSignUpName() {
    if (!this.name.match(this.namepattern)) {
      this.validName = false;
    }
    else {
      this.validName = true;
    }
  }

  validateSignUpNumber() {
    if (!this.registrationPhoneNumber.match(this.phonepattern)) {
      this.validLoginNo = false;
    }
    else {
      this.validLoginNo = true;
    }
  }

  ngOnDestroy() {
    // Unsubscribe from router events when component is destroyed
    this.routerSubscription.unsubscribe();
  }

}
