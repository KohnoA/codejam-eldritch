import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import cardsBlue from './data/mythicCards/blue/index.js';
import cardsBrown from './data/mythicCards/brown/index.js';
import cardsGreen from './data/mythicCards/green/index.js';

console.log(ancientsData);
console.log(difficulties);
console.log(cardsBlue);
console.log(cardsBrown);
console.log(cardsGreen);

const x = document.querySelector('.current-card');

x.style.backgroundImage = `url(${cardsGreen[10].cardFace})`;