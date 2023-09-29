function display_question_fermee(sender, type){
    let main = document.getElementById('modal');
    main.innerHTML = '';
    main.setAttribute('style','padding: 2%');
    let aElements = sender.parentNode.getElementsByTagName("img");
    for (let i = 0; i < aElements.length; i++){
        if (aElements[i] == sender) {
            let val_question = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
            let modalites = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.getElementsByTagName("input");
            let div_question = document.createElement('div');
            let libelle_question = document.createElement('h3');
            libelle_question.innerHTML = val_question;
            main.appendChild(libelle_question);
            let mod =[];
            let mod_autre =[];
            let mod_nsp =[];
            let mod_nc =[];
            for (let j = 0; j < modalites.length; j++){
                let modalite_class = modalites[j].className;
                switch(modalite_class){
                    case 'form-control input-border-bottom input-modalite':
                        mod.push(modalites[j].value); 
                    break;
                    case 'form-control input-border-bottom input-modalite autre':
                        mod_autre.push(modalites[j].value); 
                    break;
                    case 'form-control input-border-bottom input-modalite nsp':
                        mod_nsp.push(modalites[j].value); 
                    break;
                    case 'form-control input-border-bottom input-modalite nc':
                        mod_nc.push(modalites[j].value); 
                    break;
                }
            }

            for (let j = 0; j < mod.length; j++){  
                let div_modalite = document.createElement('div');
                div_modalite.setAttribute('class','form-check');
                let input_modalite = document.createElement('input');
                input_modalite.setAttribute('class', 'form-check-input');
                input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite');
                input_modalite.setAttribute('type',type);
                input_modalite.setAttribute('name','flexRadioDefault');
                input_modalite.setAttribute('id','flexRadioDefault_simple_'+j);
                input_modalite.setAttribute('onclick',"clickOnModalite(this,'"+type+"',"+i+")");
                let label_modalite = document.createElement('label');
                label_modalite.setAttribute('class','form-check-label');
                label_modalite.setAttribute('for','flexRadioDefault_simple_'+j);
                label_modalite.innerHTML = mod[j];
                div_modalite.appendChild(input_modalite);
                div_modalite.appendChild(label_modalite);
                div_question.appendChild(div_modalite);   
            }         
            for (let j = 0; j < mod_autre.length; j++){  
                let div_modalite = document.createElement('div');
                div_modalite.setAttribute('class','form-check');
                let input_modalite = document.createElement('input');
                input_modalite.setAttribute('class', 'form-check-input');
                input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite autre');
                input_modalite.setAttribute('type',type);
                input_modalite.setAttribute('name','flexRadioDefault');
                input_modalite.setAttribute('id','flexRadioDefault_autre_'+j);
                input_modalite.setAttribute('onclick',"clickOnModaliteAutre(this,'"+type+"', this.id, "+i+")");
                let label_modalite = document.createElement('label');
                label_modalite.setAttribute('class','form-check-label');
                label_modalite.setAttribute('for','flexRadioDefault_autre_'+j);
                label_modalite.innerHTML = mod_autre[j];
                div_modalite.appendChild(input_modalite);
                div_modalite.appendChild(label_modalite);
                let div_textarea = document.createElement('div');
                div_textarea.setAttribute( 'class','d-flex justify-content-center');
                div_textarea.setAttribute( 'style','margin-left: 10px;');
                let textarea = document.createElement('textarea');
                textarea.setAttribute('id','textarea_'+i)
                textarea.setAttribute('class','textarea d-none')
                textarea.setAttribute('rows','2');
                textarea.setAttribute('placeholder','Veuillez préciser');
                let img = document.createElement('img');
                img.setAttribute('id','img_autre_'+i);
                img.setAttribute('src','/static/images/quaero/trait_autre.png');
                img.setAttribute('width','30px');
                img.setAttribute('height','30px');
                img.setAttribute('class','img d-none');
                div_textarea.appendChild(img);
                div_textarea.appendChild(textarea);
                div_modalite.appendChild(div_textarea);
                div_question.appendChild(div_modalite);
            }
            for (let j = 0; j < mod_nsp.length; j++){  
                let div_modalite = document.createElement('div');
                div_modalite.setAttribute('class','form-check');
                let input_modalite = document.createElement('input');
                input_modalite.setAttribute('class', 'form-check-input');
                input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite nsp');
                input_modalite.setAttribute('type',type);
                input_modalite.setAttribute('name','flexRadioDefault');
                input_modalite.setAttribute('id','flexRadioDefault_nsp_'+j);
                input_modalite.setAttribute('onclick',"clickOnModaliteNSP(this,'"+type+"', this.id, "+i+")");
                let label_modalite = document.createElement('label');
                label_modalite.setAttribute('class','form-check-label');
                label_modalite.setAttribute('for','flexRadioDefault_nsp_'+j);
                label_modalite.innerHTML = mod_nsp[j];
                div_modalite.appendChild(input_modalite);
                div_modalite.appendChild(label_modalite);
                div_question.prepend(div_modalite);   
            }  
            for (let j = 0; j < mod_nc.length; j++){  
                let div_modalite = document.createElement('div');
                div_modalite.setAttribute('class','form-check');
                let input_modalite = document.createElement('input');
                input_modalite.setAttribute('class', 'form-check-input');
                input_modalite.setAttribute('data-class', 'form-control input-border-bottom input-modalite nc');
                input_modalite.setAttribute('type',type);
                input_modalite.setAttribute('name','flexRadioDefault');
                input_modalite.setAttribute('id','flexRadioDefault_nc_'+j);
                input_modalite.setAttribute('onclick',"clickOnModaliteNC(this,'"+type+"', this.id, "+i+")");
                let label_modalite = document.createElement('label');
                label_modalite.setAttribute('class','form-check-label');
                label_modalite.setAttribute('for','flexRadioDefault_nc_'+j);
                label_modalite.innerHTML = mod_nc[j];
                div_modalite.appendChild(input_modalite);
                div_modalite.appendChild(label_modalite);
                div_question.prepend(div_modalite);   
            } 
            main.appendChild(div_question);         
        }
    }
}

function clickOnModalite(data, type, i){
    let modalite_class = data.getAttribute('data-class');
    switch(type){
        case 'radio':
            if (modalite_class == 'form-control input-border-bottom input-modalite'){
                document.getElementById('textarea_'+i).value="";
                document.getElementById('textarea_'+i).className = 'textarea d-none';
                document.getElementById('img_autre_'+i).className = 'img d-none';
            }
        break;
    }
}

function clickOnModaliteAutre(data, type, id, i){
    let modalite_class = data.getAttribute('data-class');
    switch(type){
        case 'radio':
            if (modalite_class == 'form-control input-border-bottom input-modalite autre'){
                document.getElementById('textarea_'+i).className = 'textarea d-block';
                document.getElementById('img_autre_'+i).className = 'img d-block';
            }else{
                document.getElementById('textarea_'+i).value="";
                document.getElementById('textarea_'+i).className = 'textarea d-none';
                document.getElementById('img_autre_'+i).className = 'img d-none';
            }
        break;
        case 'checkbox':
            if (modalite_class == 'form-control input-border-bottom input-modalite autre' && document.getElementById(id).checked){
                document.getElementById('textarea_'+i).className = 'textarea d-block';
                document.getElementById('img_autre_'+i).className = 'img d-block';
            }else if(modalite_class == 'form-control input-border-bottom input-modalite autre' && !document.getElementById(id).checked){
                document.getElementById('textarea_'+i).value="";
                document.getElementById('textarea_'+i).className = 'textarea d-none';
                document.getElementById('img_autre_'+i).className = 'img d-none';
            }
        break;
    }

}

function clickOnModaliteNSP(data, type, id, q){
    if(type=='radio'){
        document.getElementById('textarea_'+q).value="";
        document.getElementById('textarea_'+q).className = 'textarea d-none';
        document.getElementById('img_autre_'+q).className = 'img d-none';
    }
    if(type=='checkbox' && document.getElementById(id).checked){
        let aElements = data.parentNode.parentNode.getElementsByTagName('input');
        for(let i =0; i<aElements.length; i++){
            let modalite_class = aElements[i].getAttribute('data-class');
            switch(modalite_class){
                case 'form-control input-border-bottom input-modalite':
                    aElements[i].setAttribute('disabled','true');
                    aElements[i].checked = false;
                break;
                case 'form-control input-border-bottom input-modalite autre':
                    aElements[i].setAttribute('disabled','true');
                    if(aElements[i].checked){
                        document.getElementById('textarea_'+q).value="";
                        document.getElementById('textarea_'+q).className = 'textarea d-none';
                        document.getElementById('img_autre_'+q).className = 'img d-none';
                        aElements[i].checked = false;
                    }
                break;
            }
        }
    }else if(type=='checkbox' && !document.getElementById(id).checked){
        let aElements = data.parentNode.parentNode.getElementsByTagName('input');
        for(let i =0; i<aElements.length; i++){
            let modalite_class = aElements[i].getAttribute('data-class');
            switch(modalite_class){
                case 'form-control input-border-bottom input-modalite':
                    aElements[i].removeAttribute('disabled');
                break;
                case 'form-control input-border-bottom input-modalite autre':
                    aElements[i].removeAttribute('disabled');
                break;
            }
        }
    }
}

function clickOnModaliteNC(data, type, id, q){
    if(type=='radio'){
        document.getElementById('textarea_'+q).value="";
        document.getElementById('textarea_'+q).className = 'textarea d-none';
        document.getElementById('img_autre_'+q).className = 'img d-none';
    }
    if(type=='checkbox' && document.getElementById(id).checked){
        let aElements = data.parentNode.parentNode.getElementsByTagName('input');
        for(let i =0; i<aElements.length; i++){
            let modalite_class = aElements[i].getAttribute('data-class');
            switch(modalite_class){
                case 'form-control input-border-bottom input-modalite':
                    aElements[i].setAttribute('disabled','true');
                    aElements[i].checked = false;
                break;
                case 'form-control input-border-bottom input-modalite autre':
                    aElements[i].setAttribute('disabled','true');
                    if(aElements[i].checked){
                        document.getElementById('textarea_'+q).value="";
                        document.getElementById('textarea_'+q).className = 'textarea d-none';
                        document.getElementById('img_autre_'+q).className = 'img d-none';
                        aElements[i].checked = false;
                    }
                break;
                case 'form-control input-border-bottom input-modalite nsp':
                    aElements[i].setAttribute('disabled','true');
                    aElements[i].checked = false;
                break;
            }
        }
    }else if(type=='checkbox' && !document.getElementById(id).checked){
        let aElements = data.parentNode.parentNode.getElementsByTagName('input');
        for(let i =0; i<aElements.length; i++){
            let modalite_class = aElements[i].getAttribute('data-class');
            switch(modalite_class){
                case 'form-control input-border-bottom input-modalite':
                    aElements[i].removeAttribute('disabled');
                break;
                case 'form-control input-border-bottom input-modalite autre':
                    aElements[i].removeAttribute('disabled');
                break;
                case 'form-control input-border-bottom input-modalite nsp':
                    aElements[i].removeAttribute('disabled');
                break;
            }
        }
    }
}

function display_question_fermee_unique(sender){
    let type = "radio";
    display_question_fermee(sender, type);
    $('#questionModal').modal('toggle');
}

function display_question_fermee_multiple(sender){
    let type = "checkbox";
    display_question_fermee(sender, type);
    $('#questionModal').modal('toggle');
}

function remove_modalite(sender){
    let aElements = sender.parentNode.parentNode.getElementsByTagName("button");
    let aElementsLength = aElements.length;
    let index;
    for (let i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            aElements[i].parentNode.parentNode.remove();
        }
    }
}

function display_options_modalite(sender){
    let imgElements = sender.getElementsByTagName("img");
    let aElements = sender.parentNode.getElementsByTagName("ul");
    let aElementsLength = aElements.length;
    for (let i = 0; i < aElementsLength; i++){
        if(aElements[0].className == "d-block"){
            aElements[0].className="d-none";
            imgElements[0].setAttribute('src','/static/images/quaero/plus.png');
            imgElements[0].setAttribute('title','Afficher les options');
        }else{
            aElements[0].className="d-block";
            imgElements[0].setAttribute('src','/static/images/quaero/moins.png');
            imgElements[0].setAttribute('title','Masquer les options');
        }
    }
}

function add_modalite(sender){
    let aElements = sender.parentNode.getElementsByClassName("btn btn-default bouton-modalite");
    let aElementsLength = aElements.length;
    for (let i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
            let myTemplate = document.getElementById("modalite");
            clonedTemplate = myTemplate.content.cloneNode(true);
            aElements[i].parentNode.parentNode.parentNode.previousElementSibling.children[0].appendChild(clonedTemplate);
        }
    }
}
function add_modalite_autre(sender){
    let aElements = sender.parentNode.getElementsByClassName("btn btn-default bouton-modalite autre");
    let aElementsLength = aElements.length;
    for (let i = 0; i < aElementsLength; i++){
        let nElements = aElements[i].parentNode.parentNode.parentNode.previousElementSibling.getElementsByClassName('modalite autre');
        if (aElements[i] == sender && nElements.length==0) {
            let myTemplate = document.getElementById("modalite_autre");
            clonedTemplate = myTemplate.content.cloneNode(true);
            aElements[i].parentNode.parentNode.parentNode.previousElementSibling.children[0].appendChild(clonedTemplate);
        }else{
            tempAlert("Une question ne peut comporter 2 modalités 'Autre'",2000);
        }
    }
}

function add_modalite_nsp(sender){
    let aElements = sender.parentNode.getElementsByClassName("btn btn-default bouton-modalite nsp");
    let aElementsLength = aElements.length;
    for (let i = 0; i < aElementsLength; i++){
        let nElements = aElements[i].parentNode.parentNode.parentNode.previousElementSibling.getElementsByClassName('modalite nsp');
        if (aElements[i] == sender && nElements.length==0) {
            let myTemplate = document.getElementById("modalite_nsp");
            clonedTemplate = myTemplate.content.cloneNode(true);
            aElements[i].parentNode.parentNode.parentNode.previousElementSibling.children[0].appendChild(clonedTemplate);
        }else{
            tempAlert("Une question ne peut comporter 2 modalités 'Ne sait pas'",2000);
        }
    }
}

function add_modalite_nc(sender){
    let aElements = sender.parentNode.getElementsByClassName("btn btn-default bouton-modalite nc");
    let aElementsLength = aElements.length;
    for (let i = 0; i < aElementsLength; i++){
        let nElements = aElements[i].parentNode.parentNode.parentNode.previousElementSibling.getElementsByClassName('modalite nc');
        if (aElements[i] == sender && nElements.length==0) {
            let myTemplate = document.getElementById("modalite_nc");
            clonedTemplate = myTemplate.content.cloneNode(true);
            aElements[i].parentNode.parentNode.parentNode.previousElementSibling.children[0].appendChild(clonedTemplate);
        }else{
            tempAlert("Une question ne peut comporter 2 modalités 'Non concerné'",2000);
        }
    }
}

function edit_question_fermee_simple(content, i){
    let nbModalites_avant_ajout_question = document.getElementsByClassName('form-control input-border-bottom input-modalite').length;
    insert_question("fermee_simple");
    let qElements=document.getElementsByClassName('form-control input-border-bottom libelle-question');
    let lib_question = content['questions'][i].question;
    qElements[i].value = lib_question;
    let nbModalites = content['questions'][i].modalites.length;
    let nbModalites_apres_ajout_question = document.getElementsByClassName('form-control input-border-bottom input-modalite').length;
    let nbModalites_ajoutees_apres_insertion = (+nbModalites_apres_ajout_question - (+nbModalites_avant_ajout_question));
    let nbModalites_a_ajouter = +nbModalites-(+nbModalites_ajoutees_apres_insertion);
    let olElements = qElements[i].nextElementSibling.getElementsByTagName("ol");

    for(let m = 0; m<nbModalites_a_ajouter;m++){
        let myTemplate = document.getElementById("modalite");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].appendChild(clonedTemplate);
    }
    let mElements = document.getElementsByClassName('form-control input-border-bottom input-modalite');
    for(let j=0;j<nbModalites;j++){
        mElements[+j+(nbModalites_avant_ajout_question)].value = content['questions'][i].modalites[j];
    }
    let modalite_autre = content['questions'][i].modalite_autre;
    if(modalite_autre != ""){
        let myTemplate = document.getElementById("modalite_autre");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].appendChild(clonedTemplate);
        let modaliteAutreElements = olElements[0].getElementsByClassName('form-control input-border-bottom input-modalite autre');
        modaliteAutreElements[0].value = modalite_autre;
    }

    let modalite_nsp = content['questions'][i].modalite_nsp;
    if(modalite_nsp != ""){
        let myTemplate = document.getElementById("modalite_nsp");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].prepend(clonedTemplate);
        let modaliteNSPElements = olElements[0].getElementsByClassName('form-control input-border-bottom input-modalite nsp');
        modaliteNSPElements[0].value = modalite_nsp;
    }

    let modalite_nc = content['questions'][i].modalite_nc;
    if(modalite_nc != ""){
        let myTemplate = document.getElementById("modalite_nc");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].prepend(clonedTemplate);
        let modaliteNSPElements = olElements[0].getElementsByClassName('form-control input-border-bottom input-modalite nc');
        modaliteNSPElements[0].value = modalite_nc;
    }
    let bElements = document.getElementsByClassName('branchement d-block');
    let branchement=[]
    let nbBranchements = (content['questions'][i].branchement[0]).length
    for(let b=0; b<nbBranchements; b++){
        if(content['questions'][i].branchement !=[""]){
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

function edit_question_fermee_multiple(content, i){
    let nbModalites_avant_ajout_question = document.getElementsByClassName('form-control input-border-bottom input-modalite').length;
    insert_question("fermee_multiple");
    let qElements=document.getElementsByClassName('form-control input-border-bottom libelle-question');
    let lib_question = content['questions'][i].question;
    qElements[i].value = lib_question;
    let nbModalites = content['questions'][i].modalites.length;
    let nbModalites_apres_ajout_question = document.getElementsByClassName('form-control input-border-bottom input-modalite').length;
    let nbModalites_ajoutees_apres_insertion = (+nbModalites_apres_ajout_question - (+nbModalites_avant_ajout_question));
    let nbModalites_a_ajouter = +nbModalites-(+nbModalites_ajoutees_apres_insertion);
    let olElements = qElements[i].nextElementSibling.getElementsByTagName("ol");

    for(let m = 0; m<nbModalites_a_ajouter;m++){
        let myTemplate = document.getElementById("modalite");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].appendChild(clonedTemplate);
    }
    let mElements = document.getElementsByClassName('form-control input-border-bottom input-modalite');
    for(let j=0;j<nbModalites;j++){
        mElements[+j+(nbModalites_avant_ajout_question)].value = content['questions'][i].modalites[j];
    }
    let modalite_autre = content['questions'][i].modalite_autre;
    if(modalite_autre != ""){
        let myTemplate = document.getElementById("modalite_autre");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].appendChild(clonedTemplate);
        let modaliteAutreElements = olElements[0].getElementsByClassName('form-control input-border-bottom input-modalite autre')
        modaliteAutreElements[0].value = modalite_autre;
    }
    let modalite_nsp = content['questions'][i].modalite_nsp;
    if(modalite_nsp != ""){
        let myTemplate = document.getElementById("modalite_nsp");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].prepend(clonedTemplate);
        let modaliteNSPElements = olElements[0].getElementsByClassName('form-control input-border-bottom input-modalite nsp');
        modaliteNSPElements[0].value = modalite_nsp;
    }
    let modalite_nc = content['questions'][i].modalite_nc;
    if(modalite_nc != ""){
        let myTemplate = document.getElementById("modalite_nc");
        clonedTemplate = myTemplate.content.cloneNode(true);
        olElements[0].prepend(clonedTemplate);
        let modaliteNSPElements = olElements[0].getElementsByClassName('form-control input-border-bottom input-modalite nc');
        modaliteNSPElements[0].value = modalite_nc;
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
    let nombre_reponse = content['questions'][i].nombre_reponse;
    let nElements = document.getElementsByClassName('input-border-bottom saisie-number');
    let idx_nb_reponses = +nElements.length -1;
    if(nombre_reponse !== ""){
        nElements[idx_nb_reponses].value = nombre_reponse;
    }
    let rep_obligatoire = content['questions'][i].obligatoire;
    let oElements=document.getElementsByClassName('form-check-input obligatoire');
    let idx_rep_obligatoire = +oElements.length -1;
    if(rep_obligatoire == "true"){
        oElements[idx_rep_obligatoire].checked = true;
    }
    let reponse_ordonnee = content['questions'][i].reponse_ordonnee;
    let rElements=document.getElementsByClassName('form-check-input ordonnee');
    let idx_rep_ordonnee = +rElements.length -1;
    if(reponse_ordonnee == "true"){
        rElements[idx_rep_ordonnee].checked = true;
    }
}
//Récupérer la valeur de la modalité avant le changement
function modalite_value_before_change(val){
    sessionStorage.setItem("oldValue_modalite", val);
}
//Reporter le changement sur le branchement affecté
function modify_branchement_content_after_modalite_change(sender, val){
    let oldValue = sessionStorage.getItem("oldValue_modalite");
    let branchement = sender.parentNode.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value;
    let obj = JSON.parse(branchement);
    let nbBranchements = Object.keys(obj).length;
    for(let b=0;b<nbBranchements;b++){
        if(obj[b][b].modalite == oldValue){
            obj[b][b].modalite = val;
        };
    }
    sender.parentNode.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value = JSON.stringify(obj);
}

function controle_nombre_reponses(sender){
    let mElements = sender.parentNode.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.children[0].getElementsByTagName("li");
    let nbModalites = 0;
    for(let i=0; i<mElements.length;i++){
        if(mElements[i].children[0].children[0].className !='form-control input-border-bottom input-modalite nsp' && mElements[i].children[0].children[0].className !='form-control input-border-bottom input-modalite nc'){
            nbModalites++;
        }
    }
    let aElements = sender.parentNode.getElementsByTagName("input");
    let input = aElements[0].value;
    if (input > nbModalites){
        aElements[0].value = nbModalites;
    }
}
