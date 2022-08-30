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
const difficultyLevel = document.querySelector('.difficulty-level')
const easyLevel = document.querySelector('.easy-level')
const normalLevel = document.querySelector('.normal-level')
const hardLevel = document.querySelector('.hard-level')
const mix = document.querySelector('.deck-mixed')
const stage = document.querySelector('.stage-wrapper')
const currentCard = document.querySelector('.current-card-wrapper')
const cardShirt = document.querySelector('.card-shirt')
const showCard = document.querySelector('.current-card')
const stageTitleSecond = document.querySelector('.title-stage-second')
const stageTitleThird = document.querySelector('.title-stage-third')
const stageTitleFirst = document.querySelector('.title-stage-first')

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

function getNumberCardsEasy(stackName, colorCards, length) {
    const sortCardEasyArr = colorCards.filter(item => item.difficulty !== 'hard')
    
    for(let i = 0; i < length; i++) {
        let randomCard = getRandomNum(0, sortCardEasyArr.length)

        if(stackName.includes(sortCardEasyArr[randomCard])) {
            randomCard = getRandomNum(0, sortCardEasyArr.length)
            stackName.push(sortCardEasyArr[randomCard])
        } else {
            stackName.push(sortCardEasyArr[randomCard])
        }
    }

    return stackName
}

function getNumberCardsHard(stackName, colorCards, length) {
    const sortCardHardArr = colorCards.filter(item => item.difficulty !== 'easy')
    
    for(let i = 0; i < length; i++) {
        let randomCard = getRandomNum(0, sortCardHardArr.length)

        if(stackName.includes(sortCardHardArr[randomCard])) {
            randomCard = getRandomNum(0, sortCardHardArr.length)
            stackName.push(sortCardHardArr[randomCard])
        } else {
            stackName.push(sortCardHardArr[randomCard])
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
            // console.log(stackThree)
        } else if(stackOne.length === 0) {
            stackTwo.sort(() => Math.random() - 0.5)

            img.src = stackTwo[stackTwo.length - 1].cardFace
            img.onload = () => {
                showCard.style.backgroundImage = `url(${img.src})`
            }
            stackTwo.pop()
            // console.log(stackTwo)
        } else {
            stackOne.sort(() => Math.random() - 0.5)

            img.src = stackOne[stackOne.length - 1].cardFace
            img.onload = () => {
                showCard.style.backgroundImage = `url(${img.src})`
            }
            stackOne.pop()
            // console.log(stackOne)
        }
    } catch(err) {
        // alert('deck is over')
    }
}

function showIndicator(stackOne, stackTwo, stackThree) {
    // Stage1
    const firstStageGreen = document.querySelector('.first-stage-green')
    const firstStageBrown = document.querySelector('.first-stage-brown')
    const firstStageBlue = document.querySelector('.first-stage-blue')
    let firstStageGreenCount = 0
    let firstStageBrownCount = 0
    let firstStageBlueCount = 0

    stackOne.forEach(item => {
        if(item.color === 'blue') {
            firstStageBlueCount++
        } else if(item.color === 'brown') {
            firstStageBrownCount++
        } else if(item.color === 'green') {
            firstStageGreenCount++
        }
    })
    
    firstStageGreen.textContent = firstStageGreenCount
    firstStageBrown.textContent = firstStageBrownCount
    firstStageBlue.textContent = firstStageBlueCount

    if(firstStageGreenCount == 0 && firstStageBrownCount == 0 && firstStageBlueCount == 0) {
        stageTitleFirst.style.color = 'red'
    }

    //Stage2
    const secondStageGreen = document.querySelector('.second-stage-green')
    const secondStageBrown = document.querySelector('.second-stage-brown')
    const secondStageBlue = document.querySelector('.second-stage-blue')
    let secondStageGreenCount = 0
    let secondStageBrownCount = 0
    let secondStageBlueCount = 0

    stackTwo.forEach(item => {
        if(item.color === 'blue') {
            secondStageBlueCount++
        } else if(item.color === 'brown') {
            secondStageBrownCount++
        } else if(item.color === 'green') {
            secondStageGreenCount++
        }
    })

    secondStageGreen.textContent = secondStageGreenCount
    secondStageBrown.textContent = secondStageBrownCount
    secondStageBlue.textContent = secondStageBlueCount
    
    if(secondStageGreenCount == 0 && secondStageBrownCount == 0 && secondStageBlueCount == 0) {
        stageTitleSecond.style.color = 'red'
    }

    //Stage3
    const thirdStageGreen = document.querySelector('.third-stage-green')
    const thirdStageBrown = document.querySelector('.third-stage-brown')
    const thirdStageBlue = document.querySelector('.third-stage-blue')
    let thirdStageGreenCount = 0
    let thirdStageBrownCount = 0
    let thirdStageBlueCount = 0

    stackThree.forEach(item => {
        if(item.color === 'blue') {
            thirdStageBlueCount++
        } else if(item.color === 'brown') {
            thirdStageBrownCount++
        } else if(item.color === 'green') {
            thirdStageGreenCount++
        }
    })

    thirdStageGreen.textContent = thirdStageGreenCount
    thirdStageBrown.textContent = thirdStageBrownCount
    thirdStageBlue.textContent = thirdStageBlueCount

    if(thirdStageGreenCount == 0 && thirdStageBrownCount == 0 && thirdStageBlueCount == 0) {
        stageTitleThird.style.color = 'red'
    }
}

function mixCard() {
    mix.classList.add('hidden')
    stage.classList.remove('hidden')
    currentCard.classList.remove('hidden')
    showCard.style.backgroundImage = 'none'
    stageTitleFirst.style.color = 'rgb(172, 172, 172)'
    stageTitleSecond.style.color = 'rgb(172, 172, 172)'
    stageTitleThird.style.color = 'rgb(172, 172, 172)'

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
            // console.log(stackGreen)
            // console.log(stackBlue)
            // console.log(stackBrown)

        // Easy difficulty
        } else if(easyLevel.classList.contains('active-difficulty')) {
            console.log('azathoth easy')
            getNumberCardsEasy(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsEasy(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsEasy(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)
            // console.log(stackGreen)
            // console.log(stackBlue)
            // console.log(stackBrown)

        // Hard difficulty
        } else if(hardLevel.classList.contains('active-difficulty')) {
            console.log('azathoth hard')
            getNumberCardsHard(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsHard(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsHard(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)
            // console.log(stackGreen)
            // console.log(stackBlue)
            // console.log(stackBrown)
        }

        //Formation of mini-decks by Azathoth
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

        showIndicator(stackStageOne, stackStageTwo, stackStageThree)

        cardShirt.addEventListener('click', show)

        function show() {
            showCards(stackStageOne, stackStageTwo, stackStageThree)
            showIndicator(stackStageOne, stackStageTwo, stackStageThree)
            if(stackStageOne.length == 0 && stackStageTwo.length == 0 && stackStageThree.length == 0) {
                cardShirt.removeEventListener('click', show)
            }
        }

    // Cthulthu
    } else if(cthulthu.classList.contains('active-ancient')) {
        const numbersOfCardsObj = numbersOfCards(ancientsData[1])
        let stackGreen = []
        let stackBlue = []
        let stackBrown = []

        // Normal difficulty
        if(normalLevel.classList.contains('active-difficulty')) {
            console.log('cthulthu normal')
            getNumberCards(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCards(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCards(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)

        // Easy difficulty
        } else if(easyLevel.classList.contains('active-difficulty')) {
            console.log('cthulthu easy')
            getNumberCardsEasy(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsEasy(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsEasy(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)

        // Hard difficulty
        } else if(hardLevel.classList.contains('active-difficulty')) {
            console.log('cthulthu hard')
            getNumberCardsHard(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsHard(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsHard(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)
        }

        //Formation of mini-decks by Cthulthu
        const stackStageOne = []

        for(let i = 0; i < 4; i++) {
            if(stackStageOne.length >= 0 && stackStageOne.length < 2) {
                stackStageOne.push(stackBlue[i])
            } else if(stackStageOne.length >= 2) {
                stackStageOne.push(stackBrown[i])
            }
        }

        const stackStageTwo = []

        for(let i = 0; i < 4; i++) {
            if(stackStageTwo.length === 0) {
                stackStageTwo.push(stackGreen[i])
            } else if(stackStageTwo.length > 0) {
                stackStageTwo.push(stackBrown[i])
            }
        }

        const stackStageThree = []

        for(let i = 0; i < 7; i++) {
            if(stackStageThree.length >= 0 && stackStageThree.length < 3) {
                stackStageThree.push(stackGreen[i])
            } else if(stackStageThree.length >= 3) {
                stackStageThree.push(stackBrown[i])
            }
        }

        showIndicator(stackStageOne, stackStageTwo, stackStageThree)

        cardShirt.addEventListener('click', show)

        function show() {
            showCards(stackStageOne, stackStageTwo, stackStageThree)
            showIndicator(stackStageOne, stackStageTwo, stackStageThree)
            if(stackStageOne.length == 0 && stackStageTwo.length == 0 && stackStageThree.length == 0) {
                cardShirt.removeEventListener('click', show)
            }
        }

    // IogSothoth
    } else if(iogSothoth.classList.contains('active-ancient')) {
        const numbersOfCardsObj = numbersOfCards(ancientsData[2])
        let stackGreen = []
        let stackBlue = []
        let stackBrown = []
        
        // Normal difficulty
        if(normalLevel.classList.contains('active-difficulty')) {
            console.log('iogSothoth normal')
            getNumberCards(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCards(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCards(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)

        // Easy difficulty
        } else if(easyLevel.classList.contains('active-difficulty')) {
            console.log('iogSothoth easy')
            getNumberCardsEasy(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsEasy(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsEasy(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)

        // Hard difficulty
        } else if(hardLevel.classList.contains('active-difficulty')) {
            console.log('iogSothoth hard')
            getNumberCardsHard(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsHard(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsHard(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)
        }

        //Formation of mini-decks by IogSothoth
        const stackStageOne = []

        for(let i = 0; i < 3; i++) {
            if(stackStageOne.length === 0) {
                stackStageOne.push(stackBlue[i])
            } else if(stackStageOne.length >= 1) {
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

        for(let i = 0; i < 7; i++) {
            if(stackStageThree.length >= 0 && stackStageThree.length < 3) {
                stackStageThree.push(stackGreen[i])
            } else if(stackStageThree.length >= 3) {
                stackStageThree.push(stackBrown[i])
            }
        }

        showIndicator(stackStageOne, stackStageTwo, stackStageThree)

        cardShirt.addEventListener('click', show)

        function show() {
            showCards(stackStageOne, stackStageTwo, stackStageThree)
            showIndicator(stackStageOne, stackStageTwo, stackStageThree)
            if(stackStageOne.length == 0 && stackStageTwo.length == 0 && stackStageThree.length == 0) {
                cardShirt.removeEventListener('click', show)
            }
        }

    // ShubNiggurath
    } else if(shubNiggurath.classList.contains('active-ancient')) {
        const numbersOfCardsObj = numbersOfCards(ancientsData[3])
        let stackGreen = []
        let stackBlue = []
        let stackBrown = []

        // Normal difficulty
        if(normalLevel.classList.contains('active-difficulty')) {
            console.log('shubNiggurath normal')
            getNumberCards(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCards(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCards(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)

        // Easy difficulty
        } else if(easyLevel.classList.contains('active-difficulty')) {
            console.log('shubNiggurath easy')
            getNumberCardsEasy(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsEasy(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsEasy(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)

        // Hard difficulty
        } else if(hardLevel.classList.contains('active-difficulty')) {
            console.log('shubNiggurath hard')
            getNumberCardsHard(stackGreen, cardsGreen, numbersOfCardsObj.greenCards)
            getNumberCardsHard(stackBlue, cardsBlue, numbersOfCardsObj.blueCards)
            getNumberCardsHard(stackBrown, cardsBrown, numbersOfCardsObj.brownCards)
        }

        //Formation of mini-decks by ShubNiggurath
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
            } else if(stackStageTwo.length >= 1 && stackStageTwo.length < 4) {
                stackStageTwo.push(stackGreen[i])
            } else if(stackStageTwo.length >= 4) {
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

        showIndicator(stackStageOne, stackStageTwo, stackStageThree)

        cardShirt.addEventListener('click', show)

        function show() {
            showCards(stackStageOne, stackStageTwo, stackStageThree)
            showIndicator(stackStageOne, stackStageTwo, stackStageThree)
            if(stackStageOne.length == 0 && stackStageTwo.length == 0 && stackStageThree.length == 0) {
                cardShirt.removeEventListener('click', show)
            }
        }
    }
}

mix.addEventListener('click', mixCard)

console.log('Выполненные требования')
console.log('- Четыре древних +20 \n- Три уровня сложности +15 \n- Карты замешиваются по правилам игры +40 \n- Реализован трекер текущего состояния колоды +20')
console.log('Итого: 95')