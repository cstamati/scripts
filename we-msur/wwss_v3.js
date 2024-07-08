"use strict";
let env = "prod";
function getConfig() {
    // check the search params
    const currentEnv = new URLSearchParams(window.location.search).get("size_suggestion_env");
    if (currentEnv) {
        env = currentEnv;
        console.warn(`Setting config from search params ${env}`);
    }
    let appBaseUrl = "";
    let wwcms = "";
    let wwwc = "";
    switch (env) {
        case "prod":
            appBaseUrl = "https://we-msur.vercel.app";
            wwcms =
                "https://unpkg.com/@wewear/cms-client@1.0.23/dist/wewear-cms-client.umd.js";
            wwwc =
                "https://unpkg.com/@wewear/web-components@1.0.22/dist/wewear-web-components.umd.js";
            break;
        case "test":
            appBaseUrl = "https://dev-we-msur.vercel.app";
            wwcms =
                "https://unpkg.com/@wewear/cms-client@1.0.25/dist/wewear-cms-client.umd.js";
            wwwc =
                "https://unpkg.com/@wewear/web-components@1.0.25/dist/wewear-web-components.umd.js";
            break;
        case "local":
            appBaseUrl = "https://localhost:3000";
            wwcms = "/node_modules/@wewear/cms-client/dist/wewear-cms-client.umd.js";
            wwwc =
                "node_modules/@wewear/web-components/dist/wewear-web-components.umd.js";
            window.dataLayer = [
                {
                    pagePostType2: "single-product",
                    language: "en",
                    visitorUsername: "",
                    domain: "https://localhost:5173",
                    debugMode: false,
                },
            ];
            break;
        default:
            throw new Error(`Current env is not valid: ${env}`);
    }
    return {
        appBaseUrl,
        wwcms,
        wwwc,
    };
}
const { appBaseUrl, wwcms, wwwc } = getConfig();
console.warn(`Starting size suggestion with env: ${env}`);
function appendHeadScript(src, type = "module", onLoaded) {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    if (onLoaded) {
        script.onload = onLoaded;
    }
    document.head.appendChild(script);
}
function findProductSku() {
    var _a;
    const sku = (_a = document.querySelector(".sku")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (sku) {
        return sku;
    }
    console.error("SKU not found");
    return null;
}
function findProductImageUrl() {
    const imageElement = document.querySelector(".wp-post-image");
    if (imageElement && imageElement.tagName.toLowerCase() === "img") {
        return imageElement.src;
    }
    console.error("Image element not found or not an element.");
    return null;
}
function findProductName() {
    var _a;
    const el = (_a = document.querySelector(".product_title")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (el) {
        return el;
    }
    console.error("Product Name not found");
    return null;
}
function findContainer() {
    const el = document.querySelector(".nm-product-summary-inner-col");
    if (el) {
        return el;
    }
    console.error("Container not found");
    return null;
}
function findImageContainer() {
    const el = document.querySelector(".woocommerce-product-gallery__wrapper");
    if (el) {
        return el;
    }
    console.error("Product img container not found");
    return null;
}
function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
}
async function isPageDataLoaded() {
    const maxAttempts = 10;
    let attempts = 0;
    while (attempts < maxAttempts) {
        attempts++;
        const container = findContainer();
        const name = findProductName();
        const img = findProductImageUrl();
        const sku = findProductSku();
        if (container && name && img && sku) {
            return true;
        }
        console.log(attempts + " Attemt failed, retrying...");
        await delay(300);
    }
    return false;
}
async function init() {
    var _a;
    const isProductPage = ((_a = dataLayer[0]) === null || _a === void 0 ? void 0 : _a.pagePostType2) == "single-product";
    if (!isProductPage) {
        console.warn("This is not a single product page. Size suggestion will not display.");
        return;
    }
    const result = await isPageDataLoaded();
    if (!result) {
        console.error("The page data is not loaded");
        return;
    }
    const container = findContainer();
    const visitor = dataLayer[0].visitorUsername;
    dataLayer[0].brandUserId = visitor ? visitor : "";
    dataLayer[0].productName = findProductName();
    dataLayer[0].productImageUrl = findProductImageUrl();
    dataLayer[0].sku = findProductSku();
    dataLayer[0].appBaseUrl = appBaseUrl;
    if (!dataLayer[0].domain) {
        dataLayer[0].domain = window.location.origin;
    }
    if (!container) {
        console.error("Failed to find widget container");
        return;
    }
    WeWearWebComponents.setupSizeSuggestion(container);
    const pic = findImageContainer();
    if (!pic) {
        console.warn("closet container not found");
        return;
    }
    WeWearWebComponents.addClosetButton(pic);
}
appendHeadScript(wwcms, "module", () => {
    appendHeadScript(wwwc, "module", init);
});
