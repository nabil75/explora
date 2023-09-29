function fullStar(sender) {
    var aElements = sender.parentNode.parentNode.getElementsByTagName("img");
    var aElementsLength = aElements.length;
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            for(var j=0;j<(+i+1);j++){
                aElements[j].setAttribute("src", "/static/images/quaero/etoile_pleine.png");
            }
        }
    }
}

function emptyStar(sender) {
    var aElements = sender.parentNode.parentNode.getElementsByTagName("img");
    var aElementsLength = aElements.length;
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender ) {
            for(var j=0;j<(+i+1);j++){
                if(aElements[j].previousElementSibling.checked == false){
                    aElements[j].setAttribute("src", "/static/images/quaero/etoile_vide.png");
                }
            }
        }
    }
}

function getStatusOfNextStar(sender, bElements){
    var inputsLength = bElements.length;
    var nb = countImageChecked(sender, bElements);
    //cas des n-1 étoiles
    if(nb < inputsLength){
        return(bElements[0].checked == true ? true : false);
    }else{
        //cas de la dernière étoile
        return false;
    }
}
function countImageChecked(bElements){
    var inputsLength = bElements.length;
    var compt = 0;
    for(var i = 0; i<inputsLength;i++){
        bElements[i].checked == true ? compt++ : compt;
    }
    return compt;
}

function clickStar(sender){
    var aElements = sender.parentNode.parentNode.getElementsByTagName("img");
    var bElements = sender.parentNode.parentNode.getElementsByTagName('input');
    var cElements = sender.parentNode.parentNode.previousElementSibling.getElementsByTagName("h2");
    for (var i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            var isChecked = aElements[i].previousElementSibling.checked;
            switch(isChecked){
                case true:
                    var statusNextStar = getStatusOfNextStar(sender, bElements);
                    switch(statusNextStar){
                        case true:
                            for(var j=+i+1;j<5;j++){
                                aElements[j].setAttribute("src", "/static/images/quaero/etoile_vide.png"); aElements[j].previousElementSibling.checked = false; 
                            }
                            (aElements[i].previousElementSibling.value-1) == 0 ?  cElements[0].innerHTML = "-" : cElements[0].innerHTML = aElements[i].previousElementSibling.value-1;
                        break;
                        case false:
                            aElements[i].setAttribute("src", "/static/images/quaero/etoile_vide.png"); aElements[i].previousElementSibling.checked = false; 
                            (aElements[i].previousElementSibling.value-1) == 0 ?  cElements[0].innerHTML = "-" : cElements[0].innerHTML = aElements[i].previousElementSibling.value-1;
                        break;
                    }
                break;
                case false:
                    for(var j=0;j<i;j++){
                        aElements[j].setAttribute("src", "/static/images/quaero/etoile_pleine.png"); aElements[j].previousElementSibling.checked = true;
                    }
                    cElements[0].innerHTML = aElements[i].previousElementSibling.value;
                break;
            }
        }
    }
}

function display_question_notation(sender){
    var div_main = document.getElementById("modal");
    div_main.innerHTML = '';
    var aElements = sender.parentNode.parentNode.getElementsByTagName("img");
    for (var i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            var val_question = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.value;
            var main = document.getElementById('modal');
            main.setAttribute('style','padding: 2%');
            var div_question = document.createElement('div');
            div_question.setAttribute('class','note')
            var h2_1 = document.createElement('h2');
            h2_1.setAttribute('class','notation-denominateur');
            h2_1.innerHTML = '-';
            div_question.appendChild(h2_1);
            var h2_2 = document.createElement('h2');
            h2_2.setAttribute('class','notation-denominateur');
            h2_2.innerHTML = '/5';
            div_question.appendChild(h2_2);
            main.appendChild(div_question);
            var tab=['je ne suis pas du tout satisfait','je suis plutôt peu satisfait','je suis moyennement satisfait','je suis plutôt satisfait', 'je suis très satisfait']
            var div1 = document.createElement('div');
            div1.setAttribute('class','d-flex justify-content-center rating');
            for(var j=0;j<5;j++){
                var label = document.createElement('label');
                var input = document.createElement('input')
                input.setAttribute('type','checkbox');
                input.setAttribute('name','rating');
                input.setAttribute('value',+j+1);
                label.appendChild(input);
                var img = document.createElement('img');
                img.setAttribute('src','/static/images/quaero/etoile_vide.png');
                img.setAttribute('title',tab[(+j+1)]);
                img.setAttribute('onmouseover','fullStar(this)'); 
                img.setAttribute('onmouseout','emptyStar(this)'); 
                img.setAttribute('onclick','clickStar(this)');
                label.appendChild(img);
                div1.appendChild(label);
            }
            var label = document.createElement('label');
            label.setAttribute('class','d-none')
            var input = document.createElement('input')
            input.setAttribute('type','checkbox');
            input.setAttribute('name','rating');
            input.setAttribute('value',+j+1);
            label.appendChild(input);
            var img = document.createElement('img');
            img.setAttribute('src','/static/images/quaero/etoile_vide.png');
            img.setAttribute('title',tab[(+j+1)]);
            img.setAttribute('onmouseover','fullStar(this)'); 
            img.setAttribute('onmouseout','emptyStar(this)'); 
            img.setAttribute('onclick','clickStar(this)');
            label.appendChild(img);
            div1.appendChild(label);
            main.appendChild(div1);         
        }
    }
    $('#questionModal').modal('toggle');
}

function edit_question_notation(content, i){

    insert_question("notation");
    var qElements=document.getElementsByClassName('form-control input-border-bottom libelle-question');
    var lib_question = content['questions'][i].question;
    qElements[i].value = lib_question;
    var bElements = document.getElementsByClassName('branchement d-block');
    var branchement=[];
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