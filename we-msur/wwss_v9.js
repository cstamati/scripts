"use strict";
const oldStyling = `
    .ww-modal{
      overflow: hidden;
    }
    
    .ww-background-overlay{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999999;
    }
    
    .closet-button {
      cursor: pointer;  
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      padding: 0.8rem;
      border: none;
      background-color: white;
      color: black;
      font-weight: bold;
      border-radius: 12px;
      font-size: 18px;
      box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    }

    .quit-button {
      cursor: pointer;  
      position: absolute;
      display: flex;
      align-items: center;
      top: 6px;
      left: 6px;
      padding: 0.3rem;
      border: none;
      background-color: white;
      border-radius: 100px;
      box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    }
    
    
    .ww-fade-in {
      opacity: 0;
      animation: fadeInAnimation 0.1s ease forwards;
    }
    
    @keyframes fadeInAnimation {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    .ww-frame{
      width: 1100px;
      height: 680px;
    }
    
    iframe{
     border: 0;
    }
    
    .ww-spinner {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid #ccc;
      border-top-color: #333;
      animation: spin 1s infinite linear;
    }
    
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @media screen and (max-width: 640px) {
      .ww-frame{
        width: 100%;
        height: 100%;
      }
    }
`;
const wwConfig = {
    prod: {
        appBaseUrl: "https://we-msur.vercel.app/en",
        mySizePath: "/v2/my-size",
        findOutSizePath: "/v2/msur/terms",
        style: oldStyling,
        scripts: [
            {
                description: "CMS client",
                src: "https://unpkg.com/@wewear/cms-client@1.0.25/dist/wewear-cms-client.umd.js",
                type: "module",
            },
            {
                description: "WEB COMPONENTS",
                src: "https://unpkg.com/@wewear/web-components@1.0.29/dist/wewear-web-components.umd.js",
                type: "module",
            },
        ],
    },
    test: {
        appBaseUrl: "https://dev-we-msur.vercel.app/en",
        mySizePath: "/v2/my-size",
        findOutSizePath: "/v2/msur/terms",
        style: oldStyling,
        scripts: [
            {
                description: "CMS client",
                src: "https://unpkg.com/@wewear/cms-client@1.0.25/dist/wewear-cms-client.umd.js",
                type: "module",
            },
            {
                description: "WEB COMPONENTS",
                src: "https://unpkg.com/@wewear/web-components@1.0.29/dist/wewear-web-components.umd.js",
                type: "module",
            },
        ],
    },
    local: {
        appBaseUrl: "http://localhost:3000/en",
        mySizePath: "/v1/my-size",
        findOutSizePath: "/v1/user-data",
        style: `
        .ww-modal{
          overflow: hidden;
        }
        
        .ww-background-overlay{
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999999999;
        }
        
        .closet-button {
          cursor: pointer;  
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          padding: 0.8rem;
          border: none;
          background-color: white;
          color: black;
          font-weight: "bold";
          border-radius: 12px;
          font-size: 18px;
          box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
        }

        .quit-button {
          cursor: pointer;  
          position: absolute;
          display: flex;
          align-items: center;
          top: 6px;
          left: 6px;
          padding: 0.3rem;
          border: none;
          background-color: white;
          border-radius: 100px;
          box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
        }
        
        
        .ww-fade-in {
          opacity: 0;
          animation: fadeInAnimation 0.1s ease forwards;
        }
        
        @keyframes fadeInAnimation {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        .ww-frame{
          width: 900px;
          height: 500px;
        }
        
        iframe{
         border: 0;
        }
        
        .ww-spinner {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 5px solid #ccc;
          border-top-color: #333;
          animation: spin 1s infinite linear;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @media screen and (max-width: 900px) {
          .ww-frame{
            width: 100%;
            height: 100%;
          }
        }
    `,
        scripts: [
            {
                description: "CMS client",
                src: "/node_modules/@wewear/cms-client/dist/wewear-cms-client.umd.js",
                type: "module",
            },
            {
                description: "WEB COMPONENTS",
                src: "node_modules/@wewear/web-components/dist/wewear-web-components.umd.js",
                type: "module",
            },
        ],
    },
    experimental: {
        appBaseUrl: "https://wewear-size-suggestion.vercel.app/en",
        mySizePath: "/v1/my-size",
        findOutSizePath: "/v1/user-data",
        style: `
        .ww-modal{
          overflow: hidden;
        }
        
        .ww-background-overlay{
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999999999;
        }
        
        .closet-button {
          cursor: pointer;  
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          padding: 0.8rem;
          border: none;
          background-color: white;
          color: black;
          font-weight: "bold";
          border-radius: 12px;
          font-size: 18px;
          box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
        }

        .quit-button {
          cursor: pointer;  
          position: absolute;
          display: flex;
          align-items: center;
          top: 6px;
          left: 6px;
          padding: 0.3rem;
          border: none;
          background-color: white;
          border-radius: 100px;
          box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
        }
        
        
        .ww-fade-in {
          opacity: 0;
          animation: fadeInAnimation 0.1s ease forwards;
        }
        
        @keyframes fadeInAnimation {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        .ww-frame{
          width: 900px;
          height: 500px;
        }
        
        iframe{
         border: 0;
        }
        
        .ww-spinner {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 5px solid #ccc;
          border-top-color: #333;
          animation: spin 1s infinite linear;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @media screen and (max-width: 900px) {
          .ww-frame{
            width: 100%;
            height: 100%;
          }
        }
    `,
        scripts: [
            {
                description: "CMS client",
                src: "https://unpkg.com/@wewear/cms-client@1.0.25/dist/wewear-cms-client.umd.js",
                type: "module",
            },
            {
                description: "WEB COMPONENTS",
                src: "https://unpkg.com/@wewear/web-components@1.0.33/dist/wewear-web-components.umd.js",
                type: "module",
            },
        ],
    },
};
if (!window.dataLayer) {
    window.dataLayer = [
        {
            pagePostType2: "single-product",
            language: "en",
            visitorUsername: "",
            domain: "https://192.168.1.18:5173",
            debugMode: false,
            wwConfig,
        },
    ];
}
else {
    window.dataLayer[0].wwConfig = wwConfig;
}
const defaultConfig = "prod";
function getConfig() {
    var _a;
    let env = defaultConfig;
    // check the search params
    const searchParamsEnv = new URLSearchParams(window.location.search).get("size_suggestion_env");
    if (searchParamsEnv) {
        env = searchParamsEnv;
        console.warn(`Setting config from search params ${env}`);
    }
    console.info(`Environment: ${env}`);
    const config = (_a = window === null || window === void 0 ? void 0 : window.dataLayer[0]) === null || _a === void 0 ? void 0 : _a.wwConfig[env];
    if (!config) {
        throw new Error(`Configuration not found: ${env}`);
    }
    return Object.assign({ env }, config);
}
function addStylesheet(content) {
    const styleElement = document.createElement("style");
    styleElement.textContent = content;
    document.head.appendChild(styleElement);
}
function appendHeadScript(src, type = "module", onLoaded, onError) {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    if (onLoaded) {
        script.onload = onLoaded;
    }
    if (onError) {
        script.onerror = onError;
    }
    document.head.appendChild(script);
}
async function appendHeadScriptAsync(src, type = "module") {
    return new Promise((resolve, reject) => {
        appendHeadScript(src, type, () => {
            resolve(undefined);
        }, () => {
            reject(new Error(`Failed to load script: ${src}`));
        });
    });
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
    const config = getConfig();
    addStylesheet(config.style);
    console.warn(`Starting size suggestion with configuration: `, config);
    for (const module of config.scripts) {
        try {
            await appendHeadScriptAsync(module.src, module.type);
            console.log("Module loaded: ", module);
        }
        catch (e) {
            console.error(e);
            return;
        }
    }
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
    const baseUrl = config.appBaseUrl;
    dataLayer[0].appBaseUrl = baseUrl;
    dataLayer[0].findOutSizePath = baseUrl + config.findOutSizePath;
    dataLayer[0].mySizePath = baseUrl + config.mySizePath;
    dataLayer[0].language = "en";
    dataLayer[0].modelHeight = 180;
    dataLayer[0].modelSize = "M";
    dataLayer[0].productFit = "Regular";
    if (!dataLayer[0].brandDomain) {
        dataLayer[0].brandDomain = window.location.origin;
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
init();
