import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  createForm() {
    this.registerForm = this.formBuilder.group({
      eMail: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), this.validateUsername]],
      password: ['', [Validators.required, , Validators.minLength(4)]],
      confirm: ['', Validators.required]
    }, {validator: this.matchingPasswords.bind(this.registerForm)})
  }

  onRegisterSubmit() {
    let user = {
      email: this.registerForm.get('eMail').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
    }

    this.authService.registerUser(user).subscribe(data => console.log(data))
  }

  validateUsername(controls) {
    const regexp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regexp.test(controls.value)) {
      return null
    }
    else {
      return {'validateUsername': true}
    }
  }

  matchingPasswords(group: FormGroup) {
      if(group.controls['password'].value === group.controls['confirm'].value) {
        return null
      }
      else{
        return {'matchingPasswords': true}
      }
  }


  ngOnInit() {
    this.createForm()
  }

}
