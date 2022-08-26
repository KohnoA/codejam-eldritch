import ancientsData from './data/ancients.js'
import difficulties from './data/difficulties.js'
import cardsBlue from './data/mythicCards/blue/index.js'
import cardsBrown from './data/mythicCards/brown/index.js'
import cardsGreen from './data/mythicCards/green/index.js'

// console.log(ancientsData)
// console.log(difficulties)
// console.log(cardsBlue)
// console.log(cardsBrown)
// console.log(cardsGreen)

const ancients = document.querySelector('.cards-ancients')
const azathoth = document.querySelector('.azathoth')
const cthulthu = document.querySelector('.cthulthu')
const iogSothoth = document.querySelector('.iog-sothoth')
const shubNiggurath = document.querySelector('.shub-niggurath')
const main = document.querySelector('.difficulty-level')

ancients.addEventListener('click', (event) => {
    let arrAncients = ancients.childNodes
    let target = event.target
    
    if(target.tagName === 'DIV') {
        arrAncients.forEach(item => {
            if(item.nodeName != '#text') {
                item.classList.remove('active-ancient')
            }
        })

        main.classList.remove('hidden')
        mix.classList.add('hidden')
        stage.classList.add('hidden')
        currentCard.classList.add('hidden')
        easyLevel.classList.remove('active-difficulty')
        normalLevel.classList.remove('active-difficulty')
        hardLevel.classList.remove('active-difficulty')
    }
    
    if(target.className === 'azathoth') {
        azathoth.classList.add('active-ancient')
    } else if(target.className === 'cthulthu') {
        cthulthu.classList.add('active-ancient')
    } else if(target.className === 'iog-sothoth') {
        iogSothoth.classList.add('active-ancient')
    } else if(target.className === 'shub-niggurath') {
        shubNiggurath.classList.add('active-ancient')
    }
})

const difficultyLevel = document.querySelector('.difficulty-level')
const easyLevel = document.querySelector('.easy-level')
const normalLevel = document.querySelector('.normal-level')
const hardLevel = document.querySelector('.hard-level')

difficultyLevel.addEventListener('click', (event) => {
    let arrDifficultyLevel = difficultyLevel.childNodes
    let target = event.target

    if(target.tagName === 'BUTTON') {
        arrDifficultyLevel.forEach(item => {
            if(item.nodeName != '#text') {
                item.classList.remove('active-difficulty')
            }
        })
    }

    if(target.className === 'easy-level') {
        easyLevel.classList.add('active-difficulty')
    } else if(target.className === 'normal-level') {
        normalLevel.classList.add('active-difficulty')
    } else if(target.className === 'hard-level') {
        hardLevel.classList.add('active-difficulty')
    }

    mix.classList.remove('hidden')
    stage.classList.add('hidden')
    currentCard.classList.add('hidden')
})

const mix = document.querySelector('.deck-mixed')
const stage = document.querySelector('.stage-wrapper')
const currentCard = document.querySelector('.current-card-wrapper')

//Сложить суммы всех нужных карт по цветам 
function numbersOfCards(ancient) {
    let cards = {};
    let arrCardsStage = [];

    for(let key in ancient) {
        if(typeof ancient[key] === 'object') {
            arrCardsStage.push(ancient[key])
        }
    }

    arrCardsStage.forEach(item => {
        if(Object.keys(cards).length == 0) {
            cards = item
        } else {
            for(let key in item) {
                cards[key] += item[key]
            }
        }
    })
    
    return cards
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

//Формирование массивов с рандомными картами по цветам
//Сделать похожие функции под другие сложности 
function getNumberCards(stackName, colorCards, length) {
    
    for(let i = 0; i < length; i++) {
        let randomCard = getRandomNum(0, colorCards.length)
        
        if(stackName.includes(colorCards[randomCard])) {
            randomCard = getRandomNum(0, colorCards.length)
            stackName.push(colorCards[randomCard])
        } else {
            stackName.push(colorCards[randomCard])
        }
    }

    return stackName
}

function showCards(stackOne, stackTwo, stackThree) {
    const img = new Image()

    try {
        if(stackTwo.length === 0) {
            stackThree.sort(() => Math.random() - 0.5)

            img.src = stackThree[stackThree.length - 1].cardFace
            img.onload = () => {
                showCard.style.backgroundImage = `url(${img.src})`
            }
            stackThree.pop()
            console.log(stackThree) // ----------------
        } else if(stackOne.length === 0) {
            stackTwo.sort(() => Math.random() - 0.5)

            img.src = stackTwo[stackTwo.length - 1].cardFace
            img.onload = () => {
                showCard.style.backgroundImage = `url(${img.src})`
            }
            stackTwo.pop()
            console.log(stackTwo) // -----------------
        } else {
            stackOne.sort(() => Math.random() - 0.5)

            img.src = stackOne[stackOne.length - 1].cardFace
            img.onload = () => {
                showCard.style.backgroundImage = `url(${img.src})`
            }
            stackOne.pop()
            console.log(stackOne) // ---------------
        }
    } catch(err) {
        alert('deck is over')
    }
}

const cardShirt = document.querySelector('.card-shirt')
const showCard = document.querySelector('.current-card')

function mixCard() {
    mix.classList.add('hidden')
    stage.classList.remove('hidden')
    currentCard.classList.remove('hidden')

    // Azathoth
    if(azathoth.classList.contains('active-ancient')) {
        const numbersOfCardsObj = numbersOfCards(ancientsData[0])
        let stackGreen = []
        let stackBlue = []
        let stackBrown = []
        
        // Normal difficulty
        if(normalLevel.classList.contains('active-difficulty')) {
            console.log('azathoth normal')
            
            getNumberCards(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)

            getNumberCards(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)

            getNumberCards(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)

        // Easy difficulty
        } else if(easyLevel.classList.contains('active-difficulty')) {
            console.log('azathoth easy')

            //Здесь поменять функию на изи лвл

        // Hard difficulty
        } else if(hardLevel.classList.contains('active-difficulty')) {
            console.log('azathoth hard')

            ////Здесь поменять функию на хард лвл
        }

        //Формирование мини-колод
        const stackStageOne = []

        for(let i = 0; i < 4; i++) {
            if(stackStageOne.length === 0) {
                stackStageOne.push(stackBlue[i])
            } else if(stackStageOne.length === 1) {
                stackStageOne.push(stackGreen[i])
            } else if(stackStageOne.length > 1) {
                stackStageOne.push(stackBrown[i])
            }
        }

        const stackStageTwo = []

        for(let i = 0; i < 6; i++) {
            if(stackStageTwo.length === 0) {
                stackStageTwo.push(stackBlue[i])
            } else if(stackStageTwo.length >= 1 && stackStageTwo.length < 3) {
                stackStageTwo.push(stackGreen[i])
            } else if(stackStageTwo.length >= 3) {
                stackStageTwo.push(stackBrown[i])
            }
        }

        const stackStageThree = []

        for(let i = 0; i < 6; i++) {
            if(stackStageThree.length >= 0 && stackStageThree.length < 2) {
                stackStageThree.push(stackGreen[i])
            } else if(stackStageThree.length >= 2) {
                stackStageThree.push(stackBrown[i])
            }
        }

        cardShirt.addEventListener('click', () => {
            showCards(stackStageOne, stackStageTwo, stackStageThree)
        })
    }
}

mix.addEventListener('click', mixCard)