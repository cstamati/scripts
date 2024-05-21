if (!window.dataLayer) {
	window.dataLayer = [
		{
			pagePostType2: "single-product"
		}
	];
}

var appBaseUrl = "https://dev-we-msur.vercel.app";
var wwcms =
	"https://unpkg.com/@wewear/cms-client@1.0.3/dist/wewear-cms-client.umd.js";
var wcs =
	"https://unpkg.com/@wewear/web-components@1.0.4/dist/wewear-web-components.umd.js";

function appendHeadScript(src, type = "module", onLoaded = null) {
	var script = document.createElement("script");
	script.src = src;
	script.type = type;
	if (onLoaded) {
		script.onload = onLoaded;
	}
	document.head.appendChild(script);
}

function findProductSku() {
	var sku = document.querySelector(".sku")?.innerHTML;
	if (sku) {
		return sku;
	}
	console.error("SKU not found");
	return null;
}

function findProductImageUrl() {
	var imageElement = document.querySelector(".wp-post-image");
	if (imageElement && imageElement.tagName.toLowerCase() === "img") {
		return imageElement.src;
	}
	console.error("Image element not found or not an element.");
	return null;
}

function findProductName() {
	var el = document.querySelector(".product_title")?.innerHTML;
	if (el) {
		return el;
	}
	console.error("Product Name not found");
	return null;
}

function findContainer() {
	var el = document.querySelector(".nm-product-summary-inner-col");
	if (el) {
		return el;
	}
	console.error("Container not found");
	return null;
}

function delay(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

async function isPageDataLoaded() {
	var maxAttempts = 10;
	var attempts = 0;

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
	var isProductPage = dataLayer[0]?.pagePostType2 == "single-product";
	if (!isProductPage) {
		console.warn(
			"This is not a single product page. Size suggestion will not display."
		);
		return;
	}

	const result = await isPageDataLoaded();

	if (!result) {
		console.error("The page data is not loaded");
		return;
	}

	var container = findContainer();
	var visitor = dataLayer[0].visitorUsername;
	dataLayer[0].brandUserId = visitor ? visitor : "";
	dataLayer[0].productName = findProductName();
	dataLayer[0].productImageUrl = findProductImageUrl();
	dataLayer[0].sku = findProductSku();
	dataLayer[0].appBaseUrl = appBaseUrl;
	dataLayer[0].domain = window.location.origin;
	WeWearWebComponents.setupSizeSuggestion(container);
}


appendHeadScript(wwcms, "module", () => {
	appendHeadScript(wcs, "module", init);
});
