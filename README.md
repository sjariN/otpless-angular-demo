[![OTPless](https://d1j61bbz9a40n6.cloudfront.net/website/home/v4/logo/white_logo.svg)](https://otpless.com/platforms/react)

# Angular Demo : Otpless Login Page

## Steps to add OTPless SDK to your Angular Website

1. **Add OTPLESS Script as utils function**

> Add the following code to your utils/initOtpless.ts in root directory.

```JavaScript
export const initOTPless = (callback: Function) => {
  const otplessInit = Reflect.get(window, "otplessInit");

  const loadScript = () => {
    const isScriptLoaded = document.getElementById("otpless-sdk");
    if (isScriptLoaded) return;

    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v2/auth.js";
    script.setAttribute("data-appid", "YOUR_DATA_APPID");
    document.body.appendChild(script);
  };

  otplessInit ? otplessInit() : loadScript();

  Reflect.set(window, "otpless", callback);
};
```

2. **Load the script in Login/Signup component and add callback function**

> - Add following code in Login/Signup component.
> - retrive data using **otplessUser** object

```jsx
  ngOnInit(): void {
    initOTPless(this.callback);
  }

  callback = (otplessUser: any): void => {
    localStorage.setItem('storedData', otplessUser.token);
    this.router.navigate(['/result']);
  }
```

3. **Add Otpless-login-page div**

> Add the following div in Login/Signup component html.

```jsx
<div id="otpless-login-page"></div>
```

### This demo implementation adds extra modularity, scalability and reusability to the otpless-auth sdk

### Integration Options

- [OTPless-Page](https://github.com/sjariN/otpless-angular-demo/)
- [OTPless-Page-OnClick](https://github.com/sjariN/otpless-angular-demo/tree/on-button-click-login-page)
- [OTPless-Floater](https://github.com/sjariN/otpless-angular-demo/tree/widget)
- [OTPless-Floater-OnClick](https://github.com/sjariN/otpless-angular-demo/tree/on-button-click-widget)
- [Headless](https://github.com/sjariN/otpless-angular-demo/tree/headless)
