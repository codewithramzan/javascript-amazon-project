import {validDeliveryOption} from '../data/deliveryOptions.js';
function Cart(localStorageKey) {
const Cart = {
    cartItems: 
    JSON.parse(localStorage.getItem(localStorageKey)) || 
     [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ] ,
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

   addToCart(productId) {
     let matchingItem;
       this.cartItems.forEach((cartItem) => {
         if (productId === cartItem.productId){
           matchingItem = cartItem;
         }
         });
         const quantitySelector = 
         document.querySelector(`.js-quantity-selector-${productId}`);
         const quantity = quantitySelector?  Number(quantitySelector.value): 1;
         if(matchingItem){
             matchingItem.quantity += 1;
           }
           else {
           this.cartItems.push({
              productId,
              quantity,
             deliveryOptionId: '1'
           });
       }
         this.saveToStorage();
   },
    updateCartQuantity(){
         let cartQuantity = 0;
         this.cartItems.forEach((cartItem) => {
           cartQuantity += cartItem.quantity;
         });
         // to put on page using dom
         document.querySelector('.js-cart-quantity')
         .innerHTML = cartQuantity;
   },
    updateCartCheckout() {
       let cartQuantity = 0;
         this.cartItems.forEach((cartItem) => {
           cartQuantity += cartItem.quantity;
       });
         document.querySelector('.js-checkout-cart-quantity')
         .innerHTML = `${cartQuantity} items`;
     },
   removeItemFromCart(productId) {
     const newCart = [];
     this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId){
       newCart.push(cartItem);
       }
     });
     this.cartItems = newCart;
     this.saveToStorage();
   },
   updateQuantity(productId, newQuantity) {
     let matchingItem;
   
     this.cartItems.forEach((cartItem) => {
       if (productId === cartItem.productId) {
         matchingItem = cartItem;
       }
     });
     const quantityLabel = 
     document.querySelector(`.js-quantity-label-${productId}`);
         quantityLabel.innerHTML = newQuantity;
     matchingItem.quantity = newQuantity;
     this.updateCartCheckout();
     this.saveToStorage();
   },
   updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
     
       this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId){
           matchingItem = cartItem;
         }
         });
         if (!matchingItem) {
           return;
         }
         if(!validDeliveryOption(deliveryOptionId)) {
           return;
         }
         matchingItem.deliveryOptionId = deliveryOptionId;
         this.saveToStorage();
   }
  };

  return Cart;
}
const cart = Cart('cart-oop')
const businessCart = Cart('business-cart');

console.log(cart)
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

console.log(businessCart)
