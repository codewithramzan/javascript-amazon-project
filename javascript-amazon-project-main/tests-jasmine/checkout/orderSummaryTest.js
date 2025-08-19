import { renderOrderSummary } from "../../scripts/Checkout/order-summary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
describe('test suit: renderOrderSummary', () => {
      const  productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
      const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
//this is called hooks-- Hooks is short cut to reuse code
    beforeEach(() => {
      document.querySelector('.js-test-container')
      .innerHTML = `<div class="js-order-summary"></div>
      <div class="js-checkout-cart-quantity"></div>
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
      loadFromStorage();
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
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId2);
     
  });
  afterEach(() => {
     document.querySelector('.js-test-container')
      .innerHTML = '';
  });

});