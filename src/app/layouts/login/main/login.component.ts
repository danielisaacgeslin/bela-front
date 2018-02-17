import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';

import { LoginService } from '../../../services/api';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formGroup: FormGroup = new FormGroup({
    username: new FormControl('user', Validators.required),
    password: new FormControl('password', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) { }

  public onSubmit(): void {
    this.login();
  }

  private login(): void {
    const { username, password } = this.formGroup.getRawValue();
    this.formGroup.disable();
    this.loginService.login(username, password).pipe(
      tap(() => this.router.navigate(['exchange'])),
      finalize(() => this.formGroup.enable())
    )
      .subscribe();
  }
}
