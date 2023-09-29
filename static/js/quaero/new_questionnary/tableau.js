function display_question_tableau(sender){
    var main = document.getElementById('modal');
    main.setAttribute('style','padding: 2%');
    main.innerHTML = '';
    var aElements = sender.parentNode.getElementsByTagName("img");

    for (var i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            var val_question = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.value;
            var lignes = aElements[i].parentNode.previousElementSibling.previousElementSibling.getElementsByClassName("form-control input-border-bottom ligne");
            var colonnes = aElements[i].parentNode.previousElementSibling.previousElementSibling.getElementsByClassName("form-control input-border-bottom colonne");
            var div_question = document.createElement('div');
            div_question.setAttribute('class','d-flex justify-content-center');
            var table = document.createElement('table');
            table.setAttribute('class','table table-responsive table-bordered');
            table.setAttribute('style','margin-top: 2%');
            var thead = document.createElement('thead');
            var th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.setAttribute('class','align-middle');
            th.setAttribute('style','text-align: center');
            th.innerHTML = "#";
            thead.appendChild(th);
            var tbody = document.createElement('tbody');
            var libelle_question = document.createElement('h3');
            libelle_question.innerHTML = val_question;
            main.appendChild(libelle_question);
            for (var j = 0; j < colonnes.length; j++){
                var th = document.createElement('th');
                th.setAttribute('scope', 'col');
                th.setAttribute('style','text-align: center');
                th.innerHTML = colonnes[j].value;
                thead.appendChild(th);
            }
            for (var k = 0; k < lignes.length; k++){
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.setAttribute('scope','row');
                th.innerHTML = lignes[k].value;
                tr.appendChild(th);
                for(var c=0;c<colonnes.length;c++){
                    var td = document.createElement('td');
                    td.setAttribute('class','align-middle');
                    var input = document.createElement('input');
                    var div = document.createElement('div');
                    div.setAttribute('class','form-check d-flex justify-content-center');
                    input.setAttribute('class','form-check-input');
                    input.setAttribute('type','radio');
                    input.setAttribute('name','flexRadioDefault'+k);
                    div.appendChild(input)
                    td.appendChild(div);
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.appendChild(thead);
            table.appendChild(tbody);
            div_question.appendChild(table);   
            main.appendChild(div_question);         
        }
    }
    $('#questionModal').modal('toggle');
}

function add_ligne(sender){
    var aElements = sender.parentNode.getElementsByTagName("button");
    var aElementsLength = aElements.length;
    var index;
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            index = i;
            var myTemplate = document.getElementById("ligne");
            clonedTemplate = myTemplate.content.cloneNode(true);
            aElements[i].previousElementSibling.appendChild(clonedTemplate);
        }
    }
}

function add_colonne(sender){
    var aElements = sender.parentNode.getElementsByTagName("button");
    var aElementsLength = aElements.length;
    var index;
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            index = i;
            var myTemplate = document.getElementById("colonne");
            clonedTemplate = myTemplate.content.cloneNode(true);
            aElements[i].previousElementSibling.appendChild(clonedTemplate);
        }
    }
}

function remove_ligne(sender){
    var aElements = sender.parentNode.parentNode.getElementsByTagName("button");
    var aElementsLength = aElements.length;
    var index;
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            index = i;
            aElements[i].parentNode.parentNode.remove();
        }
    }
}

function remove_colonne(sender){
    var aElements = sender.parentNode.parentNode.getElementsByTagName("button");
    var aElementsLength = aElements.length;
    var index;
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            index = i;
            aElements[i].parentNode.parentNode.remove();
        }
    }
}

function edit_question_tableau(content, i){

    var nbLignes_avant_ajout_question = document.getElementsByClassName('form-control input-border-bottom ligne').length;

    var nbColonnes_avant_ajout_question = document.getElementsByClassName('form-control input-border-bottom colonne').length;

    insert_question("tableau");
    var qElements=document.getElementsByClassName('form-control input-border-bottom libelle-question');
    var lib_question = content['questions'][i].question;
    qElements[i].value = lib_question;

    var nbLignes = content['questions'][i].lignes.length;
    var nbLignes_apres_ajout_question = document.getElementsByClassName('form-control input-border-bottom ligne').length;
    var nbLignes_ajoutees_apres_insertion = (+nbLignes_apres_ajout_question - (+nbLignes_avant_ajout_question));
    var nbLignes_a_ajouter = +nbLignes-(+nbLignes_ajoutees_apres_insertion);

    var nbColonnes = content['questions'][i].colonnes.length;
    var nbColonnes_apres_ajout_question = document.getElementsByClassName('form-control input-border-bottom colonne').length;
    var nbColonnes_ajoutees_apres_insertion = (+nbColonnes_apres_ajout_question - (+nbColonnes_avant_ajout_question));
    var nbColonnes_a_ajouter = +nbColonnes-(+nbColonnes_ajoutees_apres_insertion);

    for(var m = 0; m<nbLignes_a_ajouter;m++){
        var olElements = qElements[i].nextElementSibling.getElementsByClassName("lignes");
        olElements[0].appendChild(ajout_ligne_a_la_volee());
    }

    for(var m = 0; m<nbColonnes_a_ajouter;m++){
        var olElements = qElements[i].nextElementSibling.getElementsByClassName("colonnes");
        olElements[0].appendChild(ajout_colonne_a_la_volee());
    }
    var mElements = document.getElementsByClassName('form-control input-border-bottom ligne');
    for(j=0;j<nbLignes;j++){
        mElements[+j+(nbLignes_avant_ajout_question)].value = content['questions'][i].lignes[j];
    }
    var nElements = document.getElementsByClassName('form-control input-border-bottom colonne');
    for(k=0;k<nbColonnes;k++){
        nElements[+k+(nbColonnes_avant_ajout_question)].value = content['questions'][i].colonnes[k];
    }    var bElements = document.getElementsByClassName('branchement d-block');
    var branchement=[]
    var nbBranchements = (content['questions'][i].branchement[0]).length
    for(var b=0; b<nbBranchements; b++){
        if(content['questions'][i].branchement !=""){
            branchement.push({[b]:{"modalite":content["questions"][i].branchement[0][b][b].modalite, "question":content["questions"][i].branchement[0][b][b].question}});
        }
    }
    if(branchement !=""){
        bElements[i].value = JSON.stringify(branchement);
    }
    var rep_obligatoire = content['questions'][i].obligatoire;
    var oElements=document.getElementsByClassName('form-check-input');
    if(rep_obligatoire=="true"){
        oElements[i].checked = true;
    }
}

function ajout_ligne_a_la_volee(){
    var li = document.createElement('li');
    li.setAttribute('class','ligne');
    li.setAttribute('style','margin-top: 22px');
    var div = document.createElement('div');
    div.setAttribute('class','d-flex justify-content-between')
    var input = document.createElement('input');
    input.setAttribute('class','form-control input-border-bottom ligne');
    input.setAttribute('placeholder','En-tête de ligne');
    var button = document.createElement('button');
    button.setAttribute('class','btn-close btn-modalite');
    button.setAttribute('onclick','remove_ligne(this)');
    div.appendChild(input);
    div.appendChild(button);
    li.appendChild(div);
    return li
}

function ajout_colonne_a_la_volee(){
    var li = document.createElement('li');
    li.setAttribute('class','colonne');
    li.setAttribute('style','margin-top: 22px');
    var div = document.createElement('div');
    div.setAttribute('class','d-flex justify-content-between')
    var input = document.createElement('input');
    input.setAttribute('class','form-control input-border-bottom colonne');
    input.setAttribute('placeholder','En-tête de colonne');
    var button = document.createElement('button');
    button.setAttribute('class','btn-close btn-modalite');
    button.setAttribute('onclick','remove_colonne(this)');
    div.appendChild(input);
    div.appendChild(button);
    li.appendChild(div);
    return li
}