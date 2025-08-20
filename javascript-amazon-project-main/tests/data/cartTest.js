import {addToCart, cart, loadFromStorage,removeItemFromCart} from '../../data/cart.js';

describe('test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });



  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    const input = document.createElement('input');
    input.className ='js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    input.value = 1;
    document.body.appendChild(input);
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1"
  }]));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    const input = document.createElement('input');
    input.className ='js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    input.value = 1;
    document.body.appendChild(input);
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
  }]));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
  
});
 describe('test suits: removeItemFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-checkout-cart-quantity"></div>`;
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
     loadFromStorage();
  });
    it('remove productId in the cart', () => {
      removeItemFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart.length).toEqual(0);
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });
    it('does nothing if product is not in the cart', () => {
      removeItemFromCart('does-not-exist');
       expect(cart.length).toEqual(1);
       expect(cart[0].quantity).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
    }]));
    });
 });