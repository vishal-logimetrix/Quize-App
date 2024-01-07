import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-your-query',
  templateUrl: './post-your-query.component.html',
  styleUrls: ['./post-your-query.component.css']
})
export class PostYourQueryComponent implements OnInit {

  queryForm!: FormGroup;
  fileObjectURL: any;
  submitted: boolean = false;
  selectedFile: File | undefined;

  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.queryForm = this.formBuilder.group({
      name: ['vishal'],
      email: ['vishal@gmail.com'],
      class: ['class-1'],
      question: [''],
      description: [''],
      file: [null]
    });
  }
  onSubmit() {
    if (this.queryForm.valid) {
      const formData = this.queryForm.value;
      console.log(formData);
      this.submitted = true;

    }
  }
  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length) {
      this.selectedFile = files[0];
      console.log(this.selectedFile)
      // Create object URL for the selected file and assign it to fileObjectURL
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.fileObjectURL = reader.result;
      };
    }
  }
  
  

}
