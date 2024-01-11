import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private router: Router, private authservice: AuthService) {}
  ngOnInit() {
}

forgetForm = new FormGroup({
  Email : new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
  Password : new FormControl("",[Validators.required, Validators.minLength(6)]),
   RPassword : new FormControl("")
});

get Email(): FormControl{
  return this.forgetForm.get("Email") as FormControl;
}
get Password(): FormControl{
  return this.forgetForm.get("Password") as FormControl;
}
get RPassword(): FormControl{
  return this.forgetForm.get("RPassword") as FormControl;
}

OnSubmit(){

  if(this.Password.value == this.RPassword.value)
  {
  
    this.authservice.resetPassword(this.Email.value, this.Password.value)
    .subscribe(
        (response) => {
          console.log('Password reset successful!');
          // Handle success response as needed
        },
        (error) => {
          console.error('Password reset failed:', error);
          // Handle error response as needed
        }
      );
  }
  else 
  {
    alert("Password & Confirm Password doesn't match !")
  }
  
}

}
