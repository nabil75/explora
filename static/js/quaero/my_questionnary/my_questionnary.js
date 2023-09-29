
function find_id_questionnary(sender){
    var aElements = sender.parentNode.getElementsByTagName("img");
    var aElementsLength = aElements.length;
    var id_questionnary =""
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
           id_questionnary = aElements[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        }
    }
    return id_questionnary
}
function find_url_questionnary(sender){
    var aElements = sender.parentNode.getElementsByTagName("img");
    var aElementsLength = aElements.length;
    var url =""
    for (var i = 0; i < aElementsLength; i++){
        if (aElements[i] == sender) {
           url = aElements[i].getAttribute('data-url');
        }
    }
    return url
}

function suppr_questionnary(sender){
    var id_questionnary = find_id_questionnary(sender);
    var url = find_url_questionnary(sender);
    showSpinner();
    $.ajax({
        url: url,
        method: 'get',
        data: {
            id_questionnary: id_questionnary
        },
        success: function (response) {
            location.reload();
            tempAlert('Questionnaire supprimé.',2000);
            hideSpinner();
        },
        error: function() {
            tempAlert('Désolé le questionnaire n\'a pas pu être supprimé, veuillez recommencer',2000);
        }
    });
}

function edit_questionnary(sender){
    var id_questionnary = find_id_questionnary(sender);
    var url = find_url_questionnary(sender);
}

function tempAlert(msg,duration){
    var el = document.createElement("div");
    el.setAttribute("class","message");
    el.innerHTML = msg;
    setTimeout(function(){
        el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}