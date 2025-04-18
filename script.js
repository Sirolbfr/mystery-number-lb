/* -------- Difficulty -------- */

const easy = document.getElementById('easy');

const med = document.getElementById('medium');

const hard = document.getElementById('hard');


const max_trials = document.getElementById('max_trials');

const trial = document.getElementById('trial');

const range = document.getElementById('range');

const input = document.getElementById('user_nb');

let inputValue = 0;
let max_rndm_nb = 0;
let rndm = 0;
let max_trials_txt = "";
let trial_max_nb = 0;
let trial_nb= 1;
let var_diff= "";
let trial_txt= "1er essai :";

trial.innerHTML= trial_txt;


function set_diff(diff) {
    if (diff=='easy') {
        trial_max_nb= 3;
        max_rndm_nb= 10;
        max_trials_txt= '3 essais max';
        var_diff= 'easy';
    }
    else if (diff=='med') {
        trial_max_nb= 2;
        max_rndm_nb= 50;
        max_trials_txt= '2 essais max';
        var_diff= 'med';
    }
    else if (diff=='hard') {
        trial_max_nb= 1;
        max_rndm_nb= 100;
        max_trials_txt= '1 essai max';
        var_diff= 'hard';
    }
    max_trials.innerHTML= max_trials_txt;
    range.innerHTML= 'Entre 1 et ' + max_rndm_nb;
    rndm= set_rndm(max_rndm_nb);
    trial_nb= 1;
}


/* -------- Main -------- */

function set_rndm(max) {
    return Math.ceil(Math.random() * max);
}

function test() {
    inputValue = input.value;
    results = document.getElementById('results');

    if (inputValue > 0 || inputValue <= max_rndm_nb) {
        if (inputValue < rndm) {results.innerHTML= "C'est plus !";}
        else if (inputValue > rndm) {results.innerHTML= "C'est moins !";}
        else if (inputValue == rndm) {results.innerHTML= "Gagné !";}
    }
    else {results.innerHTML= "Erreur";}

    trial_nb += 1;

    trial_txt= trial_nb + "e essai :";

    if (inputValue != rndm && trial_nb > trial_max_nb) {
        results.innerHTML= "Perdu !";
    }
}

function reset() {
    set_diff(var_diff);
    console.log(rndm);
}

window.onload= set_diff('easy');

/* ---------------- EASTER EGG : VOIX VINCENT LAGAF ---------------- */