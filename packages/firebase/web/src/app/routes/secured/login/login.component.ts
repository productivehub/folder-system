import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = null;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: [
        null, Validators.required
      ]
    });
  }

  googleLogin() {
    this.auth.googleSignin().then(() => {
      this.router.navigate(['/']);
    }).catch(() => {
      // do nothing
    })
  }

  async login($event: any) {
    this.errorMessage = null;

    if ($event.preventDefault) $event.preventDefault();

    if (this.loginForm.valid) {
      this.auth.login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      ).then(res => {
        this.router.navigate(['/']);
      }).catch(err => {
        this.errorMessage = err.message;
        // console.log(err);
      });
    }
  }

  ngOnInit() {
  }

}
