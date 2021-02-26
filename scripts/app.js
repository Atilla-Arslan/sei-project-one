function init() {
  //* Variables
  // Selectors * classes

  const grid = document.querySelector('.grid')

  const playerClass = 'player'
  const playerClassRight = 'player-right'
  const playerClassUp = 'player-up'
  const wall = 'wall'
  const audio = document.querySelector('audio')
  const pika = document.querySelector('.pika')
  const pikachuu = document.querySelector('.pikachuu')
  const loseLifesSound = document.querySelector('.lose-life')
  const pickUp = document.querySelector('.pick-up')
  const gameOverSound = document.querySelector('.game-over')
  const youWinSound = document.querySelector('.you-win')
  const scoreSelector = document.querySelector('.score-span')
  const lifeSelector = document.querySelector('.life-span')

  const startButton = document.querySelector('#start')
  const playAgainButton = document.querySelector('.play_again')
  const beginningWrapper = document.querySelector('.beginning-wrapper')
  const beginningOverlay = document.querySelector('.beginning-overlay')
  const endWrapper = document.querySelector('.end-wrapper')
  const endOverlay = document.querySelector('.end-overlay')
  const soundButton = document.querySelector('.sound-on')

  let score = 0

  let lives = 3
  lifeSelector.innerHTML = lives

  let active = false
  let ballCount = 1
  // Map paramters

  const width = 20
  const cellCount = width * width

  // Arrays containing cell info
  const cells = []

  // Where PLAYER starts

  const playerStartPosition = 21
  // Where PLayer is now
  let playerCurrentPosition = 21

  //* WALLS

  // prettier-ignore
  const outerWalls = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,60,80,100,120,140,160,180,200,220,240,260,280, 300, 320, 340,360,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,39,59,79,99,119,139,159,179,199,219,239,259,279,299,319,339,359,379,399]
  // prettier-ignore

  const cellsWithWalls = [62,63,82,83,102,103,122,123,142,143, 182,183,202,203,222,223,242,243,282,283,302,303,322,323,342,343,66,85,86,87,105,106,107,125,126,145,146,185,186,205,206,245,246,265,266,285,286,345,346,365,366,29,30,39,50,69,70,109,110,129,130,168,188,190,190,191,248,249,250,251,268,269,270,289,290,328,329,330,331,348,349,350,351,369,370,92,112,73,74,93,94,113,114,133,134,153,154,193,194,213,214,233,234,253,254,273,274,293,294,353,354,373,274,76,77,96,97,116,117,136,137,156,157,196,197,216,217,236,237,256,257,296,297,316,317,336,337,356,357,271, 65,225,226,49, 189,171, 374]
  const totalCells = cellsWithWalls.concat(outerWalls)

  const n = 399
  const [, ...result] = Array(n + 1).keys()
  const balls = result.filter((n) => !totalCells.includes(n))
  //* ITEM OBJECTS

  const items = {
    name: 'normal-pokeball',
    class: 'pokeball',
    score: 100,
    cellsWithBall: [balls]
  }

  const powerPellet = {
    name: 'thunder-stone',
    class: 'thunder-stone',
    cellsWithStone: [121, 371, 215, 118]
  }

  //* NPC OBJECTS / Classes

  class Npc {
    constructor(classOne, classTwo, start, speed) {
      this.classOne = classOne
      this.classTwo = classTwo
      this.start = start
      this.speed = speed
      this.current = this.start
      this.timerID = NaN
    }
  }

  const npcs = [
    new Npc('scared', 'ghastly-two', 150, 250),
    new Npc('scared', 'haunter', 313, 300),
    new Npc('scared', 'gengar', 325, 500),
    new Npc('scared', 'weezing', 38, 400)
  ]

  //* GRID GENERATOR

  // Make grid
  function createGrid(playerStartPosition) {
    // Using for loop to create grid, because we can specify how long we want it to run for
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // Set cell number based on i (Turn on for development reasons to see cell index)
      //cell.innerHTML = i
      // Add each div to parent grid as children
      grid.appendChild(cell)
      // adds's each cell to an array
      cells.push(cell)
    }

    addPlayer(playerStartPosition)
  }

  createGrid(playerStartPosition)

  //* Game engine

  function gameStart() {
    beginningWrapper.classList.add('remove')
    beginningOverlay.classList.remove('display')

    removeStartItem()
    addPowerPellet()
    setTimeout(() => {
      addNpcs()
      addNpctoMove()
    }, 250)

    playSounds()
  }

  function startAgain() {
    audio.volume = 0.1
    gameOverSound.volume = 0
    audio.currentTime = 0
    resetScore()
    resetLives()
    addPowerPellet()
    setTimeout(() => {
      resetGame()
    }, 500)

    document.querySelector('.end-text').innerHTML = ''
    playAgainButton.classList.remove('display')
    endOverlay.classList.remove('overlay')
    endWrapper.classList.add('remove')
  }

  function resetGame() {
    resetPlayer()
    resetNpcs()
    playerCurrentPosition = playerStartPosition
    addItemsToGrid(balls, items.class)
    removeStartItem()
    addPlayer(playerStartPosition)
  }

  function resetScore() {
    score = 0
    scoreSelector.innerHTML = score
  }
  function resetLives() {
    lives = 3
    lifeSelector.innerHTML = lives
  }

  // * Create the walls from the trees / function to add any item to grid

  function addItemsToGrid(array, itemType) {
    for (let i = 0; i < array.length; i++) {
      cells[array[i]].classList.add(itemType)
    }
  }

  addItemsToGrid(totalCells, wall)
  addItemsToGrid(balls, items.class)

  function addPowerPellet() {
    addItemsToGrid(powerPellet.cellsWithStone, powerPellet.class)
  }

  //* NPC's

  //**  Add all npc to the grid

  function addNpcs() {
    npcs.forEach((npc) => {
      cells[npc.current].classList.add(npc.classTwo)
      cells[npc.current].classList.add('npc')
    })
  }

  function addNpctoMove() {
    setTimeout(() => {
      npcs.forEach((npc) => moveNpc(npc))
    }, 1000)
  }

  //pass each npc in the object through the move npc function

  function moveNpc(npc) {
    const npcMoves = [-1, +1, -width, width]

    let direction = npcMoves[Math.floor(Math.random() * npcMoves.length)]

    npc.timerID = setInterval(function () {
      if (
        !cells[npc.current + direction].classList.contains(wall) &&
        !cells[npc.current + direction].classList.contains('npc')
      ) {
        if (active === false) {
          cells[npc.current].classList.remove(npc.classTwo, 'npc')
        } else {
          cells[npc.current].classList.remove(npc.classTwo, npc.classOne, 'npc')
        }

        npc.current += direction

        if (active === false) {
          cells[npc.current].classList.add(npc.classTwo, 'npc')
        } else {
          cells[npc.current].classList.add(npc.classTwo, npc.classOne, 'npc')
        }

        cells[npc.current].classList.add(npc.classTwo, 'npc')

        if (active === true) {
          resetNpc()
        }

        if (playerCurrentPosition === playerStartPosition || active === true) {
          return
        } else {
          loseLife()
        }
      } else {
        direction = npcMoves[Math.floor(Math.random() * npcMoves.length)]
      }

      gameOver()
    }, npc.speed)
  }

  //* reset Game

  function gameOver() {
    if (lives === 0) {
      audio.volume = 0
      gameOverSound.play()
      gameOverOverlay()
    }
  }
  gameOver()

  // score >= 17900 ||

  function youWin() {
    if (ballCount >= balls.length) {
      audio.volume = 0
      youWinSound.play()
      youWinOverlay()
    }
  }

  function loseLife() {
    if (cells[playerCurrentPosition].classList.contains('npc') === true) {
      loseLifesSound.play()
      resetPlayer()
      removeStartItem()
      playerCurrentPosition = playerStartPosition
      addPlayer(playerStartPosition)
      lives = lives - 1
      lifeSelector.innerHTML = lives
    }
  }

  // Reset position of NPC if player uses power pellet and add score

  function resetNpc() {
    for (let i = 0; i < npcs.length; i++) {
      if (
        cells[playerCurrentPosition].classList.contains(npcs[i].classTwo) ===
        true
      ) {
        // prettier-ignore
        cells[playerCurrentPosition].classList.remove(npcs[i].classTwo, 'scared', 'npc')

        npcs[i].current = npcs[i].start
        score = score += 400
        scoreSelector.innerHTML = score
      }
    }
  }

  function resetNpcs() {
    npcs.forEach((npc) => {
      cells[npc.current].classList.remove(npc.classTwo, 'npc')
      npc.current = npc.start
      addNpcs()
    })
  }

  function gameOverOverlay() {
    const gameOverText = document.querySelector('.end-text')
    playAgainButton.classList.add('display')
    gameOverText.innerHTML = `Your score was ${score}`
    gameOverText.classList.add('display')
    endOverlay.classList.add('overlay')
  }
  function youWinOverlay() {
    const gameOverText = document.querySelector('.end-text')
    playAgainButton.classList.add('display')

    gameOverText.innerHTML = 'You Win'
    setTimeout(() => {
      gameOverText.innerHTML = `Your score was ${score}`
    }, 500)

    gameOverText.classList.add('display')
    endOverlay.classList.add('overlay')
  }

  //* Remove class if player on cell

  function removeItem() {
    if (cells[playerCurrentPosition].classList.contains(items.class) === true) {
      pikaPlay()
      cells[playerCurrentPosition].classList.remove(items.class)
      score = score += 100
      scoreSelector.innerHTML = score
      ballCount += 1
    } else {
      pikachuPlay()
    }
  }

  function removePellet() {
    if (
      cells[playerCurrentPosition].classList.contains(powerPellet.class) ===
      true
    ) {
      pickUp.play()
      cells[playerCurrentPosition].classList.remove(items.class)
      cells[playerCurrentPosition].classList.remove(powerPellet.class)

      active = true
      setTimeout(() => {
        active = false

        npcs.forEach((npc) => {
          cells[npc.current].classList.remove(npc.classOne)
        })
      }, 10000)
    }
  }

  function removeStartItem() {
    if (cells[playerStartPosition].classList.contains(items.class) === true) {
      cells[playerStartPosition].classList.remove(items.class)
    }
  }
  removeStartItem()

  function resetPlayer() {
    cells[playerCurrentPosition].classList.remove(
      playerClass,
      playerClassRight,
      playerClassUp
    )
  }

  //* Add player to grid and controls

  // Position = paramters for passing index where cat should appear, argument passed through when function called.

  function addPlayer(position) {
    // Adds player to position in grid at index betwen []

    cells[position].classList.add(playerClass)
  }
  function addPlayerRight(position) {
    // Adds player to position in grid at index betwen []
    cells[position].classList.add(playerClassRight)
  }
  function addPlayerUp(position) {
    // Adds player to position in grid at index betwen []
    cells[position].classList.add(playerClassUp)
  }

  function removePlayer(position) {
    // Remove player to position in grid at index betwen []
    cells[position].classList.remove(
      playerClass,
      playerClassRight,
      playerClassUp
    )
  }

  //* Handle keydown controls

  function handleKeyUp(event) {
    const key = event.keyCode

    removePlayer(playerCurrentPosition)

    if (key === 39 && playerCurrentPosition % width !== width - 1) {
      // right
      if (cells[playerCurrentPosition + 1].classList.contains(wall) === true) {
        playerCurrentPosition
      } else {
        playerCurrentPosition++
        removeItem()
        removePellet()

        addPlayerRight(playerCurrentPosition)
      }
    } else if (key === 37 && playerCurrentPosition % width !== 0) {
      // Left
      if (cells[playerCurrentPosition - 1].classList.contains(wall) === true) {
        addPlayerRight(playerCurrentPosition)
      } else {
        playerCurrentPosition--
        removeItem()
        removePellet()

        addPlayer(playerCurrentPosition)
      }
    } else if (key === 38 && playerCurrentPosition >= width) {
      // up
      if (cells[playerCurrentPosition - 20].classList.contains(wall) === true) {
        playerCurrentPosition
      } else {
        playerCurrentPosition -= width
        removeItem()
        removePellet()
        addPlayerUp(playerCurrentPosition)
      }
    } else if (
      key === 40 &&
      playerCurrentPosition + width <= width * width - 1
    ) {
      // down
      if (cells[playerCurrentPosition + 20].classList.contains(wall) === true) {
        playerCurrentPosition
      } else {
        playerCurrentPosition += width
        removeItem()
        removePellet()
        addPlayer(playerCurrentPosition)
      }
    } else {
      //console.log('invalid key')
    }

    youWin()
    console.log(ballCount)
    // //* Lose life if player on same cell as Npc
    if (active === false) {
      loseLife()
    }

    // adds player based on new position by passing it as a paramter

    addPlayer(playerCurrentPosition)
  }

  //** Pause Game

  //* Play audio

  function pikaPlay() {
    if (pika.paused) {
      pika.play()
    } else {
      pika.currentTime = 0
    }
  }
  function pikachuPlay() {
    if (pikachuu.paused) {
      pikachuu.play()
    } else {
      pikachuu.currentTime = 0
    }
  }

  function muteAudio(event) {
    event.target.classList.toggle('active')
    if (event.target.classList.contains('active')) {
      audio.volume = 0
      pika.volume = 0
      pikachuu.volume = 0
      soundButton.innerText = 'Sound Off'
    } else {
      audio.volume = 0.2
      pika.volume = 0.5
      pikachuu.volume = 0.5
      soundButton.innerText = 'Sound On'
    }
  }

  function playSounds() {
    audio.play()
    audio.loop === true
    audio.volume = 0.1
  }

  //* Event listeners
  soundButton.addEventListener('click', muteAudio)

  document.addEventListener('keydown', handleKeyUp)

  startButton.addEventListener('click', gameStart)

  playAgainButton.addEventListener('click', startAgain)

  // DISABLE arrow scrolling cross browsers

  window.addEventListener(
    'keydown',
    (e) => {
      if (e.target.localName !== 'input') {
        // if you need to filter <input> elements
        switch (e.keyCode) {
          case 37: // left
          case 39: // right
            e.preventDefault()
            break
          case 38: // up
          case 40: // down
            e.preventDefault()
            break
          default:
            break
        }
      }
    },
    {
      capture: true, // this disables arrow key scrolling in modern Chrome
      passive: false // this is optional
    }
  )
}

window.addEventListener('DOMContentLoaded', init)
