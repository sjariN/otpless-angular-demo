[![OTPless](https://d1j61bbz9a40n6.cloudfront.net/website/home/v4/logo/white_logo.svg)](https://otpless.com/platforms/angular)

# Angular Demo : Otpless Login Page

## Steps to add OTPless SDK to your Angular Website

1. **Add OTPLESS headless Script in index.html**

> Add the following code to your index.html in root directory.

```JavaScript
  <script id="otpless-sdk" src="https://otpless.com/v2/headless.js"  data-appid="YOUR_APP_ID"></script>
```

2. **Add following code in Login component**

> - Add following code in Login/Signup component.
> - retrive data using **otplessUser** object

```jsx
  export class LoginComponent {
  mobile = '';
  OTPlessSignin = null;
  constructor() {}

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
```

3. **Add Otpless-login-page div**

> Add the following div in Login/Signup component html.

```html
<main>
  <div id="mobile-section">
    <input
      id="mobile-input"
      type="number"
      #mobileInput
      placeholder="Enter mobile number"
    />
    <button (click)="phoneAuth(mobileInput.value)">Request OTP</button>
  </div>

  <div id="otp-section">
    <input id="otp-input" #otpInput placeholder="Enter OTP" />
    <button (click)="verifyOTP(otpInput.value)">Verify OTP</button>
  </div>

  <button (click)="oAuth('WHATSAPP')">Authenticate with WhatsApp</button>
  <button (click)="oAuth('GMAIL')">Authenticate with Gmail</button>
  <router-outlet></router-outlet>
</main>
```


### This demo implementation adds extra modularity, scalability and reusability to the otpless-auth sdk

### Integration Options

- [OTPless-Page](https://github.com/sjariN/otpless-angular-demo/)
- [OTPless-Page-OnClick](https://github.com/sjariN/otpless-angular-demo/tree/on-button-click-login-page)
- [OTPless-Floater](https://github.com/sjariN/otpless-angular-demo/tree/widget)
- [OTPless-Floater-OnClick](https://github.com/sjariN/otpless-angular-demo/tree/on-button-click-widget)
- [Headless](https://github.com/sjariN/otpless-angular-demo/tree/headless)

