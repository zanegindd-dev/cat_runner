let catElement = document.querySelector('.cat');
let container = document.querySelector('.main_line');
let box = document.querySelector('.box');


class GameElement{
  element;
  container;

  get left(){
    return this.element.offsetLeft;
  }

  get top(){
    return this.element.offsetTop;
  }

  get width(){
    return this.element.offsetWidth;
  }

  get width(){
    return this.element.offsetWidth;
  }

  get height(){
    return this.element.offsetHeight;
  }

  setBottom(bottom) {
    this.element.style.bottom = `${bottom}px`;
  }

  setLeft(left){
    this.element.style.right = `${left}px`;
  }
}

class Cat extends GameElement{  
  isJumping = false;
  jumpLastTime = null;
  direction = 1;

  constructor(element, container){
    super();
    this.element = element;
    this.container = container;  
    
    this.jumpAnimation = this.jumpAnimation.bind(this);
  }
  
  checkCollision(box){
    return (this.left < box.left && this.left + this.width > box.left) 
      
      && this.top + this.height > box.top;
  }
  
  startJump(){
    if(this.isJumping || isGameover){
      return;
    }

    this.isJumping = true;
    this.direction = 1;
    this.jumpLastTime = null;
    requestAnimationFrame(this.jumpAnimation);	
  }

  jumpAnimation(currentTime){
    if(!this.isJumping || isGameover){
      return;
    }

    if(!this.jumpLastTime){
      this.jumpLastTime = currentTime;
    }

    let currentBottom = parseFloat(this.element.style.bottom);
    if(!currentBottom){
      currentBottom = 0;
    }

    if(this.direction < 0 && currentBottom <= 0){
      this.setBottom(0);
      this.isJumping = false;
      this.jumpLastTime = null;
      return;
    }

    if(currentBottom > 50 * 5.2){
      this.direction = -1;
    }

    let deltaTime = currentTime - this.jumpLastTime;
    this.setBottom(currentBottom + this.direction*0.2*deltaTime*speed);
    requestAnimationFrame(this.jumpAnimation);	
  }
}

class Box extends GameElement{
  constructor(container, imgPath){
    super();

    this.container = container;
    this.element = document.createElement('img');
    this.element.classList.add('box');
    this.element.src = imgPath;
    this.element.style.right = 0;

    this.container.append(this.element);
  }

  move(deltaTime){
    let currentRight = parseFloat(this.element.style.right); 

    if(currentRight > containerWidth || !currentRight){
      currentRight = 0;
    }

    this.element.style.right = (currentRight + deltaTime*speed) + 'px';
  }
}

let containerWidth = container.offsetWidth;

let isGameover = false;
let cat = new Cat(catElement, container);

let boxes = [];
let images = ["img/box.png", "img/mouse.png", "img/flower.png", "img/boot.png"];

let startGame = true;
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    console.log('Пробел нажат');
    cat.startJump(); 
    
    if(startGame){
      for (let i = 0; i < 3; i++) {
          setTimeout(() => {
              const imgPath = images[Math.floor(Math.random() * images.length)];
              boxes.push(new Box(container, imgPath));
          }, i * 3000);
      }
      startGame = false;
    }

    
    requestAnimationFrame(animation);	
  }
});

let speed = 0.2;
let lastTime;
let intervalId;
function animation(currentTime){
  if(isGameover)
  {
    return;
  }
  if(!lastTime){
    lastTime = currentTime;
    intervalId = setInterval(updateCount, 500);
  }

  let deltaTime = currentTime - lastTime;
  
  lastTime = currentTime;
  
  for(let b of boxes){
    b.move(deltaTime);

    if(cat.checkCollision(b)){
      stopGame();
      return;
    }  
  }

  requestAnimationFrame(animation);
}

function stopGame(){
  isGameover = true;
  clearInterval(intervalId);
  let gameover = document.querySelector('.gameover') ;
  gameover.style.display = 'block';

}


let count = 0; 
function updateCount(){
  count++;
  let messege = document.querySelector('.count');
  messege.textContent = `${count}`;
}

// let isJumping = false;
// let direction  = 1;
// let jumpLastTime = null;
// function startJump(){
//   if(isJumping || isGameover){
//     return;
//   }

//   isJumping = true;
//   direction = 1;
//   jumpLastTime = null;
//   requestAnimationFrame(jumpAnimation);	
// }

// function jumpAnimation(currentTime){
//   if(!isJumping || isGameover){
//     return;
//   }

//   if(!jumpLastTime){
//     jumpLastTime = currentTime;
//   }

//   let currentBottom = parseFloat(cat.style.bottom);
//   if(!currentBottom){
//     currentBottom = 0;
//   }

//   if(direction < 0 && currentBottom <= 0){
//     setCatBottom(0);
//     isJumping = false;
//     jumpLastTime = null;
//     return;
//   }

//   if(currentBottom > box.offsetHeight * 9.2){
//     direction = -1;
//   }

//   let deltaTime = currentTime - jumpLastTime;
//   setCatBottom(currentBottom + direction*0.2*deltaTime*speed);
//   requestAnimationFrame(jumpAnimation);	
// }


// function setCatBottom(bottom){
//    cat.style.bottom = `${bottom}px`;  
// }

// function getSize(element){
//   let left = element.offsetLeft;
//   let top = element.offsetTop;
  
//   let width = element.offsetWidth;

//   let height = element.offsetHeight;

//   return {top: top, left: left, width: width, height: height};
// }

// function checkCollision(cat, box){
//   return (cat.left < box.left && cat.left + cat.width > box.left) && cat.top + cat.height > box.top;
// }
