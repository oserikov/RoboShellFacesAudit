function showPhoto(n) {
    var imgindoc = document.getElementById("info"+n.toString()).getElementsByTagName('img')[0];
    imgindoc.src = "cat-adult-landing-hero-"+n.toString()+".jpg";
}

function updateContent(n) {
    var paras = document.getElementsByClassName('info');

    while(paras[0])
        paras[0].parentNode.removeChild(paras[0]);

    var url = "https://roboshellcognitivelogic.azurewebsites.net/api/LastPhotos?number=" + n;

    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload  = function() {
        var jsonResponse = req.response;
        for (var i = 0; i < jsonResponse.length; i++) {
            
            var div = document.createElement('div');
            div.className = "info";

            var image = new Image();
            image.src = 'data:image/png;base64,'+jsonResponse[i].Photo;
            image.className = "infoCol";
            div.appendChild(image);

            var textDiv = document.createElement('div');
            textDiv.className = "infoCol";
            
            var ageText = document.createElement('p');
            ageText.innerHTML = "Возраст: " + jsonResponse[i].Age;

            var genderText = document.createElement('p');
            genderText.innerHTML = "Пол: " + jsonResponse[i].Gender;

            textDiv.appendChild(ageText);
            textDiv.appendChild(genderText);

            div.appendChild(textDiv);

            document.getElementById("content_container").appendChild(div);
        }
        // do something with jsonResponse
    };
    req.send(null);

}



window.onload = function () {
    updateContent(5);
};


// window.onresize = function () {
//     prettyResizeBottomMarginOfContentContainer();
//     checkOverflow();
//     GetContainerSize();
// };
