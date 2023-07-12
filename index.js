let inputDir={x:0, y:0};
const foodSound=new Audio('foodsound.mp3');
const gameoverSound=new Audio('gameoversound.mp3');
const moveSound= new Audio('Harry Potter Theme.mp3');
const musicSound=new Audio('music.mp3');
let speed=20 ;
let score=0;
let lastpainttime=0;
let Snakearr=[
    {x:13, y:15}
]
food={x:6, y:7};
//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastpainttime)/1000 <1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
}
function iscollide(snake){
    //if you bump into yourself
    for(let i=1; i<Snakearr.length; i++){
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
        return true;
    }
}
//if you bump into the wall
if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
    return true;

}
}

function gameEngine(){
    //part 1:updating the snake aray and food
    if(iscollide(Snakearr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir={x:0, y:0};
        alert("Game Over.Press any key to play again!");
        Snakearr=[{x:13, y:15}];
        musicSound.play();
        score=0;
    }

    //when food is eaten, increment the score and regenerate the food
    if(Snakearr[0].y===food.y && Snakearr[0].x===food.x){
        foodSound.play();
        score +=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="High Score:" +hiscoreval;

        }
        scorebox.innerHTML= "Score:"+ score;
        Snakearr.unshift({x:Snakearr[0].x + inputDir.x, y:Snakearr[0].y+ inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}

    }
    //moving the snake
    for(let i=Snakearr.length-2; i>=0; i--){
        Snakearr[i+1]={...Snakearr[i]};
    }
    Snakearr[0].x +=inputDir.x;
    Snakearr[0].y +=inputDir.y; 


    //part 2:display the snake and food

    //display the snake
    board.innerHTML="";
    Snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });

    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

 
}
//mainlogicof the game

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="High Score:" +hiscore;
}






window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={x:0, y:-1} //Start the game
    moveSound.play();
    switch(e.key){
        case"ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;
        case"ArrowDown":
        console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;
        case"ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x=-1;
        inputDir.y=0;
        break;
        case"ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
        break;
        default:
            break;
    }
})

