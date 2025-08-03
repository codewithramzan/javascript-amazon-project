import {cart, addtoCart, updateCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrancy } from "./utils/money.js";

let productHTML = '';
products.forEach((product) => {
    productHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrancy(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-cart-msg-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;

});
document.querySelector(".js-products-grid").innerHTML = productHTML;


document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
      //call function addtocart()
      addtoCart(productId);
      // TO update cart call updatecartquanity()
       updateCartQuantity();
      
    // code for displaying Added msg when we click on add to cart button
     const addedMsg = document.querySelector(`.js-added-cart-msg-${productId}`);
    const addedMsgTimeout = {};
    const preiousTimeout = addedMsgTimeout[productId];
    if (preiousTimeout) {
      clearTimeout(preiousTimeout);
    }
      addedMsg.classList.add('js-added-msg-visible');
      const timeoutId = setTimeout(() => {
        addedMsg.classList.remove('js-added-msg-visible');
      },2000);

      
  
  });
});
