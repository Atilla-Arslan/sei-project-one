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
  const scoreSelector = document.querySelector('.score-span')
  const lifeSelector = document.querySelector('.life-span')

  let score = 0

  let lives = 3
  lifeSelector.innerHTML = lives
  // Map paramters

  const width = 20
  const cellCount = width * width

  // Arrays containing cell info
  const cells = []

  // Where PLAYER starts

  const playerStartPosition = 22
  // Where cat is now
  let playerCurrentPosition = 22

  //* WALLS

  // prettier-ignore
  const outerWalls = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,60,80,100,120,140,160,180,200,220,240,260,280, 300, 320, 340,360,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,39,59,79,99,119,139,159,179,199,219,239,259,279,299,319,339,359,379,399]
  // prettier-ignore

  //29,30,49,50,89,90,109,110,44,45,64,65,84,85,104,105,124,125,144,145,86,87,106,107,41,42,61,62,81,82,101,102,121,122,141,142,181,182,201,202,221,222,241,242,184,185,204,205,224,225,244,245,264,265,284, 285,304,305,281,282,301,302,321,322,341,342,344, 345, 364, 365, 384, 385, 347, 348, 349, 350, 351, 352, 367, 368 ,369, 370, 371 ,372, 389, 390, 147,148,167,168,187,188,169,170,189,190,151,152,171,172,191,192, 347,348,349,350,351,352,367,368,369,370,371,372,389,390, 92, 93, 112,113,54,55,74,75,94,95,114,115,134,135,154,155,194,195,214,215,234,235,254,255,274,275,294,295,314,315,354,355,374,375,394,395, 57,58,77,78,97,98,117,118,137,138,157,158,197,198,217,218,237,238,257,258,297,298,317,318,337,338,357,358, 247,248,249,250,251,252,267,268,269,270,271,272,289,290,309,310

  const cellsWithWalls = []
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

  //* NPC OBJECTS

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
    new Npc('ghastly', 'ghastly-two', 150, 250),
    new Npc('ghastly', 'ghastly-two', 313, 250),
    new Npc('ghastly', 'ghastly-two', 325, 250),
    new Npc('ghastly', 'ghastly-two', 38, 250)
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

  function startTimer() {
    timerID = setInterval(() => {
      if (score === 21500 || lives === 0) {
        resetGame()
        clearInterval(timerID)

        resetScore()
        resetLives()
      }
    }, 1000)
  }

  startTimer()

  function resetGame() {
    resetPlayer()
    playerCurrentPosition = playerStartPosition
    addItemsToGrid(balls, items.class)
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

  // function addWalls() {
  //   const wall = 'wall'
  //   for (let i = 0; i < cellsWithWalls.length; i++) {
  //     cells[cellsWithWalls[i]].classList.add(wall)
  //   }
  // }

  // addWalls()

  function addItemsToGrid(array, itemType) {
    for (let i = 0; i < array.length; i++) {
      cells[array[i]].classList.add(itemType)
    }
  }

  addItemsToGrid(totalCells, wall)

  //** uncomment
  addItemsToGrid(balls, items.class)

  //* NPC's

  //**  Add all ghosts to the grid

  npcs.forEach((npc) => {
    cells[npc.current].classList.add(npc.classTwo)
    cells[npc.current].classList.add('npc')
  })

  //pass each npc in the object through the move npc function

  npcs.forEach((npc) => moveNpc(npc))

  function moveNpc(npc) {
    const npcMoves = [-1, +1, -width, width]

    let direction = npcMoves[Math.floor(Math.random() * npcMoves.length)]
    //const position = npc.current + direction
    npc.timerID = setInterval(function () {
      if (
        // cells.includes(position) ||
        // position - width < -width ||
        // position % width === width ||
        // position % width === 0 ||
        // position + width >= width * width ||
        !cells[npc.current + direction].classList.contains(wall) &&
        !cells[npc.current + direction].classList.contains('npc')
      ) {
        cells[npc.current].classList.remove(npc.classTwo, 'npc')
        npc.current += direction

        cells[npc.current].classList.add(npc.classTwo, 'ghastly-two')
      } else {
        direction = npcMoves[Math.floor(Math.random() * npcMoves.length)]
      }
    }, npc.speed)
  }

  // function moveNpc2(npc) {
  //   const npcMoves = [-1, +1, -width, width]

  //   let direction = npcMoves[Math.floor(Math.random() * npcMoves.length)]
  //   const position = npc.current + direction
  //   npc.timerID = setInterval(function () {
  //     if (
  //       // prettier-ignore
  //       (position % width !== 0) &&
  //       (position % width !== width - 1) &&
  //       (position >= width ) &&
  //       (position + width <= width * width - 1)
  //     ) {
  //       console.log('position is', position)
  //       console.log(position % width !== 0)
  //       console.log(position % width !== width - 1)
  //       console.log(position >= width)
  //       console.log(position + width <= width * width - 1)
  //     } else {
  //       console.log('position is', position)
  //       console.log(position % width !== 0)
  //       console.log(position % width !== width - 1)
  //       console.log(position >= width)
  //       console.log(position + width <= width * width - 1)
  //       direction = npcMoves[Math.floor(Math.random() * npcMoves.length)]
  //       console.log('position has changed to', position + direction)
  //     }
  //   }, npc.speed)
  // }

  // Load NPC 1

  // if (cells[npc[0].startPosition].classList.contains(items.class) === true) {
  //   cells[npc[0].startPosition].classList.remove(items.class)
  //   cells[npc[0].currentPosition].classList.add(npc[0].class)
  // }

  // function npcMove() {
  //   moveNpc = setInterval(() => {
  //     // Remove class of npc
  //     cells[npc[0].currentPosition].classList.remove(npc[0].class)
  //     cells[npc[0].currentPosition].classList.remove(npc[0].classTwo)

  //     // If the cell contains an item add class two if not add class one to stop bug
  //     if (
  //       cells[npc[0].currentPosition].classList.contains(items.class) === true
  //     ) {
  //       cells[npc[0].currentPosition].classList.add(npc[0].classTwo)
  //     } else {
  //       cells[npc[0].currentPosition].classList.add(npc[0].class)
  //     }
  //   }, 1000)
  // }
  // npcMove()

  //* Remove class if player on cell

  function removeItem() {
    if (cells[playerCurrentPosition].classList.contains(items.class) === true) {
      pikaPlay()
      cells[playerCurrentPosition].classList.remove(items.class)
      score = score += 100
      scoreSelector.innerHTML = score
    } else {
      pikachuPlay()
    }
  }

  function resetPlayer() {
    if (
      cells[playerCurrentPosition].classList.contains(
        playerClass || playerClassRight || playerClassUp
      ) === true
    ) {
      cells[playerCurrentPosition].classList.remove(playerClass)
      cells[playerCurrentPosition].classList.remove(playerClassRight)
      cells[playerCurrentPosition].classList.remove(playerClassUp)
    }
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
    cells[position].classList.remove(playerClass)
    cells[position].classList.remove(playerClassRight)
    cells[position].classList.remove(playerClassUp)
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
        addPlayerRight(playerCurrentPosition)
      }
    } else if (key === 37 && playerCurrentPosition % width !== 0) {
      // Left
      if (cells[playerCurrentPosition - 1].classList.contains(wall) === true) {
        addPlayerRight(playerCurrentPosition)
      } else {
        playerCurrentPosition--
        removeItem()
        addPlayer(playerCurrentPosition)
      }
    } else if (key === 38 && playerCurrentPosition >= width) {
      // up
      if (cells[playerCurrentPosition - 20].classList.contains(wall) === true) {
        playerCurrentPosition
      } else {
        playerCurrentPosition -= width
        removeItem()
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
        addPlayer(playerCurrentPosition)
      }
    } else {
      console.log('invalid key')
    }

    //* Lose life if player on same cell as Npc
    if (cells[playerCurrentPosition].classList.contains('npc') === true) {
      lives = lives - 1

      lifeSelector.innerHTML = lives
    }
    // adds player based on new position by passing it as a paramter
    addPlayer(playerCurrentPosition)
  }

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

  //audio.play()
  audio.volume = 0.2
  //* Event listeners

  document.addEventListener('keydown', handleKeyUp)

  // DISABLE arrow scrolling cross browsers

  window.addEventListener(
    'keydown',
    (e) => {
      if (e.target.localName != 'input') {
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
