import {formatCurrancy} from '../../scripts/utils/money.js';
describe('test suite: formatCurrancy', () => {
    it('converts cents into dallors', () => {
        expect(formatCurrancy(2095)).toEqual('20.95');
        
    });
    it('test formate currancy with 0', () => {
        expect(formatCurrancy(0)).toEqual('0.00');
        
    });
    it('test to round of number like 1000.5', () => {
        expect(formatCurrancy(1000.5)).toEqual('10.01');
        
    });
});
