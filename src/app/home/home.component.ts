import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { initOTPless } from '../../utils/initOtpless';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    initOTPless(this.callback);
  }

  openModal = () => {
    const modalContainer = this.document.getElementById('modalContainer');
    if (modalContainer) {
      this.renderer.setStyle(modalContainer, 'display', 'flex');

      const urlParams = new URLSearchParams(window.location.search);
      const paramsValue = urlParams.get("ex");

      if (!paramsValue) {
        const currentURL = window.location.href;
        const newParam1 = "ex=true";
        const updatedURL = `${currentURL}?${newParam1}`;
        window.history.pushState(null, "", updatedURL);
      }

      initOTPless(this.callback);
    }
  };

  removeQueryParam = (param: any) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.pushState(null, "", url);
  };

  closeModal = (e: any) => {
    const modalContainer = this.document.getElementById('modalContainer');
    if (modalContainer && e.target === modalContainer) {
      this.renderer.setStyle(modalContainer, 'display', 'none');
      this.removeQueryParam('ex');
    }
  };

  callback = (otplessUser: any): void => {
    alert(JSON.stringify(otplessUser));
    localStorage.setItem('storedData', otplessUser.token);
    this.router.navigate(['/result']);
  };
}
