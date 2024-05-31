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

  appendParams = (param:string,value:string) =>{
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
  
    if (!urlParams.has(param)) {
      urlParams.append(param, value);
    }
    url.search = urlParams.toString();
    window.history.pushState({}, '', url);
  }
  openModal = () => {
    const modalContainer = this.document.getElementById('modalContainer');
    if (modalContainer) {
      this.renderer.setStyle(modalContainer, 'display', 'flex');
      this.appendParams("ex","true");
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
