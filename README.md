[![OTPless](https://d1j61bbz9a40n6.cloudfront.net/website/home/v4/logo/white_logo.svg)](https://otpless.com/platforms/angular)

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
    //YOUR_LOGIC
  };
```

3. **Add Otpless-login-page div**

> Add the following div in Login/Signup component html.

```jsx
<div id="otpless-login-page"></div>
```
4. **Add css**

> Add the following div in Login/Signup component html.

```jsx
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    display: none;
    justify-content: center;
    align-items: center;
  }
  
  .modal-container.show {
    display: flex;
  }
  
  #loginBtn {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    margin-bottom: 20px;
    cursor: pointer;
  }
```

### This demo implementation adds extra modularity, scalability and reusability to the otpless-auth sdk

### Integration Options

- [OTPless-Page](https://github.com/sjariN/otpless-angular-demo/)
- [OTPless-Page-OnClick](https://github.com/sjariN/otpless-angular-demo/tree/on-button-click-login-page)
- [OTPless-Floater](https://github.com/sjariN/otpless-angular-demo/tree/widget)
- [OTPless-Floater-OnClick](https://github.com/sjariN/otpless-angular-demo/tree/on-button-click-widget)
- [Headless](https://github.com/sjariN/otpless-angular-demo/tree/headless)

