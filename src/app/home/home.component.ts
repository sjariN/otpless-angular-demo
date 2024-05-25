import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initOTPless } from '../../utils/initOtpless';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(@Inject(DOCUMENT) private document: Document,private router: Router) {}
  ngOnInit(): void {
    initOTPless(this.callback);
  }

  callback = (otplessUser: any): void => {
    alert(JSON.stringify(otplessUser));
    localStorage.setItem('storedData', otplessUser.token);
    this.router.navigate(['/result']);
  }
}
