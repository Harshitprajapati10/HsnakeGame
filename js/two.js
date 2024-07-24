// Game Constants & Variables

let progressboxes = document.getElementsByClassName("colors")
let barToFilled = Array.from(progressboxes);
let notification = document.getElementsByClassName("notification")[0]
barToFilled.forEach((a)=>{
    a.style.backgroundColor = "white"
})

let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 8;
let score = 0;

let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// function createBarColor(number){ //takes a number 1 to 30
    
// }

//function to increase level
function gameBar(number) {
    
    let colorArray = [
        "rgb(83, 178, 39)", //1
        "rgb(41, 178, 39)",
        "rgb(39, 178, 97)",
        "rgb(39, 178, 139)",
        "rgb(39, 178, 173)",
        "rgb(25, 127, 124)",
        "rgb(35, 149, 177)",
        "rgb(43, 142, 223)",
        "rgb(37, 122, 191)",
        "rgb(28, 74, 160)", //10
        "rgb(34, 55, 190)",
        "rgb(26, 42, 146)",
        "rgb(36, 26, 146)",
        "rgb(62, 26, 146)",
        "rgb(58, 24, 136)",
        "rgb(86, 31, 170)",
        "rgb(72, 21, 148)",
        "rgb(91, 21, 148)",
        "rgb(114, 21, 148)",
        "rgb(133, 21, 148)", //20
        "rgb(148, 21, 139)",
        "rgb(148, 21, 112)",
        "rgb(148, 21, 93)",
        "rgb(171, 25, 78)",
        "rgb(141, 21, 65)",
        "rgb(141, 21, 45)",
        "rgb(157, 20, 29)",
        "rgb(134, 17, 25)",
        "rgb(104, 14, 14)",
        "rgb(85, 8, 8)" //30

    ]
    
    if(number<=30){
        for (let i = 0; i < number; i++) {
            barToFilled[i].style.backgroundColor = colorArray[i]
            // console.log(barToFilled[i])
        }
    }

    else if(number >30){
        // console.log("next level")
        notification.innerHTML = `<div class="message">
                <p>DONE!</p>
                <span><a id="nextLevel" href="../index.html">Previous Level</a></span>
            </div> `
        // inputDir =  {x: 0, y: 0}; 
        snakeArr = [{x: 13, y: 15}];
    }
    
    
}

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
        barToFilled.forEach((a)=>{
            a.style.backgroundColor = "white"
        })
        
    }

    // if(snakeArr[0].x <= 1){
    //     snakeArr[0].x = 17;
    // }
    // else if(snakeArr[0].x >= 18){
    //     snakeArr[0].x = 1;
    // }
    // else if( snakeArr[0].y >= 18){
    //     snakeArr[0].y = 1;
    // }
    // else if(snakeArr[0].y <= 1){
    //     snakeArr[0].y = 17;
    // }
    
      

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        gameBar(score)
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});

right.addEventListener("click",()=>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    console.log("ArrowRight");
    inputDir.x = 1;
    inputDir.y = 0;
})
left.addEventListener("click",()=>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    console.log("ArrowRight");
    inputDir.x = -1;
    inputDir.y = 0;
})
up.addEventListener("click",()=>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    console.log("ArrowRight");
    inputDir.x = 0;
    inputDir.y = -1;
})
down.addEventListener("click",()=>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    console.log("ArrowRight");
    inputDir.x = 0;
    inputDir.y = 1;
})
