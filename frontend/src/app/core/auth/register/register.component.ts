import { Component, HostListener } from '@angular/core';
import { RegisterForm, RegisterService } from './register.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService],
})
export class RegisterComponent {
  @HostListener('keydown', ['$event']) onKeyDown = (e: any) => {
    if (e.keyCode === 13 && e.key === 'Enter') {
      this.onSubmit();
    }
  };
  form: FormGroup<RegisterForm> = this.service.getForm();

  constructor(private service: RegisterService, private router: Router) {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.service.register(this.form.getRawValue()).subscribe({
      error: () => {
        this.form.controls.email.reset();
      },
      next: () => {
        this.router.navigate(['login']);
      },
    });
  }
}
