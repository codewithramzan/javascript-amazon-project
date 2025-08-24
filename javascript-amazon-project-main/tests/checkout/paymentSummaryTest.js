import { renderPaymentSummary } from "../../scripts/Checkout/payment-summary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
describe('test suits: renderPaymentSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-payment-summary"></div>
        `;
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        renderPaymentSummary();
    });
    it('display payment summary', () => {
        expect(
            document.querySelector('.js-payment-summary-money').innerText
        ).toEqual('$10.90');
        expect(
            document.querySelector('.js-payment-summary-money-shipping').innerText
        ).toEqual('$0.00');
        expect(
            document.querySelector('.js-payment-summary-tax').innerText
        ).toEqual('$1.09');
        expect(
            document.querySelector('.js-paymentSummary-total').innerText
        ).toEqual('$11.99');
        expect(
            document.querySelectorAll('.js-payment-summary').length
        ).toEqual(1);
        
    });
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });
});