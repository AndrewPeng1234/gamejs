import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// start the game
kaboom({
    background: [20, 20, 40]
});

let speed = 320;
let momentum = 0;
const decelerationFactor = 0.23;
const gravity = 1900

scene("level_1", () => {
    // define gravity
    setGravity(gravity);

    // load a default sprite
    loadBean();

    // add character to screen, from a list of components
    const player = add([
        sprite("bean"),  // renders as a sprite
        pos(120, 80),    // position in world
        area(),          // has a collider
        body(),          // responds to physics and gravity
        {
            speed: speed,
            momentum: momentum,
        },
        "player"
    ]);

    add([
        rect(width(), 40),
        pos(0, height() - 40),
        area(),
        body({ isStatic: true }),
        color(0, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(250, height() - 100),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(435, height() - 190),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(635, height() - 295),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(835, height() - 400),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(1030, height() - 505),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(1200, height() - 595),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    const moon = add([
        circle(58),
        pos(width() - 250, 130),
        color(255, 255, 255),
        area()
    ]);

    // jump when player presses "space" key
    onKeyDown("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onKeyDown("up", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onKeyDown("left", () => {
        player.momentum = -speed;
    });

    onKeyDown("right", () => {
        player.momentum = speed;
    });

    // Update player speed based on momentum in the game loop
    onUpdate(() => {
        if (player.momentum !== 0) {
            player.move(player.momentum, 0);
            player.momentum -= player.momentum * decelerationFactor;
            if (Math.abs(player.momentum) < 0.75) {
                player.momentum = 0;
            }
        }
    });

    moon.onCollide("player", () => {
        go("level_2");
    });

});

go("level_1");

scene("level_2", () => {
    setGravity(gravity);

    // load a default sprite
    loadBean();

    const speed = 320;

    // add character to screen, from a list of components
    const player = add([
        sprite("bean"),  // renders as a sprite
        pos(200, 80),    // position in world
        area(),          // has a collider
        body(),          // responds to physics and gravity
        "player"
    ]);

    // lava
    const lava = add([
        rect(width(), 40),
        pos(0, height() - 40),
        area(),
        body({ isStatic: true }),
        color(255, 87, 51),
    ]);

    add([
        rect(100, 20),
        pos(150, height() - 300),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(335, height() - 190),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(535, height() - 90),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(735, height() - 190),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(900, height() - 295),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(1050, height() - 400),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(1135, height() - 505),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(1200, height() - 630),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    const moon = add([
        circle(85),
        pos(width() - 250, 130),
        color(255, 255, 255),
        area(),
    ]);

    // jump when player presses "space" key
    onKeyDown("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onKeyDown("up", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onKeyDown("left", () => {
        player.momentum = -speed
    });

    onKeyDown("right", () => {
        player.momentum = speed
    });

    onUpdate(() => {
        if (player.momentum !== 0) {
            player.move(player.momentum, 0);
            player.momentum -= player.momentum * decelerationFactor;
            if (Math.abs(player.momentum) < 0.75) {
                player.momentum = 0;
            }
        }
    });

    moon.onCollide("player", () => {
        go("win")
    });
    
    lava.onCollide("player", () => {
        go("gameOver")
    })

});

scene("gameOver", () => {
    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    add([
        text("Game Over!"),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center")
    ]);
});

scene("win", () => {
    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    add([
        text("You Win!"),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center")
    ]);
});

scene("level_3", () => {
    setGravity(gravity);

    // load a default sprite
    loadBean();

    const speed = 320;

    // add character to screen, from a list of components
    const player = add([
        sprite("bean"),  // renders as a sprite
        pos(120, 80),    // position in world
        area(),          // has a collider
        body(),          // responds to physics and gravity
        "player"
    ]);

    add([
        rect(width(), 40),
        pos(0, height() - 40),
        area(),
        body({ isStatic: true }),
        color(0, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(250, height() - 100),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(435, height() - 190),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(635, height() - 295),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(835, height() - 400),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(1030, height() - 505),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    add([
        rect(100, 20),
        pos(1200, height() - 595),
        area(),
        body({ isStatic: true }),
        color(255, 255, 0)
    ]);

    const moon = add([
        circle(85),
        pos(width() - 250, 130),
        color(255, 255, 255),
        area()
    ]);

    // jump when player presses "space" key
    onKeyDown("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onKeyDown("up", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onKeyDown("left", () => {
        player.momentum = -speed;
    });

    onKeyDown("right", () => {
        player.momentum = speed;
    });

    onUpdate(() => {
        if (player.momentum !== 0) {
            player.move(player.momentum, 0);
            player.momentum -= player.momentum * decelerationFactor;
            if (Math.abs(player.momentum) < 0.75) {
                player.momentum = 0;
            }
        }
    });

    //moon.onCollide("player", ()=>{
    //    go("level_4")
    //});
});
