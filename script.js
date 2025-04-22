/* -------- Difficulty -------- */

const easy = document.getElementById('easy');
const med = document.getElementById('medium');
const hard = document.getElementById('hard');

const max_trials = document.getElementById('max_trials');
const trial = document.getElementById('trial');
const range = document.getElementById('range');
const input = document.getElementById('user_nb');
const submit = document.getElementById('submit');
const log = document.getElementById('log');

let inputValue = 0;
let max_rndm_nb = 0;
let rndm = 0;
let max_trials_txt = "";
let trial_max_nb = 0;
let trial_nb= 1;
let var_diff= "";

function set_diff(diff) {
    let elts_removed = document.querySelectorAll(".tb_removed"); /* --- Resetting Log --- */
    elts_removed.forEach(elt => elt.remove());

    if (diff=='easy') {
        trial_max_nb= 3;
        max_rndm_nb= 10;
        input.max= "10";
        max_trials_txt= '3 essais max';
        var_diff= 'easy';
    }
    else if (diff=='med') {
        trial_max_nb= 2;
        max_rndm_nb= 50;
        input.max= "50";
        max_trials_txt= '2 essais max';
        var_diff= 'med';
    }
    else if (diff=='hard') {
        trial_max_nb= 1;
        max_rndm_nb= 100;
        input.max= "100";
        max_trials_txt= '1 essai max';
        var_diff= 'hard';
    }
    max_trials.innerHTML= max_trials_txt;
    range.innerHTML= 'Entre 1 et ' + max_rndm_nb;
    rndm= set_rndm(max_rndm_nb);
    console.log('Nombre : ' + rndm);
    trial_nb= 1;
    submit.disabled= false;
    input.disabled= false;
}


/* -------- Main -------- */

function set_rndm(max) {
    return Math.ceil(Math.random() * max);
}

function test() {
    inputValue = input.value;

    let p_trial = document.createElement('p');
    p_trial.className= "tb_removed";
    p_trial.innerHTML = trial_nb + "e essai :";
    document.getElementById('log').appendChild(p_trial);
    let p_res = document.createElement('p');
    p_res.className= "tb_removed";
    p_res.innerHTML= inputValue + " ? ... ";
    let p_res2 = document.createElement('p');
    p_res2.className= "tb_removed";
    let p_res3 = document.createElement('p');
    p_res3.className= "tb_removed";

    let reset_btn = document.createElement('button');
    reset_btn.id= "reset";
    reset_btn.className= "tb_removed";
    reset_btn.type= "reset";
    reset_btn.setAttribute("onclick", "reset();");
    reset_btn.innerHTML= "Rejouer";

    if (inputValue > 0 && inputValue <= max_rndm_nb) {
        if (inputValue < rndm) {
            p_res.innerHTML += "C'est plus !";
            plus.play();
        }
        else if (inputValue > rndm) {
            p_res.innerHTML += "C'est moins !";
            moins.play();
        }
        else if (inputValue == rndm) {
            p_res.innerHTML += "Gagné !";
            gagné.play();
            submit.disabled= true;
            input.disabled= true;
            document.getElementById('log').appendChild(reset_btn);
        }
    }
    else {
        p_res.innerHTML= "Erreur";
    }

    document.getElementById('log').appendChild(p_res);

    let hr = document.createElement('hr');
    hr.className= "tb_removed";
    document.getElementById('log').appendChild(hr);

    trial_nb += 1;

    if (inputValue != rndm && trial_nb > trial_max_nb) {
        p_res2.innerHTML= "Perdu !";
        p_res3.innerHTML= "Nombre Mystère : " + rndm;
        submit.disabled= true;
        input.disabled= true;
        document.getElementById('log').appendChild(p_res2);
        document.getElementById('log').appendChild(p_res3);
        document.getElementById('log').appendChild(reset_btn);
    }
    
    input.value = "";
}

function reset() {
    set_diff(var_diff);
}


/* ---------------- EASTER EGG ---------------- */

const plus = new Audio('audio/plus.mp3');
const moins = new Audio('audio/moins.mp3');
const gagné = new Audio('audio/gagné.mp3');


/* ---------------- Initialising ---------------- */

window.onload= set_diff('easy');