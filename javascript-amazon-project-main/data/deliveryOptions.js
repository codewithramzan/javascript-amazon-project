import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
     deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
    });
 return deliveryOption || deliveryOption[0];
}
 const today = dayjs();
export function calculateDeliveryDate(deliveryOption) {
   
  const newDeliveryDays = skipWeekendDays(deliveryOption.deliveryDays)
  const deliveryDate = today.add(newDeliveryDays, 'd')
  const dateString = deliveryDate.format('dddd, MMMM D')
  return dateString;
}
function skipWeekendDays(deliveryDays) {
  for (let i = 1; i <= deliveryDays; i++) {
    const weekDay = today.add(i, 'd').format('dddd')
    if (weekDay === 'Saturday' || weekDay === 'Sunday') {
      deliveryDays++;
    }
  }
  return deliveryDays;
}

export const deliveryOptions = [{
    id : "1",
    deliveryDays: 7,
    priceCents: 0,
    
},{
    id: "2",
    deliveryDays: 3,
    priceCents: 300 
},{
    id: "3",
    deliveryDays: 1,
    priceCents: 999
}];