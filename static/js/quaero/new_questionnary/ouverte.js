function display_question_ouverte(sender){
    var main = document.getElementById('modal');
    main.setAttribute('style','padding: 2%');
    main.innerHTML = '';
    var aElements = sender.parentNode.getElementsByTagName("img");
    for (var i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            var val_question = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
            var textareas = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.getElementsByTagName("textarea");
            var div_question = document.createElement('div');
            var libelle_question = document.createElement('h3');
            libelle_question.innerHTML = val_question;
            main.appendChild(libelle_question);
            var textarea = document.createElement('textarea');
            textarea.setAttribute('class','textarea');
            textarea.setAttribute('onfocus','auto_grow(this)');
            textarea.setAttribute('rows','5');
            textarea.value=textareas[0].value;
            div_question.appendChild(textarea);
            main.appendChild(div_question);         
        }
    }
    $('#questionModal').modal('toggle');
}

//Question ouverte : augmentation la hauteur de textarea en fonction du contenu, sur clic dans la zone.
function auto_grow(element) {
    element.style.height = (+element.scrollHeight+10)+"px";
}

function edit_question_ouverte(content, i){

    insert_question("ouverte");
    var qElements=document.getElementsByClassName('form-control input-border-bottom libelle-question');
    var lib_question = content['questions'][i].question;
    qElements[i].value = lib_question;

    var bElements = document.getElementsByClassName('branchement d-block');
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