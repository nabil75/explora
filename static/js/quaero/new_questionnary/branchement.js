function add_branchement(){
    var div_branchements = document.getElementById('div_branchements');
    //créer les différents éléments constituant un branchement
    var div = document.createElement('div');
    div.setAttribute('class', 'd-flex justify-content-between added_branchement');
    div.setAttribute('style','margin-bottom: 15px;')
    var h5_1 = document.createElement('h5');
    h5_1.setAttribute('class','label-m');
    h5_1.appendChild(document.createTextNode('Si la réponse est égale à '));
    div.appendChild(h5_1);
    var select_modalite = document.createElement('select');
    select_modalite.setAttribute('class', 'form-select select-modalite');
    select_modalite.setAttribute('onchange', 'validate_branchement()');
    var option = document.createElement('option');
    select_modalite.appendChild(option);
    div.appendChild(select_modalite);
    var h5_2 = document.createElement('h5');
    h5_2.setAttribute('class','label-m');
    h5_2.appendChild(document.createTextNode('Alors passer à la question '));
    div.appendChild(h5_2);
    var select_question= document.createElement('select');
    select_question.setAttribute('class', 'form-select select-question');
    select_question.setAttribute('onchange', 'validate_branchement()');
    var option = document.createElement('option');
    select_question.appendChild(option);
    div.appendChild(select_question);
    var img_remove = document.createElement('img');
    img_remove.setAttribute('src', '/static/images/quaero/corbeille.png');
    img_remove.setAttribute('width','30px');
    img_remove.setAttribute('height','30px');
    img_remove.setAttribute('style','cursor: pointer');
    img_remove.setAttribute('onclick', 'remove_branchement(this)');
    div.appendChild(img_remove);
    //Récupérer la liste des modalités et la rajouter à l'objet select
    var branchement_list_modalites = document.getElementById('branchement_list_modalites').value;
    var modalites = branchement_list_modalites.split("||");
    for (var i=0; i<modalites.length; i++){
        var modalite = document.createElement('option');
        modalite.innerHTML = modalites[i];
        select_modalite.appendChild(modalite);
    }
    //fin récupération modalités

    //Récupérer la liste des index des questions suivantes et la rajouter à l'objet select
    var branchement_list_questions = document.getElementById('branchement_list_questions').value;
    var questions = branchement_list_questions.split("||");
    for (var i=0; i<questions.length; i++){
        var question = document.createElement('option');
        question.innerHTML = questions[i];
        select_question.appendChild(question);
    }
    //fin récupération index questions
    div_branchements.appendChild(div);
    //fin création branchement
}


function remove_branchement(sender){
    var aElements = sender.parentNode.getElementsByTagName("img");
    var aElementsLength = aElements.length;
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            aElements[i].parentNode.remove();
        }
    }
    validate_branchement();
    $('#branchementModal').modal({backdrop: 'static', keyboard: false}, 'toggle');
}

function validate_branchement(){
    var index_question = document.getElementById('branchement_index_question').value;
    var obj = [];
    var aElements = document.getElementsByClassName('added_branchement');
    var compt=0;
    for (var i = 0; i < aElements.length; i++){
        //si la modalité et la question cible du branchement courant ne sont pas vides
        if(aElements[i].children[1].value !="" && aElements[i].children[3].value!="" ){
            var branch = {[compt]:{"modalite":aElements[i].children[1].value, "question":aElements[i].children[3].value}};
            obj.push(branch);
            compt++; //l'utilisation de 'compt' au lieu de 'i' permet de garantir un identifiant de branchement toujours valide (commençant par zéro et s'incrémentant de 1)
        }
    }
    var list_branchements =obj;
    var list_li = document.getElementsByClassName('question');
    let textarea = list_li[index_question].children[7].children[0];
    if(obj.length>0){
        textarea.value = JSON.stringify(list_branchements); 
    }else{
        textarea.value ="";
    }
}

function fillTitleModal(sender){
    var aElements = sender.parentNode.getElementsByTagName("img");
    for (var i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            var val = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
            var branchement_title_modal= document.getElementById('branchementModalLabel'); 
            branchement_title_modal.innerHTML = val;
            var branchement_libelle_question = document.getElementById('branchement_libelle_question'); 
            branchement_libelle_question.innerHTML = val;
            branchement_libelle_question.setAttribute('value', val);
        }
    }
}

function cleanModal(){
    //supprimer tous les branchements existants
    var div_branchement = document.getElementsByClassName('added_branchement');
    while(div_branchement[0]) {
        div_branchement[0].parentNode.removeChild(div_branchement[0]);
    }
}

function display_modal_branchement(sender){
    cleanModal();
    var aElements = sender.parentNode.nextElementSibling.getElementsByTagName("textarea");
    var branchement = "";
    for (var i = 0; i < aElements.length; i++){
        branchement = aElements[i].value;
    }
    var obj = [{}];
    if (branchement !==""){
        var select_name = 'branchement_select_questions';
        get_list_index_questions(sender, select_name);
        fillTitleModal(sender);
        get_list_modalites(sender);
        obj = JSON.parse(branchement);
        var nbBranchements = Object.keys(obj).length;
        var list_questions = document.getElementById('branchement_list_questions').value.split('||');
        var list_modalites = document.getElementById('branchement_list_modalites').value.split('||');
        for(var b=0;b<nbBranchements;b++){
            if(list_modalites.includes(obj[b][b].modalite) && list_questions.includes(obj[b][b].question)){
                add_branchement();
                var aElements = document.getElementById('div_branchements').getElementsByClassName("select-modalite");
                aElements[b].value=obj[b][b].modalite;
                var aElements = document.getElementById('div_branchements').getElementsByClassName("select-question");
                aElements[b].value=obj[b][b].question;
            }
        }
        validate_branchement();
    }else{
        var select_name = 'branchement_select_questions';
        get_list_index_questions(sender, select_name);
        fillTitleModal(sender);
        get_list_modalites(sender);
    }
    $('#branchementModal').modal('toggle');
}
