if (!window.dataLayer) {
	window.dataLayer = [
		{
			pagePostType2: "single-product",
			language: "en",
			visitorUsername: "255a6dde-4155-4622-8057-ccc1e2ccf274",
			domain: "https://wewearecom.biz",
			debugMode: true
		}
	];
}

const appBaseUrl = "https://dev-we-msur.vercel.app";
const wwcms =
	"https://unpkg.com/@wewear/cms-client@1.0.10/dist/wewear-cms-client.umd.js";
const wcs =
	"https://unpkg.com/@wewear/web-components@1.0.9/dist/wewear-web-components.umd.js";

function appendHeadScript(src, type = "module", onLoaded = null) {
	const script = document.createElement("script");
	script.src = src;
	script.type = type;
	if (onLoaded) {
		script.onload = onLoaded;
	}
	document.head.appendChild(script);
}

function findProductSku() {
	const sku = document.querySelector(".sku")?.innerHTML;
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
	const el = document.querySelector(".product_title")?.innerHTML;
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

	WeWearWebComponents.setupSizeSuggestion(container);

	const pic = findImageContainer();

	if (!pic) {
		return;
	}

	WeWearWebComponents.addClosetButton(pic);
}

appendHeadScript(wwcms, "module", () => {
	appendHeadScript(wcs, "module", init);
});
