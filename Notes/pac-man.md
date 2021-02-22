![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Pac Man

![pac-man](https://media.git.generalassemb.ly/user/15120/files/da59cd00-fec9-11e8-8c61-9724060c10c6)

Pac Man is a classic arcade game from the 80s. The player aims eat all the food in a maze whilst being hunted by ghosts.

If the player eats special flashing food the ghosts start to flash and can now be captured by the player, sending them back to their holding pen, from where they can once again start to hunt the player.

The aim is to achieve the highest score possible before being killed by the ghosts.

## Resources

- [Pac-Man Arcade gameplay - Youtube](https://www.youtube.com/watch?v=uswzriFIf_k)
- [Pac-Man - Wikipedia](https://en.wikipedia.org/wiki/Pac-Man)

## Requirements

- The player should be able to clear at least one board
- The player's score should be displayed at the end of the game

## Suggested enhancements

- Responsive design
- Each board gets more difficult
- Persistent leaderboard using `localStorage`

## Challenges

The biggest challenge here is the logic which moves the ghosts. While their movement may appear random, they are always moving toward Pac Man, who is himself being moved by the player.

## Tips

- Make sure you spend plenty of time planning _before_ you start coding
- Make sure you understand all of the rules of the game
- Make a checklist of all the features you want to add to the game
- Keep It Stupid Simple
- Refactor your code as you go
- Make sure you have a good idea of what your MVP is and only add extra features once you have achieved it
- Do just enough styling to get started, then once you have your MVP polish up the styling before moving on

## Pacman Rules

## MVP

- Pac-Man is a maze chase video game; the player controls the eponymous character through an enclosed maze.

* The first step will be to generate the maze based on the for loop/ array structure DONE
* I will create a rough drawing of the maze to use as a background for the grid container DONE
* Next I will then create functionality to add the player in and move around without going off the grid DONE
* The next step will be to add a class of wall to all of the walls in the maze to all of the grid items by storing them in an array maybe and maybe using a forEach()
* Add to the player movement logic the inability to move through the walls

- The objective of the game is to eat all of the dots placed in the maze

* Once the maze is done I will know which grid items to place the class of .dot and will populate each grid item that needs one as the dot is generated
* I will create a remove dot function that removes the dot and adds to the scoreboard (which I will also need to create)
* I need to create conditional logic to call remove dot if the player pacman is added to the same cell
* I need to create some logic that will change the image of pacman being used depending on what direction he is moving ( maybe store this in an object)

- while avoiding four colored ghosts — Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange) —that pursue him.

* I will need to create the four ghosts and store them in an object to call them easily
* I will need to create 4 different predetermined movement paths irellevant of Pacman for the MVP

- When all of the dots are eaten, the player advances to the next level.

* In the MVP the next level will simply be a unit of 1 added to level without any material changes to difficulty

- If Pac-Man makes contact with a ghost, he will lose a life; the game ends when all lives are lost.

* I will create a lives let life = 3
* I will make a function that is called when either one of the 4 ghost classes is in the same grid as pacman
* the function will remove a life and reset the position of pacman and the ghosts to the starting position
* I will create a function so that when lives = 0, it overlays the screen with game over and clears the interval and starts again

## Next steps from MVP onwards

- Add my theme of Pokemon to the characters and the maze

https://projectpokemon.org/home/docs/spriteindex_148/3d-models-generation-1-pok%C3%A9mon-r90/

- Add sounds to all of the actions
- Add some animations to make the movement of chars look smooth
- Create the personalities for the ghosts like below

Each of the four ghosts have their own unique, distinct artificial intelligence (A.I.), or "personalities"; Blinky gives direct chase to Pac-Man, Pinky and Inky try to position themselves in front of Pac-Man, usually by cornering him, and Clyde will switch between chasing Pac-Man and fleeing from him.

- If this is all done successfully I will try and add

To the sides of the maze are two "warp tunnels", which allow Pac-Man and the ghosts to travel to the opposite side of the screen.

And if I have time I will try add the rest of the functionality below

/////////////////////////////////////////

Placed at the four corners of the maze are large flashing "energizers", or "power pellets". Eating these will cause the ghosts to turn blue with a dizzied expression and reverse direction.

Pac-Man can eat blue ghosts for bonus points; when eaten, their eyes make their way back to the center box in the maze, where the ghosts are "regenerated" and resume their normal activity.

Eating multiple blue ghosts in succession increases their point value.

After a certain amount of time, blue-colored ghosts will flash white before turning back into their normal, lethal form. Eating a certain number of dots in a level will cause a bonus item, usually in the form of a fruit, to appear underneath the center box, which can be eaten for bonus points.

The game increases in difficulty as the player progresses; the ghosts become faster and the energizers' effect decreases in duration, to the point where the ghosts will no longer turn blue and edible.

Ghosts become slower when entering and exiting these tunnels. Levels are indicated by the fruit icon at the bottom of the screen. In-between levels are short cutscenes featuring Pac-Man and Blinky in humorous, comical situations
