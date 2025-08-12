 import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
 import { getProduct } from "../../data/products.js";
 import { formatCurrancy } from "../utils/money.js";
 

 
 export function renderPaymentSummary(){
        let productPriceCents = 0;
        let ShippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        ShippingPriceCents += deliveryOption.priceCents;
    });
        const totalBeforeTaxCents = productPriceCents + ShippingPriceCents;
        const  taxCents = totalBeforeTaxCents * 0.1;
        const totalOrderCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
        </div>
        
        <div class="payment-summary-row">
        <div">Items (3):</div>
        <div class="payment-summary-money">
        $${formatCurrancy(productPriceCents)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        $${formatCurrancy(ShippingPriceCents)}
        </div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrancy(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
        $${formatCurrancy(taxCents)}
        </div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        $${formatCurrancy(totalOrderCents)}
        </div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
`;
document.querySelector('.js-payment-summary')
.innerHTML = paymentSummaryHTML; 
}