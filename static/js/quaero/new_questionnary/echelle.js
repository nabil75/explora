function display_question_echelle(sender){
    let main = document.getElementById('modal');
    main.innerHTML = '';
    main.setAttribute('style','padding: 2%');
    let aElements = sender.parentNode.getElementsByTagName("img");

    for (let i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            let val_question = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.value;
            let modalites = aElements[i].parentNode.previousElementSibling.previousElementSibling.getElementsByTagName("input");
            let div_question = document.createElement('div');
            let libelle_question = document.createElement('h3');
            libelle_question.innerHTML = val_question;
            main.appendChild(libelle_question);
            for (let j = 0; j < modalites.length; j+=2){
                let div_differentiel = document.createElement('div');
                div_differentiel.setAttribute('class','d-flex justify-content-between');
                div_differentiel.setAttribute('style','padding: 1%; align-items: center;');
                let differentielGauche = document.createElement('label');
                differentielGauche.setAttribute('style','text-align: right; margin-right: 2%; width: 15%; font-weight: bold;');
                differentielGauche.innerHTML=modalites[j].value;
                div_differentiel.appendChild(differentielGauche);
                let input = document.createElement('input');
                input.setAttribute('type','range');
                input.setAttribute('class','form-range');
                input.setAttribute('min',0);
                input.setAttribute('max',100);
                input.setAttribute('step',1);
                input.setAttribute('value','');
                div_differentiel.appendChild(input);
                main.appendChild(div_differentiel);
                let differentielDroite = document.createElement('label');
                differentielDroite.setAttribute('style','text-align: left; margin-left: 2%; width: 15%; font-weight: bold;');
                differentielDroite.innerHTML=modalites[+j+1].value;
                div_differentiel.appendChild(differentielDroite);
            }   
        }
    }
    $('#questionModal').modal('toggle');
}

function add_differentiel(sender){
    let aElements = sender.parentNode.getElementsByTagName("button");
    let aElementsLength = aElements.length;
    let index;
    for (let i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            index = i;
            let myTemplate = document.getElementById("differentiel");
            let clonedTemplate = myTemplate.content.cloneNode(true);
            aElements[i].previousElementSibling.appendChild(clonedTemplate);
        }
    }
}

function remove_differentiel(sender){
    let aElements = sender.parentNode.parentNode.getElementsByTagName("button");
    let aElementsLength = aElements.length;
    let index;
    for (let i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            index = i;
            aElements[i].parentNode.parentNode.remove();
        }
    }
}

function edit_question_echelle(content, i){

    let nbDifferentiels_avant_ajout_question = document.getElementsByClassName('form-control input-border-bottom differentiel-gauche').length;
    insert_question("echelle");
    let qElements=document.getElementsByClassName('form-control input-border-bottom libelle-question');
    let lib_question = content['questions'][i].question;
    qElements[i].value = lib_question;
    let nbDifferentiels = content['questions'][i].differentiels.length;
    let nbDifferentiels_apres_ajout_question = document.getElementsByClassName('form-control input-border-bottom differentiel-gauche').length;
    let nbDifferentiels_ajoutees_apres_insertion_question = (+nbDifferentiels_apres_ajout_question - (+nbDifferentiels_avant_ajout_question));
    let nbDifferentiels_a_ajouter = +nbDifferentiels-(+nbDifferentiels_ajoutees_apres_insertion_question);
    for(let m = 0; m<nbDifferentiels_a_ajouter;m++){
        let olElements = qElements[i].nextElementSibling.getElementsByTagName("ol");
        olElements[0].appendChild(ajout_differentiel_a_la_volee());
    }
    let gElements = document.getElementsByClassName('form-control input-border-bottom differentiel-gauche');
    let dElements = document.getElementsByClassName('form-control input-border-bottom differentiel-droite');
    for(let j=0;j<nbDifferentiels;j++){
        gElements[+j+(nbDifferentiels_avant_ajout_question)].value = content['questions'][i].differentiels[j].gauche;
        dElements[+j+(nbDifferentiels_avant_ajout_question)].value = content['questions'][i].differentiels[j].droite;
    }    
    let bElements = document.getElementsByClassName('branchement d-block');
    let branchement=[]
    let nbBranchements = (content['questions'][i].branchement[0]).length
    for(let b=0; b<nbBranchements; b++){
        if(content['questions'][i].branchement !=""){
            branchement.push({[b]:{"modalite":content["questions"][i].branchement[0][b][b].modalite, "question":content["questions"][i].branchement[0][b][b].question}});
        }
    }
    if(branchement !=""){
        bElements[i].value = JSON.stringify(branchement);
    }
    let rep_obligatoire = content['questions'][i].obligatoire;
    let oElements=document.getElementsByClassName('form-check-input');
    if(rep_obligatoire=="true"){
        oElements[i].checked = true;
    }
}

function ajout_differentiel_a_la_volee(){
    let li = document.createElement('li');
    li.setAttribute('class','differentiel');
    li.setAttribute('style','margin-top: 22px');
    let div = document.createElement('div');
    div.setAttribute('class','d-flex justify-content-between');
    let input_gauche = document.createElement('input');
    input_gauche.setAttribute('class','form-control input-border-bottom differentiel-gauche');
    input_gauche.setAttribute('placeholder','Libellé Gauche');
    div.appendChild(input_gauche);
    let div_separator = document.createElement('div');
    div_separator.setAttribute('class','col col-lg-1 bloc centered');
    let div_separator_in = document.createElement('div');
    div_separator_in.setAttribute('class','d-flex');
    div_separator.appendChild(div_separator_in);
    div.appendChild(div_separator);
    let input_droite = document.createElement('input');
    input_droite.setAttribute('class','form-control input-border-bottom differentiel-droite');
    input_droite.setAttribute('placeholder','Libellé Droite');
    div.appendChild(input_droite);
    let button = document.createElement('button');
    button.setAttribute('class','btn-close btn-modalite');
    button.setAttribute('onclick','remove_differentiel(this)');
    div.appendChild(button);
    li.appendChild(div);
    return li
}