import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private _router: Router, private formBuilder: FormBuilder){}
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
  loginUser(data:any){
    console.log('login data:', data);
    this._router.navigate(['/home-content'])
  }
}
