# sei-project-one

For the Software Engineering Immersive Course at General Assembly I was given the challenge of making a game, from a predefined list of games using only HTML, CSS and Javascript in one week.

I decided to go with the age old classic 80’s arcade game Pac-Man. The game involves pacman moving around a maze to eat all of the pellets whilst running away from four different ghosts. When pacman eats a power pellet he is able to eat the ghosts and get extra points.

I went with a Pokemon theme, as there were countless game assets online freely available from the Pokemon modding community. The only thing I created myself were the trees on a grid map.

## Brief

- To make a Pacman game where the player can at least clear one map
- To display the players score at the end of the game

### Technologies used:

HTML5 with HTML5 audio CSS3 with animation JavaScript (ES6) Git GitHub Google Fonts Google Chrome dev tools VS Code Eslint Photoshop

## Approach:

### Navigation:

I started by creating a 20 by 20 grid of divs that were mapped into an outer container div. The player and ghosts were positioned on the grid by adding css classes with a background image and then removing those classes to give the appearance of movement.

To move the player I used the Event Listener initiated by ‘Keyup’, which I assigned to the arrow keys on the keyboard. To prevent the player from moving off the edge of the grid or into a wall, I created some logic which restricted movement if a wall class was present or it was any one of the edge divs. I also added some logic to prevent the ghosts moving into any of the walls.

Pros

It was easy to create the logic to move the player and ghosts around the map Easy to create logic for ‘collision’ (player loses life if it ends up in the same div as the ghost, and player can take an item when it enters certain divs).

Cons

The character seems to jump from grid to grid instead of a smooth movement

### Creating the Maze:

To add the individual items to the grid, I created this reusable function which took an array with grid positions as the first argument and the item class as the second argument.

````javascript

function addItemsToGrid(array, itemType) { for (let i = 0; i < array.length; i++) { cells[array[i]].classList.add(itemType) } }

addItemsToGrid(totalCells, wall) addItemsToGrid(balls, items.class)

function addPowerPellet() { addItemsToGrid(powerPellet.cellsWithStone, powerPellet.class) }```

To determine the position of each of the items I added a grid number to each of the divs on the grid and used this to add the trees to the background image in Photoshop.

<img width="964" alt="pokemon-pacman" src="https://lh4.googleusercontent.com/Ht5SM-l1_SvwfI6YMHPNgLAVmCtnmOjzO5-fxI-zpUJd7HrJhnFVso8cMdmFcSi12EdKlhVn2bIbseNAEvNGJ-aY76gunI7WJ16SZysTgNlUfmMb2BREfzbILPBdj7beUehBrYY1">

### Challenges:

When it came to add the logic for the ghosts, I found it hard to add the same logic which calculates the edge divs and restricts the movement to the ghost AI, so I had to add an outer wall class to each of the edge divs, this however created a problem with the positioning of item.

To overcome this I had to rebuild the maze in photoshop and add more cells by making it 20 by 20 as opposed to 10 by 10. Which gave me more than enough space.

### Ghost Movement:

The original Pacman game had 3 different modes for the ghosts.

Chase - Chases Pac-Man. Scatter - Ghost scattered to their designated target (each ghost had their specific target in the four corners of the maze, designed to make them spread out). Frightened - Ghost runs away from Pac-Man.

My intention was to try and replicate this movement, however due to lack of time, the movement of each ghost in my game is randomly selected using Math.random() to select the direction from an array containing up, down, left or right.

## Final Thoughts:

Given we only had one week to make the game, and the fact that I had not made a game before, it was quite a challenge to bring the game to where it is now.

It still has some bugs that only appear every now and then which makes it really hard to test the conditions in which the bugs appear and then fix them.

There were quite a few features I would have liked to introduce such as the warp tunnels and the intelligent movement of the ghosts. I would also like to have made the game responsive. I made the mistake of making the game on a larger monitor, meaning it only works well on a large screen size.

## Key Learnings:

I learned a tremendous amount making this game, combining everything I had learned up until this point about Javascript, HTML and CSS. Particularly DOM manipulation techniques, JS Classes etc.

It was interesting to see how the more I developed the game, the more new bugs would be introduced that I had not thought about. So it was quite a challenge to find and fix these as I went along. I learnt more about why they were introduced making it easier to avoid them next time.

<img width="964" alt="pokemon-pacman" src="https://lh5.googleusercontent.com/-0uKQA5MquiR72xGQVwIOWQmGt3xvKYNyf495MWbPrjIzDkuHtkViX0ZJGSD857KiLnxiz67E8ZR9Yu0cavARWTZ5TTS8LECSwbO2JN1">

<img width="964" alt="pokemon-pacman" src="https://lh4.googleusercontent.com/lCZRhr7DrZ6BnagonqRMrEe8XwE7vkJGyu-08TTbAvHx2cnn5I_LNUaelfqxtgxhwO1p3D91eSUEceeE3G3AfQTuQRlVUr1vnmGpXwVLjiE4VRT5jUAodhNniXOIRe5ri0zLT5Mt">
````
