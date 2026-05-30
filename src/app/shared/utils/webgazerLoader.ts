const WEBGAZER_SCRIPT_SRC = '/vendor/webgazer.js';
const WEBGAZER_SCRIPT_SELECTOR = 'script[data-webgazer="true"]';

let webgazerLoadPromise: Promise<void> | null = null;

const waitForWebGazerGlobal = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const check = () => {
      if (window.webgazer) {
        resolve();
        return;
      }

      if (Date.now() - startedAt > 15_000) {
        reject(new Error('WebGazer global was not initialized in time.'));
        return;
      }

      window.setTimeout(check, 50);
    };

    check();
  });

export const loadWebGazerScript = (): Promise<void> => {
  if (window.webgazer) {
    return Promise.resolve();
  }

  if (webgazerLoadPromise) {
    return webgazerLoadPromise;
  }

  webgazerLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      WEBGAZER_SCRIPT_SELECTOR
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        waitForWebGazerGlobal().then(resolve).catch(reject);
      });
      existingScript.addEventListener('error', () => {
        reject(new Error('Failed to load WebGazer script.'));
      });
      return;
    }

    const script = document.createElement('script');
    script.src = WEBGAZER_SCRIPT_SRC;
    script.dataset.webgazer = 'true';
    script.async = true;
    script.onload = () => {
      waitForWebGazerGlobal().then(resolve).catch(reject);
    };
    script.onerror = () => {
      reject(
        new Error(`Failed to load WebGazer script from ${WEBGAZER_SCRIPT_SRC}.`)
      );
    };

    document.body.appendChild(script);
  });

  webgazerLoadPromise.catch(() => {
    webgazerLoadPromise = null;
  });

  return webgazerLoadPromise;
};

export const ensureWebGazer = async (): Promise<WebGazerInstance> => {
  await loadWebGazerScript();

  if (!window.webgazer?.params) {
    throw new Error('WebGazer is unavailable after script load.');
  }

  return window.webgazer;
};
