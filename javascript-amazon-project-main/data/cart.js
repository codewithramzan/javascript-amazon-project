export const cart = []; 

export function addtoCart(productId) {
  let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItem = cartItem;
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
}
export function updateCartQuantity(){
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      // to put on page using dom
      document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
}