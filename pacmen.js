var pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

const pacMen = [];


function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan
function makePac() {
  // returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(100);
  let position = setToRandom(300);
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  let direction = new Boolean(false);
  let focus = 0;
  newimg.style.position = 'absolute';
  newimg.src = pacArray[Number(direction)][focus];
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);
  // new style of creating an object
  return {
    position,
    velocity,
    newimg,
    direction,
    focus
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.focus = (item.focus + 1) % 2;
    item.focus = item.focus;
    item.direction = item.direction;
    //item.newimg.focus = (item.newimg.focus + 1) % 2;
    item.newimg.src = pacArray[Number(item.direction)][item.focus];
    //item.newimg.src = pacArray[Number(item.newimg.direction)][item.newimg.focus];
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 200);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ){
    item.velocity.x = -item.velocity.x;
    if(item.velocity.x <0) item.direction = 1
    else item.direction = 0;
    item.direction = item.direction;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
