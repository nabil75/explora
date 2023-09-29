function display_questionnary_question_fermee(contentAll, i, type){
    var main = document.getElementById('questionnary');
    main.setAttribute('style','padding: 2%');
    var val_question = contentAll['questions'][i].question;
    var li_question = document.createElement('li');
    li_question.setAttribute('class','questionnary_question');
    li_question.setAttribute('style','background-color: white; padding: 2%; border-radius: 35px 0px 35px 0px; margin-bottom: 2%; border: rgb(194, 185, 212) solid 5px;');
    var modalites = contentAll['questions'][i].modalites;
    for (var j = 0; j < modalites.length; j++){  
        var div_modalite = document.createElement('div');
        div_modalite.setAttribute('class','form-check');
        var input_modalite = document.createElement('input');
        input_modalite.setAttribute('class', 'form-check-input');
        input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite');
        input_modalite.setAttribute('type',type);
        input_modalite.setAttribute('name','flexRadioDefault');
        input_modalite.setAttribute('id','flexRadioDefault_simple_'+i+'_'+j);
        input_modalite.setAttribute('onclick',"clickOnModalite(this,'"+type+"',"+i+")");
        input_modalite.setAttribute('onclick',"save_reponse(this)");
        var label_modalite = document.createElement('label');
        label_modalite.setAttribute('class','form-check-label');
        label_modalite.setAttribute('for','flexRadioDefault_simple_'+i+'_'+j);
        label_modalite.innerHTML = modalites[j];
        div_modalite.appendChild(input_modalite);
        div_modalite.appendChild(label_modalite);
        li_question.appendChild(div_modalite);   
    } 
    var modalite_autre = contentAll['questions'][i].modalite_autre;        
    for (var j = 0; j < modalite_autre.length; j++){  
        var div_modalite = document.createElement('div');
        div_modalite.setAttribute('class','form-check');
        var input_modalite = document.createElement('input');
        input_modalite.setAttribute('class', 'form-check-input');
        input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite autre');
        input_modalite.setAttribute('type',type);
        input_modalite.setAttribute('name','flexRadioDefault');
        input_modalite.setAttribute('id','flexRadioDefault_autre_'+i+'_'+j);
        input_modalite.setAttribute('onclick',"clickOnModaliteAutre(this,'"+type+"', this.id,"+i+")");
        var label_modalite = document.createElement('label');
        label_modalite.setAttribute('class','form-check-label');
        label_modalite.setAttribute('for','flexRadioDefault_autre_'+i+'_'+j);
        label_modalite.innerHTML = modalite_autre[j];
        div_modalite.appendChild(input_modalite);
        div_modalite.appendChild(label_modalite);
        var div_textarea = document.createElement('div');
        div_textarea.setAttribute( 'class','d-flex justify-content-center');
        div_textarea.setAttribute( 'style','margin-left: 10px; margin-bottom: 40px;');
        var textarea = document.createElement('textarea');
        textarea.setAttribute('id','textarea_'+i)
        textarea.setAttribute('class','textarea d-none')
        textarea.setAttribute('rows','2');
        textarea.setAttribute('placeholder','Veuillez préciser');
        var img = document.createElement('img');
        img.setAttribute('id','img_autre_'+i);
        img.setAttribute('src','/static/images/quaero/trait_autre.png');
        img.setAttribute('width','30px');
        img.setAttribute('height','30px');
        img.setAttribute('class','img d-none');
        div_textarea.appendChild(img);
        div_textarea.appendChild(textarea);
        div_modalite.appendChild(div_textarea);
        li_question.appendChild(div_modalite);
    }
    var modalite_nsp = contentAll['questions'][i].modalite_nsp;  
    for (var j = 0; j < modalite_nsp.length; j++){  
        var div_modalite = document.createElement('div');
        div_modalite.setAttribute('class','form-check');
        var input_modalite = document.createElement('input');
        input_modalite.setAttribute('class', 'form-check-input');
        input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite nsp');
        input_modalite.setAttribute('type',type);
        input_modalite.setAttribute('name','flexRadioDefault');
        input_modalite.setAttribute('id','flexRadioDefault_nsp_'+i+'_'+j);
        input_modalite.setAttribute('onclick',"clickOnModaliteNSP(this,'"+type+"', this.id, "+i+")");
        var label_modalite = document.createElement('label');
        label_modalite.setAttribute('class','form-check-label');
        label_modalite.setAttribute('for','flexRadioDefault_nsp_'+i+'_'+j);
        label_modalite.innerHTML = modalite_nsp[j];
        div_modalite.appendChild(input_modalite);
        div_modalite.appendChild(label_modalite);
        li_question.prepend(div_modalite);   
    }  
    var modalite_nc = contentAll['questions'][i].modalite_nc;  
    for (var j = 0; j < modalite_nc.length; j++){  
        var div_modalite = document.createElement('div');
        div_modalite.setAttribute('class','form-check');
        var input_modalite = document.createElement('input');
        input_modalite.setAttribute('class', 'form-check-input');
        input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite nc');
        input_modalite.setAttribute('type',type);
        input_modalite.setAttribute('name','flexRadioDefault');
        input_modalite.setAttribute('id','flexRadioDefault_nc_'+i+'_'+j);
        input_modalite.setAttribute('onclick',"clickOnModaliteNC(this,'"+type+"', this.id, "+i+")");
        var label_modalite = document.createElement('label');
        label_modalite.setAttribute('class','form-check-label');
        label_modalite.setAttribute('for','flexRadioDefault_nc_'+i+'_'+j);
        label_modalite.innerHTML = modalite_nc[j];
        div_modalite.appendChild(input_modalite);
        div_modalite.appendChild(label_modalite);
        li_question.prepend(div_modalite);   
    } 

    var libelle_question = document.createElement('h4');
    libelle_question.setAttribute('style','color:rgb(74, 56, 177);')
    libelle_question.innerHTML = val_question;
    li_question.prepend(libelle_question);
    var bouton = document.createElement('button');
    bouton.setAttribute('class','btn btn-success btn-lg');
    bouton.setAttribute('style',('border-radius: 30px 0px 30px 0px;float: right; margin-top: -35px; margin-right: -12px;'));
    bouton.setAttribute('onclick',"next_question(this,"+i+",'"+type+"', '"+JSON.stringify(contentAll)+"')");
    bouton.innerHTML="Suivant";
    li_question.appendChild(bouton);
    var reponse = document.createElement('input');
    reponse.setAttribute('class','d-none')
    li_question.prepend(reponse);
    main.appendChild(li_question);         
}

function next_question(data, i, type, contentAll){
    contentAll = JSON.parse(contentAll)
    var branchement =contentAll['questions'][i].branchement; 
    var nbBranchements = branchement[0].length;
    switch(type){
        case"radio":
            var aElements = data.parentNode.getElementsByClassName('form-check-input');
            var modalite_checked =""
            for(var m=0;m<aElements.length; m++){
                if (aElements[m].checked){
                    modalite_checked = aElements[m].nextElementSibling.innerHTML;
                }
            }
            for(var b=0; b<nbBranchements; b++){
                if(branchement[0][b][b].modalite == modalite_checked){
                    var q = branchement[0][b][b].question;
                    display_questionnary_question_fermee(contentAll, (+q-1), "radio");
                }
            }
        break;
        case "checkbox":
            for(var i=0; i<nbBranchements; i++){

            }
        break;
    }
}

function save_reponse(data){
    var question_en_cours = data.parentNode.parentNode;
    let li = question_en_cours.closest('li'); // get reference of li
    let nodes = Array.from( li.closest('ol').children ); // get array of li
    let idx = nodes.indexOf( li );
    var qElements = question_en_cours.parentNode.parentNode.getElementsByClassName('questionnary_question');
    var rep = data.parentNode.parentNode.children[0].value;
    if(data.nextElementSibling.innerHTML!=rep){
        data.parentNode.parentNode.children[0].value = data.nextElementSibling.innerHTML;
        for(var i = 0; i<qElements.length; i++){
            if(qElements[i] != question_en_cours && i >idx){
                qElements[i].remove();
            }
        }

    }
}