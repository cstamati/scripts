"use strict";
var _a, _b;
const WW_APP_BASE_URL = "https://wewear-size-suggestion.vercel.app";
const WW_WEB_COMPONENTS = "https://unpkg.com/@wewear/web-components@latest/dist/wewear-web-components.umd.js";
const WW_LANG = (_b = (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.lang) !== null && _b !== void 0 ? _b : "en";
function addStylesheetLink(url) {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}
async function appendHeadScriptAsync(src, type = "module") {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.type = type;
        script.onload = () => {
            resolve(script);
        };
        script.onerror = () => {
            reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
    });
}
window.WeWearInstaller = () => ({
    getProductName: () => {
        const header = document.querySelector('h1.nome');
        if (!header) {
            console.warn("Product title not found");
            return "NOT_FOUND_TITLE";
        }
        return header.innerText;
    },
    getProductSku: () => {
        var _a, _b;
        const header = document.querySelector('h1.nome');
        if (!header) {
            console.warn("Product sku not found");
            return undefined;
        }
        const sku = (_b = (_a = header.dataset.code) === null || _a === void 0 ? void 0 : _a.split('_').shift()) === null || _b === void 0 ? void 0 : _b.trim();
        return sku !== null && sku !== void 0 ? sku : "UNKNOWN_SKU";
    },
    getProductImg: () => {
        const img = document.querySelector('.image img');
        if (!img) {
            console.warn("Product img not found");
            return "";
        }
        return img.src;
    },
    getWidgetContainer: () => {
        return new Promise((resolve, reject) => {
            const targetSelector = "div.page-details-variants-select-component";
            const element = document.querySelector(targetSelector);
            if (element) {
                // If already present, resolve immediately
                resolve(element);
                return;
            }
            const observer = new MutationObserver((_, obs) => {
                const observedElement = document.querySelector(targetSelector);
                if (observedElement) {
                    obs.disconnect(); // Stop observing
                    resolve(observedElement);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            // Optionally, reject or timeout after some period
            setTimeout(() => {
                observer.disconnect();
                reject("Element not found within timeout");
            }, 5000); // Timeout after 5 seconds
        });
    },
    getLanguage: () => {
        return WW_LANG;
    },
    getProductFit: () => {
        return "";
    },
    getProductCaption: () => {
        return "";
    },
    getTheme: () => {
        return "karpos";
    }
});
async function WeWearInit() {
    const origin = window.location.origin;
    if (!origin.includes(".mvcgroup.com")) {
        return;
    }
    if (!window.location.pathname.includes("/p/")) {
        console.warn("This is not a product page");
        return;
    }
    console.log("WeWear Init");
    const installer = window.WeWearInstaller();
    const container = await installer.getWidgetContainer();
    if (!container) {
        console.warn("Failed to find widget container");
        return;
    }
    addStylesheetLink(`${WW_APP_BASE_URL}/static/styles/main.css`);
    await appendHeadScriptAsync(WW_WEB_COMPONENTS, "module");
    const config = {
        container,
        // product info
        productName: installer.getProductName(),
        productImageUrl: installer.getProductImg(),
        productSku: installer.getProductSku(),
        productCaption: installer.getProductCaption(),
        productFit: installer.getProductFit(),
        // paths
        appBaseUrl: WW_APP_BASE_URL,
        mySizePage: `${WW_APP_BASE_URL}/v1/my-size`,
        findOutSizePage: `${WW_APP_BASE_URL}/v1/user-data`,
        theme: installer.getTheme(),
        brandUserId: "",
        domain: origin,
        debugMode: false,
        language: installer.getLanguage(),
        adjustAfterRefine: true
    };
    console.log("Loading wewear size flow ", config);
    WeWearWebComponents.init(config);
}
WeWearInit();
