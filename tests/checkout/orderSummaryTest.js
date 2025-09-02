import { renderOrderSummary ,} from "../../scripts/Checkout/order-summary.js";
import { cart } from "../../data/cart-class.js";
describe('test suit: renderOrderSummary', () => {
      const  productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
      const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
//this is called hooks-- Hooks is short cut to reuse code
    beforeEach(() => {
      document.querySelector('.js-test-container')
      .innerHTML = `
      <input class="" 
      <div>
       <input type="radio" 
        class="js-delivery-option-input-${productId1}-3"
        name="delivery-option-${productId1}"
        value="${'3'}">
        <div>
      </div>
      <div class="js-order-summary"></div>
      <div class="js-checkout-cart-quantity"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"><div>`;
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1"
      
      },{
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2"
      }]); 
    }); 
      cart.loadFromStorage();
      renderOrderSummary();
    });
    
  it('display the cart', () => {
    
      expect(
      document.querySelectorAll('.js-cart-item-container').length
      ).toEqual(2);
      expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain('Quantity: 2');
    
      expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain('Quantity: 1 ');
      expect(
    document.querySelector(`.js-product-name-${productId1}`).innerText
      ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
      expect(
    document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toEqual('Intermediate Size Basketball');
  });
  it('removes a product', () => {
    
      document.querySelector(`.js-delete-link-${productId1}`).click()
      expect(
      document.querySelectorAll('.js-cart-item-container').length
      ).toEqual(1);
      expect(
      document.querySelectorAll(`.js-cart-container-${productId1}`)
      ).not.toEqual(null);
      expect(
      document.querySelectorAll(`.js-cart-container-${productId2}`)
      ).not.toEqual(null);
      expect(cart.cartItems.length).toEqual(1);
      expect(cart.cartItems[0].productId).toEqual(productId2);
     
  });
   it('updates the delivery Option', () => {

      document.querySelector(`.js-delivery-option-${productId1}-3`).click();
      const input = 
        document.querySelector(`.js-delivery-option-input-${productId1}-3`);

      expect(input).not.toBeNull();
      input.checked = true;
      expect(input.checked).toBe(true);
      expect(cart.cartItems.length).toEqual(2);
      expect(cart.cartItems[0].productId).toBe(productId1);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
      expect(
      document.querySelector('.js-payment-summary-shipping').innerText
      ).toEqual('$55.74');
       expect(
    document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$61.31');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
   
  afterEach(() => {
     document.querySelector('.js-test-container')
      .innerHTML = '';
  });
});