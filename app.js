let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');
let btns = ['red','yellow','green','purple'];

document.addEventListener("keypress",function(){
    // console.dir(event);
    if(started == false){
        // console.log("Game started...");     
        started = true;
        setTimeout(function(){
            h2.innerText = `Game is starting...`;
        },500);
        setTimeout(function(){
            levelUp();
        },2000);

    }
});

function flashBtn(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}


function userPressedBtn(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    },250);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random()*4);
    let randomColor = btns[ranIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    // console.log(ranIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
    // console.log(gameSeq);

    flashBtn(randomBtn);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}



function checkAnswer(idx){
    // console.log(`level = ${level}`);
    // let idx = level-1;
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000); 
        }
    }else{

        h2.innerHTML = `Game Over! Your score was <b> ${level} </b> <br> Press any key to restart...`;
        

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        
        reset();
    }
    
}



function pressBtn(){
    // console.log("Btn has been pressed");
    let btn = this;
    userPressedBtn(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length-1);
}


let allBtns = document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',pressBtn);
}




