import {cart, removeItemFromCart, updateCartCheckout, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrancy } from './utils/money.js';
import{deliveryOptions} from '../data/deliveryOptions.js';
let cartProductHTML = '';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if(product.id === productId) {
        matchingProduct = product;
    }
  });
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
    });
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
  

  cartProductHTML += `<div class="cart-item-container js-cart-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrancy(matchingProduct.priceCents)}
            </div>
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${matchingProduct.id}">
               Update 
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
               <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>
              <span class="delete-quantity-link link-primary js-delete-cart-link" 
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
             ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
});
function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrancy(deliveryOption.priceCents)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `
    <div class="delivery-option">
      <input type="radio" 
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
        value="${deliveryOption.id}">
        <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
         ${priceString} Shipping
      </div> 
      </div>
  </div>`;
  });
  return html;
}
document.querySelector('.js-order-summary').innerHTML = cartProductHTML;
//make delet button interactive
document.querySelectorAll('.js-delete-cart-link')
.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
     removeItemFromCart(productId);
    const container = document.querySelector(`.js-cart-container-${productId}`);
    container.remove();
    updateCartCheckout();
  });
});
  updateCartCheckout();
  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
       const container = 
       document.querySelector(`.js-cart-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  })
  
   document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container 
      = document.querySelector(`.js-cart-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      const quantityInput =
       document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);
      if (Number(quantityInput.value) >= 0 && Number(quantityInput.value) < 1000) {
        updateQuantity(productId, newQuantity);
      }
  
    });
  });