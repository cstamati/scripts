"use strict";
var _a;
const lang = (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.lang;
const appBaseUrl = "https://wewear-size-suggestion.vercel.app";
const webComponent = "https://unpkg.com/@wewear/web-components@1.0.35/dist/wewear-web-components.umd.js";
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
function getWidgetContainer() {
    return document.querySelector("div.page-details-variants-select");
}
function getProductImage() {
    const img = document.querySelector('.image img');
    return img.src;
}
async function WeWearInit() {
    const origin = window.location.origin;
    if (!origin.includes(".mvcgroup.com")) {
        return;
    }
    const container = getWidgetContainer();
    if (!container) {
        console.warn("Failed to find widget container");
        return;
    }
    addStylesheetLink(`${appBaseUrl}/static/styles/main.css`);
    await appendHeadScriptAsync(webComponent, "module");
    const config = {
        // where to install the container?
        container: container,
        // product info
        productName: "Test product",
        productImageUrl: getProductImage(),
        sku: "PR000",
        modelHeight: 199,
        modelSize: "M",
        productFit: "regular",
        // paths
        appBaseUrl,
        mySizePage: `${appBaseUrl}/v1/my-size`,
        findOutSizePage: `${appBaseUrl}/v1/user-data`,
        brandUserId: "",
        domain: window.location.origin,
        debugMode: false,
        language: lang,
        // show a screen
        adjustAfterRefine: false
    };
    console.log("Loading page data ", config);
    WeWearWebComponents.init(config);
}
WeWearInit();
