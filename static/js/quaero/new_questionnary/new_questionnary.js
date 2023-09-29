$( function(){
    $( ".questions" ).sortable({
        handle : '.handle',
        start: function(event, ui) { 
            //console.log('start: ' + ui.item.index());
        },
        stop : function(event, ui){
            //console.log('end: ' + ui.item.index());
            if(check_branchement_content() >0){
                $.confirm({
                    title: 'Confirmez-vous le déplacement de la question ?',
                    content: 'Attention en déplaçant la question vous allez effacer tous les branchements déjà définis',
                    buttons: {
                        Confirmer: function () {
                            delete_branchement_content();
                            $('#img_save').attr("src","/static/images/quaero/save_reminder.png" );
                            $.alert('Tous les branchements préalablement définis ont été effacés');
                        },
                        Annuler: function () {
                            //$.alert('Déplacement de la question annulé');
                            $( ".questions" ).sortable( "cancel" );
                        }
                    }
                });
            }
        }
    });
} );

//Vérifier si au moins 1 branchement a déjà été défini
function check_branchement_content(){
    let bElements = document.getElementsByClassName('branchement d-block');
    let nbBranchements = bElements.length;
    let compt=0;
    for (let i=0; i<nbBranchements;i++){
        if(bElements[i].value!==""){
            compt++;
        }
    }
    return compt;
}

//Effacer les branchements suite au déplacement d'une question
function delete_branchement_content(){
    let bElements = document.getElementsByClassName('branchement d-block');
    let nbBranchements = bElements.length;
    for (let i=0; i<nbBranchements;i++){
        bElements[i].value="";
    }
}

//Fonction de décodage du code html (gestion des caractères accentués)
let decodeHTML = function (html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

function insert_question(type_question) {
    let myTemplate = document.getElementById(type_question);
    let normalContent = document.getElementById('main');
    let clonedTemplate = myTemplate.content.cloneNode(true);
    normalContent.appendChild(clonedTemplate);
}

$('#img_question').on('click', function(){
    if($('#menu-questions').attr('class')=='d-none'){
        $('#menu-questions').attr('class','d-block');
    }else{
        $('#menu-questions').attr('class','d-none');
    }
}); 
$('#img_current_questions').on('click', function(){
    if($('#current_questions').attr('class')=='d-none'){
        $('#current_questions').attr('class','d-block');
    }else{
        $('#current_questions').attr('class','d-none');
    }
}); 

$('#img_others_questions').on('click', function(){
    if($('#others_questions').attr('class')=='d-none'){
        $('#others_questions').attr('class','d-block');
    }else{
        $('#others_questions').attr('class','d-none');
    }
}); 
$('#img_fermee_simple').on('click', function(){
    insert_question("fermee_simple");
}); 
$('#img_fermee_multiple').on('click', function(){
    insert_question("fermee_multiple");
});
$('#img_tableau').on('click', function(){
    insert_question("tableau");
});
$('#img_echelle').on('click', function(){
    insert_question("echelle");
});
$('#img_ouverte').on('click', function(){
    insert_question("ouverte");
});
$('#img_notation').on('click', function(){
    insert_question("notation");
});
$('#img_save').on('click', function(){
    let url = $('#img_save').attr('data-url');
    save_questionnary(url);
});
$('#img_reduce_expand').on('click', function(){
    if($('#img_reduce_expand').attr('src') == '/static/images/quaero/reduire.png'){
        collapse_all_questions();
        $('#img_reduce_expand').prop('title','Agrandir toutes les questions');
        $('#img_reduce_expand').attr('src','/static/images/quaero/agrandir.png');
    }else{
        expand_all_questions();
        $('#img_reduce_expand').prop('title','Reduire toutes les questions');
        $('#img_reduce_expand').attr('src','/static/images/quaero/reduire.png');
    }
});

function remove_question(sender){
    let aElements = sender.parentNode.getElementsByTagName("img");
    let aElementsLength = aElements.length;
    for (let i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            if(check_branchement_content() > 0){
                $.confirm({
                    title: 'Confirmez-vous la suppression de la question ?',
                    content: 'Attention en supprimant la question vous allez effacer tous les branchements déjà définis',
                    buttons: {
                        Confirmer: function () {
                            delete_branchement_content();
                            $('#img_save').attr("src","/static/images/quaero/save_reminder.png" );
                            sender.parentNode.parentNode.parentNode.remove();
                            $.alert('La question a été supprimée et tous les branchements préalablement définis ont été effacés');
                        },
                        Annuler: function () {

                        }
                    }
                });
            }else{
                sender.parentNode.parentNode.parentNode.remove();
            }
        }
    }
}

function get_list_index_questions(sender, select_name){
    let list_index_questions = [];
    //récupérer l'index de chaque question
    let li = sender.closest('li'); // get reference of li
    let nodes = Array.from( li.closest('ol').children ); // get array of li
    let idx = nodes.indexOf( li );
    let select = document.getElementById(select_name);
    select.innerHTML="";
    let option = document.createElement('option');
    select.appendChild(option);
    for (let k = +idx+1; k < nodes.length; k++){
        let option = document.createElement('option');
        option.appendChild(document.createTextNode(+k+1));
        list_index_questions.push(+k+1);
        select.appendChild(option);
    }
    let branchement_list_questions = document.getElementById('branchement_list_questions');
    list_index_questions = list_index_questions.join("||");
    branchement_list_questions.setAttribute('value', list_index_questions);
    let branchement_index_question = document.getElementById('branchement_index_question');
    branchement_index_question.setAttribute('value', idx);
}

function get_list_modalites(sender){
    let list_index_questions = [];
    let aElements = sender.parentNode.getElementsByTagName("img");
    for (let i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            let val = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
            let branchement_libelle_question = document.getElementById('branchementModalLabel'); 
            branchement_libelle_question.innerHTML = "<strong>Question : </strong>"+val;
            branchement_libelle_question.setAttribute('value', val);
            let modalites = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.getElementsByTagName("input");
            let list_modalites=[];
            let div_modal_body = document.getElementById('div_branchement_modal_body');
            let select = document.createElement('select');
            let option = document.createElement('option');
            select.appendChild(option);
            for (let j = 0; j < modalites.length; j++){
                let mod = modalites[j].value;
                let option = document.createElement('option');
                option.innerHTML = mod;
                select.appendChild(option);
                list_modalites.push(mod);
            }
            list_modalites = list_modalites.join("||");
            let branchement_list_modalites = document.getElementById('branchement_list_modalites');
            branchement_list_modalites.setAttribute('value', list_modalites);
        }
    }
}

function collapse_question(sender){
    let aElements = sender.parentNode.getElementsByTagName("img");
    let aElementsLength = aElements.length;
    for (let i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            let myClass = aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.className;
            if (myClass =='div_modalites'){
                aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.setAttribute('class','div_modalites d-none');
                aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute("class", "d-none");
                aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute('class','d-flex justify-content-between d-none');
                aElements[i].setAttribute("src", "/static/images/quaero/expand.png");
                aElements[i].setAttribute("title", "Agrandir la question");
                aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute("class", "d-none");
            }else{
                aElements[i].parentNode. parentNode.nextElementSibling.nextElementSibling.setAttribute('class','div_modalites');
                aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute("class", "d-block");
                aElements[i].parentNode. parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute('class','d-flex justify-content-between');
                aElements[i].setAttribute("src", "/static/images/quaero/collapse.png");
                aElements[i].setAttribute("title", "Réduire la question");
                
            };
        }
    }
}

function collapse_all_questions(){
    let aElements = document.getElementsByName("img_reduce");
    for(let i=0;i<aElements.length;i++){
        myDiv = aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling;
        myDiv.setAttribute('class','div_modalites d-none');
        myFooter = aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
        myFooter.setAttribute('class','d-flex justify-content-between d-none');
        aElements[i].setAttribute("src", "/static/images/quaero/expand.png");
        aElements[i].setAttribute("class", "img_collapse");
        myHr = aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;
        myHr.setAttribute("class", "d-none");  
    }
}

function expand_all_questions(){
    let aElements = document.getElementsByName("img_reduce");
    for(let i=0;i<aElements.length;i++){
        myDiv = aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling;
        myDiv.setAttribute('class','div_modalites');
        myFooter = aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
        myFooter.setAttribute('class','d-flex justify-content-between');
        aElements[i].setAttribute("src", "/static/images/quaero/collapse.png");
        aElements[i].setAttribute("class", "img_collapse");
        myHr = aElements[i].parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;
        myHr.setAttribute("class", "");  
    }
}

function save_content_as_json(){
    let main = document.getElementById('main');
    let questions = document.getElementsByClassName('question');
    let intitule = document.getElementById('intitule_questionnaire').value;
    let obj = [{"intitule": intitule, "date": new Date().toLocaleDateString()}];
    let obj_questions =[];
    

    for(let i=0; i<questions.length;i++){
        let type_question = questions[i].children[0].value;
        let mod =[];
        let mod_autre =[];
        let mod_nsp =[];
        let mod_nc =[];
        let branchement=[];
        let libelle_question = questions[i].children[2].value;
        let modalites = questions[i].children[3].children[0].children;
        let reponse_obligatoire ="";
        let branch = {};
        let str_branchement="";
        switch(type_question){
            case "fermee_simple":
                for(let j= 0; j<modalites.length; j++){
                    let libelle_modalite = modalites[j].children[0].children[0].value;
                    if(modalites[j].children[0].children[0].className == "form-control input-border-bottom input-modalite autre"){
                        mod_autre.push(libelle_modalite);
                    } else if (modalites[j].children[0].children[0].className == "form-control input-border-bottom input-modalite nsp"){
                        mod_nsp.push(libelle_modalite);
                    } else if (modalites[j].children[0].children[0].className == "form-control input-border-bottom input-modalite nc"){
                        mod_nc.push(libelle_modalite);
                    }else{
                        mod.push(libelle_modalite);
                    }
                }
                reponse_obligatoire = questions[i].children[6].children[0].children[0];
                if(questions[i].children[7].children[0].value != ""){
                    str_branchement = JSON.parse(questions[i].children[7].children[0].value)
                    branchement.push(str_branchement);
                }else{
                    branchement.push("");
                }
                branch = {"type":type_question, "question": libelle_question,"modalite_nc": mod_nc, "modalite_nsp": mod_nsp, "modalites":mod, "modalite_autre": mod_autre, "branchement": branchement, "obligatoire" : ""+reponse_obligatoire.checked+""};
                obj_questions.push(branch);
            break;
            case "fermee_multiple":
                for(let j= 0; j<modalites.length; j++){
                    let libelle_modalite = modalites[j].children[0].children[0].value;
                    if(modalites[j].children[0].children[0].className == "form-control input-border-bottom input-modalite autre"){
                        mod_autre.push(libelle_modalite);
                    } else if (modalites[j].children[0].children[0].className == "form-control input-border-bottom input-modalite nsp"){
                        mod_nsp.push(libelle_modalite);
                    } else if (modalites[j].children[0].children[0].className == "form-control input-border-bottom input-modalite nc"){
                        mod_nc.push(libelle_modalite);
                    } else{
                        mod.push(libelle_modalite);
                    }
                }
                reponse_obligatoire = questions[i].children[6].children[1].children[0];
                let nombre_reponse = questions[i].children[6].children[0].children[0];
                let reponse_ordonnee = questions[i].children[6].children[2].children[0];

                if(questions[i].children[7].children[0].value != ""){
                    str_branchement = JSON.parse(questions[i].children[7].children[0].value)
                    branchement.push(str_branchement);
                }else{
                    branchement.push("");
                }
                branch = {"type":type_question, "question": libelle_question, "modalite_nc": mod_nc, "modalite_nsp": mod_nsp,"modalites":mod, "modalite_autre": mod_autre, "branchement": branchement, "obligatoire" : ""+reponse_obligatoire.checked+"", "reponse_ordonnee" : ""+reponse_ordonnee.checked+"", "nombre_reponse" : ""+nombre_reponse.value+""};
                obj_questions.push(branch);
            break;
            case "echelle":
                let differentiels =[];
                for(let j= 0; j<modalites.length; j++){
                    let num_differentiel = j;
                    let differentiel_gauche = modalites[j].children[0].children[0].value;
                    let differentiel_droite = modalites[j].children[0].children[2].value;
                    differentiels.push({"gauche":differentiel_gauche, "droite":differentiel_droite})
                }
                reponse_obligatoire = questions[i].children[5].children[0].children[0];

                if(questions[i].children[6].children[0].value != ""){
                    str_branchement = JSON.parse(questions[i].children[6].children[0].value)
                    branchement.push(str_branchement);
                }else{
                    branchement.push("");
                }
                branch = {"type":type_question, "question": libelle_question,"differentiels":differentiels, "branchement": branchement, "obligatoire" : ""+reponse_obligatoire.checked+""};
                obj_questions.push(branch);
            break;
            case "tableau":
                let modalites_ligne =[];
                let modalites_colonne =[];
                let lignes = questions[i].children[3].children[0].children[0].children[0].children;
                for(let j= 0; j<lignes.length; j++){
                    let libelle_ligne = lignes[j].children[0].children[0].value;
                    modalites_ligne.push(libelle_ligne);
                }
                let colonnes = questions[i].children[3].children[0].children[0].nextElementSibling.children[0].children;
                for(let k= 0; k<colonnes.length; k++){
                    let libelle_colonne = colonnes[k].children[0].children[0].value;
                    modalites_colonne.push(libelle_colonne)
                }
                reponse_obligatoire = questions[i].children[5].children[0].children[0];

                if(questions[i].children[6].children[0].value != ""){
                    str_branchement = JSON.parse(questions[i].children[6].children[0].value)
                    branchement.push(str_branchement);
                }else{
                    branchement.push("");
                }
                branch = {"type":type_question, "question": libelle_question,"lignes":modalites_ligne, "colonnes": modalites_colonne, "branchement": branchement, "obligatoire" : ""+reponse_obligatoire.checked+""};
                obj_questions.push(branch);
            break;
            case "notation":
                reponse_obligatoire = questions[i].children[5].children[0].children[0];
                if(questions[i].children[6].children[0].value != ""){
                    str_branchement = JSON.parse(questions[i].children[6].children[0].value)
                    branchement.push(str_branchement);
                }else{
                    branchement.push("");
                }
                branch = {"type":type_question, "question":libelle_question, "branchement": branchement, "obligatoire" : ""+reponse_obligatoire.checked+""};
                obj_questions.push(branch);
            break;
            case "ouverte":
                reponse_obligatoire = questions[i].children[6].children[0].children[0];
                if(questions[i].children[7].children[0].value != ""){
                    str_branchement = JSON.parse(questions[i].children[7].children[0].value)
                    branchement.push(str_branchement);
                }else{
                    branchement.push("");
                }
                branch = {"type":type_question, "question": libelle_question, "branchement": branchement, "obligatoire" : ""+reponse_obligatoire.checked+""};
                obj_questions.push(branch);
            break;
        }
    }
    obj.push({"questions": obj_questions})
    return JSON.stringify(obj);
}

function save_questionnary(url){
    let id_questionnary = document.getElementById('id_questionnary').innerHTML+"";
    let content_json = save_content_as_json();
    showSpinner();
    $.ajax({
        url: url,
        method: 'get',
        data: {
            id_questionnary: id_questionnary,
            content: content_json
        },
        success: function (response) {
            if($('intituleQuestionnaireVide').val()!==""){
                $('#intituleQuestionnaireVide').attr('class','d-none');
            }else{
                $('#intituleQuestionnaireVide').attr('class','badge bg-danger d-block');
                $("#intituleQuestionnaireVide").attr('style', "font-size: 1.3vh; width: 46%");
            }
            document.getElementById('id_questionnary').innerHTML = response;
            document.getElementById('status_questionnary').innerHTML="Modifier le questionnaire";
            let strURL = document.URL;
            if(!strURL.includes('/edit_questionnary/'+response+'/', 0)){
                ChangeUrl('Modifier','./edit_questionnary/'+response+'/')
            }
            document.title="Modifier";
            tempAlert('Questionnaire enregistré.',2000);
            $('#img_save').attr('src','/static/images/quaero/save.png');
            $('#content').val(content_json);
            hideSpinner();
        },
        error: function() {
            tempAlert('Désolé le questionnaire n\'a pas pu être enregistré, veuillez recommencer',2000);
        }
    });
}

function ChangeUrl(title, url) {
    if (typeof (history.pushState) != "undefined") {
        let obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    } else {
        alert("Votre navigateur ne supporte pas HTML5.");
    }
}

function tempAlert(msg,duration){
    let el = document.createElement("div");
    el.setAttribute("class","message");
    el.innerHTML = msg;
    setTimeout(function(){
        el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}