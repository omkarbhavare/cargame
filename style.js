const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gamingZone = document.querySelector('.gamingZone');



let keys = {
    ArrowUp: false,     // All keys are set false so that after pressing any key only that name becomes true all vehivle to move in one direction at a time
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {speed:8}
if(score<100){
    player.speed=8;
}else if(score >100 && score <200){
    player.speed=20;
}else{
    player.speed=50;
}

document.addEventListener('keydown', keyDown);  //keydown-->when key is pressed
document.addEventListener('keyup', keyUp);      //keyUp-->when pressed key is released
function keyDown(e) {   //e represents event
    e.preventDefault();  //event.key-->representing the pressed keyboard button. In this case ArrowDown
    keys[e.key] = true;     //value of pressed key becomes true
    console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;     //value of pressed key becomes false
    console.log(keys);
}




startScreen.addEventListener('click', start);

function gamePlay() {
    let car= document.querySelector('.car');
    let road = gamingZone.getBoundingClientRect(); //returns the size of an element and its position relative to the viewport
   

    if (player.start){
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y >(road.top)){player.y -=  player.speed ; }
        if(keys.ArrowDown && player.y<(road.height -70)){player.y += player.speed  ; }
        if(keys.ArrowLeft && player.x > 0){player.x -=  player.speed ; }
        if(keys.ArrowRight && player.x < (road.width-50)){player.x += player.speed  ; }

        car.style.top = player.y+"px";
        car.style.left = player.x+"px";
        window.requestAnimationFrame(gamePlay);
        
        let finalscore=(Math.floor(player.score++/10));
        score.innerText="Score:" + finalscore;
        if(finalscore<100){
            player.speed=7;
        }else if(finalscore >101 && finalscore <200){
            player.speed=8;
        }else if(finalscore >201 && finalscore <400){
            player.speed=9;
        }else if(finalscore >401 && finalscore <600){
            player.speed=10;
        }else if(finalscore >601 && finalscore <800){
            player.speed=11;
        }else if(finalscore >801 && finalscore <1000){
            player.speed=12;
        }else{
            player.speed=13;
        }
    }
}


function start() {
     //classList property returns the CSS classnames of an element.  //removing hide class from gamingzone
    startScreen.classList.add('hide');   //hiding startscreen Element     //hide is CSS Element
    gamingZone.innerHTML="";
    player.start = true; //Making player ready to play
    player.score=0;

    
    for(x=0;x<5 ;x++){
        let roadLine =document.createElement('div');
    roadLine.setAttribute("class",'lines');
    roadLine.y=(x*145)+5;
    roadLine.style.top=roadLine.y +"px";
    gamingZone.appendChild(roadLine);
    }


    

    window.requestAnimationFrame(gamePlay)

    let car=document.createElement('div');  //Creates an element
    car.setAttribute('class','car');        //element.setAttribute(name, value)
    
    gamingZone.appendChild(car);   //appends(adds) a node-element(i.e. car) as the last child of an element(i.e. gamingzone).

    player.x=car.offsetLeft;        //SettingUp x & y properties in player object
    player.y=car.offsetTop;         //offsetTop property returns the top position (in pixels) relative to the parent


    for(x=0;x<4 ;x++){
        
    let enemyCar =document.createElement('div');
    enemyCar.setAttribute("class",'enemy');
    enemyCar.y=((x+1)*350)  *  -1;
    enemyCar.style.top=enemyCar.y +"px";
    enemyCar.style.backgroundColor='transparent';
    enemyCar.style.left=Math.floor(Math.random()*350)+"px";
    gamingZone.appendChild(enemyCar);
   
    }

}


function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >=700){
            item.y -= 750
        }
     item.y+= player.speed;
     item.style.top =item.y +"px";
     
    })
    
}
function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){

        if(isCollide(car,item)){
            
            endGame();
        }



        if(item.y >=700){
            item.y = -200;
            item.style.left=Math.floor(Math.random()*350)+"px";  
        }
     item.y+= player.speed;
     item.style.top =item.y +"px";
     
    })
    
}

function isCollide(a,b){     //a-->postion of our car  b-->position of enemy car
     aRect= a.getBoundingClientRect();
     bRect=b.getBoundingClientRect();

     return !((aRect.top+4 > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right-15 < bRect.left)
               || (aRect.left > bRect.right))

            
               
}

function endGame(){
    player.start=false;
    startScreen.classList.remove('hide'); 
   
    
    
}