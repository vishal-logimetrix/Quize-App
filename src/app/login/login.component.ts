import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLogin: boolean = true;
  isRegister: boolean = false;
  registerSuccessMsg:boolean= false;
  registerForm!: FormGroup;
  class_id:any;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _loginService: LoginService){}
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
        this.registerSuccessMsg = true;
    this.isLogin = false;
    this.isRegister = !this.isRegister;
    }
  }
  loginUser(user:any){
    this._loginService.loginUser(user).subscribe((result:any)=>{
      const userMessage = result.user.message;
      const userToken = result.user.token;
      localStorage.setItem('userMessage', userMessage);
      localStorage.setItem('userToken', userToken);
      localStorage.setItem('user', JSON.stringify(result));
      this.class_id = result.user.class_id[0]
      localStorage.setItem('id',this.class_id);
      this._router.navigate(['/home-content']);
    })  
  }
}
