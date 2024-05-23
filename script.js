import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// start the game
kaboom({
    background: (40, 40, 40)
})

// define gravity
setGravity(1950)

// load a default sprite
loadBean()

const speed = 320

add([
    rect(width(), 40),
    pos(0, height()-40),
    area(),
    body({isStatic: true}),
    color(0, 255, 0)
])

add([
    rect(100, 20),
    pos(250, height()-100),
    area(),
    body({isStatic: true}),
    color(255, 255, 0)
])

add([
    rect(100, 20),
    pos(435, height()-190),
    area(),
    body({isStatic: true}),
    color(255, 255, 0)
])

add([
    rect(100, 20),
    pos(635, height()-295),
    area(),
    body({isStatic: true}),
    color(255, 255, 0)
])

add([
    rect(100, 20),
    pos(835, height()-400),
    area(),
    body({isStatic: true}),
    color(255, 255, 0)
])

add([
    rect(100, 20),
    pos(1035, height()-505),
    area(),
    body({isStatic: true}),
    color(255, 255, 0)
])

add([
    rect(100, 20),
    pos(1125, height()-595),
    area(),
    body({isStatic: true}),
    color(255, 255, 0)
])


add([
    circle(85),
    pos(width()-200, 130),
    color(255, 255, 255)
])

// add character to screen, from a list of components
const player = add([
    sprite("bean"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    body()          // responds to physics and gravity
])

// jump when player presses "space" key
onKeyDown("space", () => {
    if (player.isGrounded()){
        player.jump()
    }
})

onKeyDown("up", () => {
    if (player.isGrounded()){
        player.jump()
    }
})

onKeyDown("left", () => {
    player.move(-speed, 0)
})

onKeyDown("right", () => {
    player.move(speed, 0)
})