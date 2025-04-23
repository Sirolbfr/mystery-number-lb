/* -------- Constants -------- */

const easy = document.getElementById('easy');
const med = document.getElementById('medium');
const hard = document.getElementById('hard');

const max_trials = document.getElementById('max_trials');
const range = document.getElementById('range');
const input = document.getElementById('user_nb');
const submit = document.getElementById('submit');
const log = document.getElementById('log');
const active_diff = document.getElementById('active_diff');
const desc = document.getElementById("desc");


/* -------- Difficulty -------- */

let inputValue = 0;
let max_rndm_nb = 0;
let rndm = 0;
let trial_max_nb = 0;
let trial_nb= 1;
let var_diff= "";

function set_diff(diff) {
    let elts_removed = document.querySelectorAll(".tb_removed"); /* --- Resetting Log --- */
    elts_removed.forEach(elt => elt.remove());

    if (diff==easy) {
        trial_max_nb= 3;
        max_rndm_nb= 10;
        input.max= "10";
        var_diff= 'easy';
        active_diff.innerHTML="Facile";
        desc.style.backgroundColor="rgb(76, 175, 80)";
    }
    else if (diff==med) {
        trial_max_nb= 2;
        max_rndm_nb= 50;
        input.max= "50";
        var_diff= 'med';
        active_diff.innerHTML="Moyen";
        desc.style.backgroundColor="rgb(255, 193, 7)";
    }
    else if (diff==hard) {
        trial_max_nb= 1;
        max_rndm_nb= 100;
        input.max= "100";
        var_diff= 'hard';
        active_diff.innerHTML="Difficile";
        desc.style.backgroundColor="rgb(244, 67, 54)";
    }

    desc.style.marginBottom="0px";
    max_trials.innerHTML= trial_max_nb + " essai(s) max";
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

    if (desc.style.marginBottom!="10px") {desc.style.marginBottom="10px";}

    let h_trial = document.createElement('h3');
    h_trial.className= "tb_removed";
    h_trial.innerHTML = trial_nb + "e essai :";
    document.getElementById('log').appendChild(h_trial);

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
            p_res.innerHTML += "C'est plus !" + " &#10133;";
            plus.play();
        }
        else if (inputValue > rndm) {
            p_res.innerHTML += "C'est moins !" + " &#10134;";
            moins.play();
        }
        else if (inputValue == rndm) {
            p_res.innerHTML += "Gagné !" + " &#x2714;&#xfe0f;";
            gagné.play();
            submit.disabled= true;
            input.disabled= true;
        }
    }
    else {
        p_res.innerHTML= "Erreur";
    }

    document.getElementById('log').appendChild(p_res);

    const hr = document.createElement('hr');
    hr.className= "tb_removed";
    document.getElementById('log').appendChild(hr);

    trial_nb += 1;

    if (inputValue != rndm && trial_nb > trial_max_nb) {
        p_res2.innerHTML= "Perdu !" + " &#10060;";
        p_res3.innerHTML= "Nombre Mystère : " + rndm;
        submit.disabled= true;
        input.disabled= true;
        document.getElementById('log').appendChild(p_res2);
        document.getElementById('log').appendChild(p_res3);
        document.getElementById('log').appendChild(hr);
    }

    if (submit.disabled==true) {document.getElementById('log').appendChild(reset_btn);}
    
    input.value = "";
}

function reset() {
    set_diff(var_diff);
}


/* ---------------- Initialising ---------------- */

window.onload= set_diff(easy);


/* --------- Testing on 'Enter' key press --------- */

input.onkeydown = function(key){
    if(key.keyCode == 13){test();}
};


/* ---------------- EASTER EGG ---------------- */

const plus = new Audio('audio/plus.mp3');
const moins = new Audio('audio/moins.mp3');
const gagné = new Audio('audio/gagné.mp3');