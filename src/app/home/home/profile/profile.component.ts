import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import * as AOS from 'aos'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentTime: Date = new Date();
  modalRef!: BsModalRef;
  invitation:any;


  /* Profile Form Data */
  userProfileObj: any;
  boardList: any;
  studentClassList: any;
  stateList: any;
  cityList: any;
  instituteCityList: any;

  /* Phone Validation */
  userPhone: any;
  userOTP: any;
  validPhone = false;
  otpSent = false;
  allowSendOtp = false;
  phoneVerified = false;
  myExams: any;
  /* Image Cropper */
  userImage: string | undefined;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  deletionExamId: any;

  /* Allow Profile Edit */
  disabledField = {
    general: true,
    institute: true,
    address: true,
    parent: true
  };

  submitted = false;

  errors: any;
  feedback = null;
  domains: any;
  states: any;
  cities: any;
  contactNumber: any = 7865431243;
  sendOtp: boolean = true;
  otp: any;
  password: any;
  confirmPassword: any;
  imageFile:any;
  synProfileSubscriber!: Subscription;
  constructor(private form: FormBuilder,){
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000); // Update time every second (1000ms)
  }
  
  
  /* [Profile form ] */
  profileForm = this.form.group({
    fullname: new FormControl('Vishal', [Validators.required]),
    email: new FormControl({ value: 'vishal@gmail.com',  disabled: true }),
    otp: [''],
    phone: new FormControl({ value: '87654565645',  disabled: true }),
    address: new FormControl({}, [Validators.required]),
    city: new FormControl({  }),
    state: new FormControl({ }),
    zip: new FormControl({}),
    domains: new FormControl(),
    qualification: new FormControl({ }),
    gender: new FormControl({  }),
  })
  
  ngOnInit(): void {
    this.profileForm.get('fullname')?.disable();
this.profileForm.get('phone')?.disable();
this.profileForm.get('email')?.disable();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.init();
    }, 300); // Adjust the delay time as needed
  }

  
  changeUserProfile(data:any): void {

  }

  upadateProfileImage() {
    let imageFile: File;
    const imageFileInput = document.getElementById('profilepic');

if (imageFileInput instanceof HTMLInputElement && imageFileInput.files && imageFileInput.files.length > 0) {
    this.imageFile = imageFileInput.files[0];
    // Generate Form Data
    const formData: FormData = new FormData();
    formData.append('profileImage', this.imageFile);

    // Rest of your code using formData...
} else {
    // Handle the case where the element or file is not found
    console.error('No file selected or element not found');
}

    // Generate Form Data
    const formData: FormData = new FormData();
    formData.append('image', this.imageFile);
    console.log("aa");
    // Send User image to server
    // this.misc.showLoader('short');
    // this.misc.userProfile().subscribe((data:any) => {
      // this.networkRequest.putFiles(formData, `/api/profile/image/${data['user_id']}/`)
      //   .subscribe(
      //     data => {
      //       this.misc.userProfileChange.next(true);
      //       this.misc.hideLoader();
      //       this.getUserProfileImage();
      //     },
      //     error => {
      //       this.misc.hideLoader();
      //     });
    // });
  }
  onSubmit(){

  }

  fetchStateCities(data:any): void {

  }
  setDeletionId(data:any): void {

  }
  savePassword(){
    
  }
}
