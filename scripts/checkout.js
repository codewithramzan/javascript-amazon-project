import { renderCheckoutHeader } from "./Checkout/checkoutHeader.js";
import { renderOrderSummary } from "./Checkout/order-summary.js";
import { renderPaymentSummary } from "./Checkout/payment-summary.js";
// import '../data/cart-class.js';
import { products } from "../data/products.js";


renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
