import {formatCurrancy} from '../scripts/utils/money.js';
console.log('Test Suits: format Currency');
console.log('basic test if it is work or not');
if (formatCurrancy(1095) === '10.95') {
    console.log('passed');
} else {
    console.log('Failed');
}
console.log('work with 0');
if (formatCurrancy(0) === '0.00') {
    console.log('passed');
} else {
    console.log('Failed');
}
console.log('work with 1000.5');
if (formatCurrancy(1000.5) === '10.01') {
    console.log('passed');
} else {
    console.log('Failed');
}