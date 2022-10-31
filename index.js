"use strict";
/**
 * Unchangable configuration variables
 */
const c = Object.freeze({
    emptySpace: ' ',
    wall: '#',
    enemy: 'X',
    gateHorizontal: "\"",
    gateVertical: "=",
    boardWidth: 80,
    boardHeight: 24,
})

/**
 * The state of the current game
 */
let GAME = {
    currentRoom: "",
    board: [],
    map: {},
    player: {},
}

/**
 * Create a new player Object
 * 
 * @param {string} name name of the player
 * @param {string} race race of the player
 * @returns 
 */
function initPlayer(name, race) {
    
    return {
        x: 15,
        y: 15,
        name: name,
        icon: '@',
        race: race,
        health: 100,
        attack: 1,
        defense: 1,
        isPlayer: true,
    }
}

/**
 * List of the 4 main directions
 */
const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]

/**
 * Enum for the rooms
 */
const ROOM = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
}

/**
 * Icon of the enemies
 */
const ENEMY = {
    // RAT: "r",
}

/**
 * Info of the enemies
 */
const ENEMY_INFO = {
    // [ENEMY.RAT]: { health: 10, attack: 1, defense: 0, icon: ENEMY.RAT, race: "Rat", isBoss: false },
}

/**
 * Initialize the play area with starting conditions
 */
function init() {
    GAME.currentRoom = ROOM.A
    GAME.map = generateMap()
    GAME.board = createBoard(c.boardWidth, c.boardHeight, c.emptySpace)
    GAME.player = initPlayer(GAME.player.name, GAME.player.race)
    drawScreen()
    console.log(GAME.player);
}

/**
 * Initialize the dungeon map and the items and enemies in it
 */
function generateMap() {
    return {
        [ROOM.A]: {
            layout: [10, 10, 20, 20],
            gates: [
                { to: ROOM.B, 
                x: 20, 
                y: 15, 
                icon: c.gateVertical, 
                playerStart: { x: 7, y: 15 } 
            },
            ],
            enemies: [],
            items: []
        },
        [ROOM.B]: {
            layout: [13, 20, 17, 70],
            gates: [
                 { to: ROOM.A, 
                    x: 6, 
                    y: 15, 
                    icon: c.gateHorizontal, 
                    playerStart: { x: 19, y: 15 } },
            ],
            enemies: [
                // { type: ENEMY.RAT, x: 25, y: 15, name: "Rattata", ...ENEMY_INFO[ENEMY.RAT] },
            ],
            items: []
        },
    }
}

/**
 * Display the board on the screen
 * @param {*} board the gameplay area
 */
 function displayBoard(board) {
    let screen = "" // ...
    board.forEach((row)=>{
        row.forEach((element)=>{
            screen+=element;
        });
        screen+="\n";
    });
    _displayBoard(screen)

}

/**
 * Draw the rectangular room, and show the items, enemies and the player on the screen, then print to the screen
 */
function drawScreen() {
    // ... reset the board with `createBoard`
    // ... use `drawRoom`
        drawRoom(GAME.board,GAME.map.A.layout[0],GAME.map.A.layout[1],GAME.map.A.layout[2],GAME.map.A.layout[3],GAME.map.A.gates)
        //drawRoom(GAME.board,GAME.map.B.layout[0],GAME.map.B.layout[1],GAME.map.B.layout[2],GAME.map.B.layout[3],GAME.map.B.gates)
    // ... print entities with `addToBoard`
    addToBoard(GAME.board,GAME.player)
    console.log(GAME.board);
    displayBoard(GAME.board)
}

/**
 * Implement the turn based movement. Move the player, move the enemies, show the statistics and then print the new frame.
 * 
 * @param {*} yDiff 
 * @param {*} xDiff 
 * @returns 
 */
function moveAll(yDiff, xDiff) {
    // ... use `move` to move all entities
    // ... show statistics with `showStats`
    // ... reload screen with `drawScreen`
}

/**
 * Implement the movement of an entity (enemy/player)
 * 
 * - Do not let the entity out of the screen.
 * - Do not let them mve through walls.
 * - Let them visit other rooms.
 * - Let them attack their enemies.
 * - Let them move to valid empty space.
 * 
 * @param {*} who entity that tried to move
 * @param {number} yDiff difference in Y coord
 * @param {number} xDiff difference in X coord
 * @returns 
 */
function move(who, yDiff, xDiff) {
    // ... check if move to empty space
    // ... check if hit a wall
    // ... check if move to new room (`removeFromBoard`, `addToBoard`)
    // ... check if attack enemy
    // ... check if attack player
    //     ... use `_gameOver()` if necessary
}

/**
 * Check if the entity found anything actionable.
 * 
 * @param {*} board the gameplay area
 * @param {*} y Y position on the board
 * @param {*} x X position on the board
 * @returns boolean if found anything relevant
 */
function hit(board, y, x) {
    // ...
}

/**
 * Add entity to the board
 * 
 * @param {*} board the gameplay area
 * @param {*} item anything with position data
 * @param {string} icon icon to print on the screen
 */
function addToBoard(board, item) {
    // ...
    board[item.x][item.y]=item.icon;
}

/**
 * Remove entity from the board
 * 
 * @param {*} board the gameplay area
 * @param {*} item anything with position data
 */
function removeFromBoard(board, item) {
    // ...
}

/**
 * Create the gameplay area to print
 * 
 * @param {number} width width of the board
 * @param {number} height height of the board
 * @param {string} emptySpace icon to print as whitespace
 * @returns 
 */
function createBoard(width, height, emptySpace) {
    // ...
    let matrix=[];
    for(let i=0;i<height;i++){
        matrix[i]=[];
        for(let j=0;j<width;j++)
        matrix[i][j]=emptySpace;
    }
    return matrix;
}

/**
 * Draw a rectangular room
 * 
 * @param {*} board the gameplay area to update with the room
 * @param {*} topY room's top position on Y axis
 * @param {*} leftX room's left position on X axis
 * @param {*} bottomY room's bottom position on Y axis
 * @param {*} rightX room's right position on X axis
 */
function drawRoom(board, topY, leftX, bottomY, rightX,allGates) {
    // ...
        for(let j=leftX;j<=rightX;j++){
            board[topY][j]=c.wall;
            board[bottomY][j]=c.wall;
        }

        for(let j=topY;j<=bottomY;j++){
            board[j][leftX]=c.wall;
            board[j][rightX]=c.wall;
        }
        for(let i=0;i<allGates.length;i++){
            board[allGates[i].x][allGates[i].y]=allGates[i].icon;
        }

    
}

/**
 * Print stats to the user
 * 
 * @param {*} player player info
 * @param {array} enemies info of all enemies in the current room
 */
function showStats(player, enemies) {
    const playerStats = "" // ...
    const enemyStats = "" // ... concatenate them with a newline
    _updateStats(playerStats, enemyStats)
}

/**
 * Update the gameplay area in the DOM
 * @param {*} board the gameplay area
 */
function _displayBoard(screen) {
    document.getElementById("screen").innerText = screen
}

/**
 * Update the gameplay stats in the DOM
 * 
 * @param {*} playerStatText stats of the player
 * @param {*} enemyStatText stats of the enemies
 */
function _updateStats(playerStatText, enemyStatText) {
    const playerStats = document.getElementById("playerStats")
    playerStats.innerText = playerStatText
    const enemyStats = document.getElementById("enemyStats")
    enemyStats.innerText = enemyStatText
}

/**
 * Keep a reference of the existing keypress listener, to be able to remove it later
 */
let _keypressListener = null

/**
 * Code to run after the player ddecided to start the game.
 * Register the movement handler, and make sure that the boxes are hidden.
 * 
 * @param {function} moveCB callback to handle movement of all entities in the room
 */
function _start(moveCB) {
    const msgBox = document.getElementById("startBox")
    const endBox = document.getElementById("endBox")
    endBox.classList.add("is-hidden")
    GAME.player.name = document.getElementById("playerName").value
    GAME.player.race = document.getElementById("playerRace").value
    msgBox.classList.toggle("is-hidden")
    _keypressListener = (e) => {
        let xDiff = 0
        let yDiff = 0
        switch (e.key.toLocaleLowerCase()) {
            case 'w': { yDiff = -1; xDiff = 0; break; }
            case 's': { yDiff = 1; xDiff = 0; break; }
            case 'a': { yDiff = 0; xDiff = -1; break; }
            case 'd': { yDiff = 0; xDiff = 1; break; }
        }
        if (xDiff !== 0 || yDiff !== 0) {
            moveCB(yDiff, xDiff);
        }
    }
    document.addEventListener("keypress", _keypressListener)
    init();
}

/**
 * Code to run when the player died.
 * 
 * Makes sure that the proper boxes are visible.
 */
function _gameOver() {
    const msgBox = document.getElementById("startBox")
    msgBox.classList.add("is-hidden")
    const endBox = document.getElementById("endBox")
    endBox.classList.remove("is-hidden")
    if (_keypressListener) {
        document.removeEventListener("keypress", _keypressListener)
    }
}

/**
 * Code to run when the player hits restart.
 * 
 * Makes sure that the proper boxes are visible.
 */
function _restart() {
    const msgBox = document.getElementById("startBox")
    msgBox.classList.remove("is-hidden")
    const endBox = document.getElementById("endBox")
    endBox.classList.add("is-hidden")
    init()
}
