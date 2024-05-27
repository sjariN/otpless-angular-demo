import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  mobile = '';
  OTPlessSignin = null;
  constructor(
  ) {}

  ngOnInit(): void {
    this.OTPlessSignin = this.initOTPless();
  }

  initOTPless() {
    const OTPless = Reflect.get(window, "OTPless");
    return new OTPless(this.callback);
  }

  callback = (otplessUser: any) => {
    const emailMap = otplessUser.identities.find(
      (item: any) => item.identityType === 'EMAIL'
    );

    const mobileMap = otplessUser.identities.find(
      (item: any) => item.identityType === 'MOBILE'
    )?.identityValue;

    const token = otplessUser.token;

    const email = emailMap?.identityValue;

    const mobile = mobileMap?.identityValue;

    const name = emailMap?.name || mobileMap?.name;
    // Implement your custom logic here.
    console.log(otplessUser);
  };

  phoneAuth = (phone: string) => {
    this.mobile = phone;
    // @ts-ignore
    this.OTPlessSignin.initiate({
      channel: 'PHONE',
      phone: phone,
      countryCode: '+91',
    });
  };

  verifyOTP = (otp: string) => {
    // @ts-ignore
    this.OTPlessSignin.verify({
      channel: 'PHONE',
      phone: this.mobile,
      otp: otp,
      countryCode: '+91',
    });
  };

  oAuth = (channel: 'WHATSAPP' | 'GMAIL' | 'FACEBOOK' | 'MICROSOFT') => {
    // @ts-ignore
    this.OTPlessSignin.initiate({
      channel: 'OAUTH',
      channelType: channel,
    });
  };
}
