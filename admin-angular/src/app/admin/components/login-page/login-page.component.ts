import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../../../interfaces";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  submitted = false;
  form!: FormGroup;
  message: string = '';

  constructor(public auth: AuthService,
              private router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, login again';
      }
    })

    this.form = new FormGroup<LoginForm>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/admin', 'articles']).then();
    }

  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user: LoginUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'articles']).then();
      this.submitted = false;
    })

  }

}
