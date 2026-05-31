let quote = document.getElementById("quote");
let typingArea = document.getElementById("typing-area");

let timer = document.getElementById("timer");
let wpm = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy");

let restartBtn = document.getElementById("restart-btn");

let sound = document.getElementById("typing-sound");

let quotes = [

    "Practice makes perfect",

    "JavaScript is fun to learn",

    "Typing speed improves with practice",

    "Stay focused and keep coding"
];

let time = 45;
let interval;
let started = false;

function loadQuote(){

    let random = quotes[Math.floor(Math.random()*quotes.length)];

    quote.innerHTML = "";

    random.split("").forEach(char=>{

        let span = document.createElement("span");

        span.innerText = char;

        quote.appendChild(span);
    });

    quote.querySelector("span").classList.add("current");

    typingArea.value = "";

    typingArea.focus();
}

function startTimer(){

    interval = setInterval(()=>{

        time--;

        timer.innerText = time;

        if(time <= 0){

            clearInterval(interval);

            typingArea.disabled = true;
        }

    },1000);
}

typingArea.addEventListener("keydown",e=>{

    if(e.key.length === 1 || e.key === "Backspace"){

        sound.currentTime = 0;

        sound.play().catch(()=>{});
    }
});

typingArea.addEventListener("input",()=>{

    if(!started){

        started = true;

        startTimer();
    }

    let typed = typingArea.value;

    let chars = quote.querySelectorAll("span");

    let correct = 0;

    chars.forEach((span,index)=>{

        let char = typed[index];

        span.classList.remove("correct","incorrect","current");

        if(char == null){

        }

        else if(char === span.innerText){

            span.classList.add("correct");

            correct++;
        }

        else{

            span.classList.add("incorrect");
        }
    });

    if(chars[typed.length]){

        chars[typed.length].classList.add("current");
    }

    let minutes = (45 - time)/60;

    let speed = minutes > 0

    ? Math.round((correct/5)/minutes)

    : 0;

    let acc = typed.length > 0

    ? Math.round((correct/typed.length)*100)

    : 100;

    wpm.innerText = speed;

    accuracy.innerText = acc + "%";

    let completed = true;

    chars.forEach(span=>{

        if(!span.classList.contains("correct")){

            completed = false;
        }
    });

    if(completed && typed.length === chars.length){

        loadQuote();
    }
});

restartBtn.addEventListener("click",()=>{

    clearInterval(interval);

    time = 45;

    timer.innerText = 45;

    wpm.innerText = 0;

    accuracy.innerText = "100%";

    started = false;

    typingArea.disabled = false;

    loadQuote();
});

window.onload = ()=>{

    loadQuote();

    typingArea.focus();
};

document.addEventListener("click",()=>{

    typingArea.focus();
});