const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");


let timer,
maxTime = 60,
timeLeft = maxTime,
 charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus())
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
    if(!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
    }
    //if user hasn't entered any character or pressed backspace
    if(typedChar == null) {
       charIndex--; //decrement charIndex
       //if user hasn't decrement mistake only if the charIndex span contains incorrect class
       if(characters[charIndex].classList.contains("incorrect")) {
           mistakes--;
       }
       characters[charIndex].classList.remove("correct", "incorrect");
    }else{
    if(characters[charIndex].innerHTML === typedChar) {
       //if user typed charachter and shown character  matched then add the
       //correct class else increment the mistakes and add the incorrect class
        characters[charIndex].classList.add("correct");
    }
    else{
        // console.log("incorrect");
        mistakes++;
        characters[charIndex].classList.add("incorrect");
    }

    // console.log(typeChar);
    charIndex++;  //increment charIndex either user typed correct or incorrect character
}
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

   let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    // wpm = wpm < 0 || !wpm  || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerHTML = mistakes;
    wpmTag.innerHTML = wpm;
    cpmTag.innerHTML = charIndex - mistakes;
}else{
    inpField.value = "";
clearInterval(timer);
}
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerHTML = timeLeft
    }else{
        clearInterval(timer);
    }
}


function resetGame() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerHTML = timeLeft;
    mistakeTag.innerHTML = mistakes;
    wpmTag.innerHTML = 0;
    cpmTag.innerHTML = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);