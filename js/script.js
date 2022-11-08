const form = document.getElementById("login-form");
const sname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
/*
window.onload = function () {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let x = checkInputs();
        alert(form.action);
        return x;
    });
}
*/
function checkInputs() {
    let nameValue = sname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let x = 0;
    if (nameValue == '') {
        setErrorFor(sname, "Name cannot be blank");
    }
    else {
        setSuccessFor(sname);
        x = x + 1;
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email ID cannot be blank');
    } else if (!validateEmail(emailValue)) {
        setErrorFor(email, 'Not valid Email ID');
    } else {
        setSuccessFor(email);
        x = x + 1;
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else if (!isPassten(passwordValue)) {
        setErrorFor(password, 'Password should contain more than 8 letters and less than 20 characters');
    } else {
        setSuccessFor(password);
        x = x + 1
    }

    if (x == 3) {
        return true;
    }
    else {
        return false;
    }
}

function setErrorFor(input, msg) {
    const formOutline = input.parentElement;
    const small = formOutline.querySelector('small');
    small.innerText = msg;
    formOutline.className = 'form-outline mb-4 error';
}

function setSuccessFor(input) {
    const formOutline = input.parentElement;
    formOutline.className = 'form-outline mb-4 success';
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        if ((email.indexOf("@vit.ac.in", email.length - "@vit.ac.in".length) !== -1) || (email.indexOf("@vitstudent.ac.in", email.length - "@vitstudent.ac.in".length) !== -1)) {
            return true;
        }
    }
}

function isPassten(str) {
    if (str.length > 10 && str.length < 20) {
        return true;
    }
    return false;
}

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const round_box = document.querySelector(".round_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const proceed_btn = round_box.querySelector(".buttons .proceed");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let timeValue = 15;
let r_numb = 0;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let secs = 0;

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    round_box.classList.add("activeRound");
    showRounds(0);
}

proceed_btn.onclick = () => {
    round_box.classList.remove("activeRound");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(rounds[r_numb].time);
    startTimerLine(0);
}

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = () => {
    window.location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");



next_btn.onclick = () => {
    if (r_numb == rounds.length - 1 && que_count == rounds[r_numb].questions.length - 1) {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
    else if (r_numb < rounds.length && que_count == rounds[r_numb].questions.length - 1) {
        r_numb++;
        que_count = 0;
        que_numb = 1;
        secs = 0;
        quiz_box.classList.remove("activeQuiz");
        round_box.classList.add("activeRound");
        showRounds(r_numb);
    }
    else if (r_numb < rounds.length && que_count < rounds[r_numb].questions.length - 1) {
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }
}

function showRounds(index) {
    const rtitle = document.querySelector(".title");
    let r_title = '<span>Round ' + rounds[index].no + '</span>'
    rtitle.innerHTML = r_title;

    const rdesc = document.querySelector(".round_desc");
    let r_desc = '<span>' + rounds[index].desc + '</span>'
    rdesc.innerHTML = r_desc;
}

function showQuetions(index) {
    const qtitle = document.querySelector(".quiz_box header .title");
    let q_title = '<span>Question ' + rounds[r_numb].questions[index].numb + '</span>';
    qtitle.innerHTML = q_title;

    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + rounds[r_numb].questions[index].numb + ". " + rounds[r_numb].questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + rounds[r_numb].questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + rounds[r_numb].questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + rounds[r_numb].questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + rounds[r_numb].questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 

    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this," + r_numb + ")");
    }

}
let tickIconTag = '<div class="icon tick"><i class="fa fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fa fa-times"></i></div>';

function optionSelected(answer, rindex) {
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = rounds[rindex].questions[que_count].answer; 
    const allOptions = option_list.children.length; 

    if (userAns == correcAns) { 
        if (rindex < 2) {
            userScore += 2;
        }
        else if (rindex == 2) {
            userScore += 4;
        }
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult() {
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    const resultText = result_box.querySelector(".result");
    if (userScore > 9.5) { 
        let scoreTag = '<span>You scored ' + userScore + ' points. </span><span><b>You are eligible for admission in VIT, Vellore.</b></span>';
        let resultTag = '<span>'
        scoreText.innerHTML = scoreTag;  
    }
    else if (userScore > 7.4 && userScore <9.5) { 
        let scoreTag = '<span>You scored ' + userScore + ' points. <b>You are eligible for admission in VIT, Chennai.</b></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 6.5 && userScore <7.5 ){ 
        let scoreTag = '<span>You scored ' + userScore + ' points. <b>You are eligible for admission in VIT, Amaravati.</b></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>You scored ' + userScore + ' points. <b>You are not eligible for admission in VIT.</b></span>';
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; 
        if (secs <= 9) {
            timeCount.textContent = timeCount.textContent + ":0" + secs.toString();
        }
        else {
            timeCount.textContent = timeCount.textContent + ":" + secs.toString();
        }
        secs--;
        if (secs < 0) {
            secs = 59;
            time--;
        }
        timeValue = time;
        if (time < 0) { 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; 
            let correcAns = rounds[r_numb].questions[que_count].answer; 
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, rounds[r_numb].time * 60);
    function timer() {
        time += 1; 
        time_line.style.width = time + "px"; 
        if (time > 549) { 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + rounds[r_numb].questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}