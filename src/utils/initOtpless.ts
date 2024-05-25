
export function initOTPless(callback: Function): void {
    console.log('started');
    const otplessInit = (window as any).otplessInit;

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://otpless.com/v2/auth.js';
      script.id = 'otpless-sdk';
      script.setAttribute('data-appid', 'YOUR_DATA_APPID');
      document.body.appendChild(script);
    };

    otplessInit ? otplessInit() : loadScript();

    (window as any).otpless = callback;

  }