import {cart} from "../data/cart.js";
import { products } from "../data/products.js";

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
            $${(product.priceCents/100).toFixed(2)}
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
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId){
        matchingItem = item;
      }
    });
    const quantitySelector = 
    document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
     if(matchingItem){
        matchingItem.quantity += 1;
      }
      else{
          cart.push({
           productId,
            quantity
        });
      }

      // to findout quantity in cart we will looop through cart using for each
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });
      // to put on page using dom
      document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
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
