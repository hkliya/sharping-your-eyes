function start() {
  var renderer = PIXI.autoDetectRenderer();
  renderer.backgroundColor = 0x061639;
  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.autoResize = true;
  renderer.resize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.view);

  var stage = new PIXI.Container();
  PIXI.loader.add("images/cat.png").load(setup);

  let cat;
  let state = play;
  function setup () {
    cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);
    stage.addChild(cat);

    gameLoop();
    updatePosition();
  }

  let i = 0;
  function updatePosition() {
    i = (i + 1) % 4;
    setTimeout(updatePosition, 1000 - Math.random() * 500);
  }

  function gameLoop() {
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
  }

  function play () {
    let positions = {
      topLeft: {
        x: 0,
        y: 0
      },
      topRight: {
        x: renderer.view.width - cat.width,
        y: 0
      },
      bottomLeft: {
        x: 0,
        y: renderer.view.height - cat.height
      },
      bottomRight: {
        x: renderer.view.width - cat.width,
        y: renderer.view.height - cat.height
      }
    };
    let nextPosition = [positions.topLeft, positions.topRight, positions.bottomLeft, positions.bottomRight][i];
    cat.position.set(nextPosition.x, nextPosition.y);
  }
}

