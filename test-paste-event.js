function isGoogleDocType(type) {
    var gdocsType = 'google-docs';
    // types identified for gdocs:
    // "application/x-vnd.google-docs-image-clip+wrapped"
    // "application/x-vnd.google-docs-document-slice-clip+wrapped"
    return type.search(gdocsType) > -1;
}

function hasBeenPastedFromGoogleDocs( orgTypes ){
    // As per https://html.spec.whatwg.org/multipage/interaction.html#datatransfer
    // types should be an array containing the available formats that were set on copy;
    // some browsers, as Firefox, return a DOMStringList instead, see
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMStringList
    var types = [];
    if (orgTypes.contains) {
        types = Array.from(orgTypes);
    } else {
        types = orgTypes;
    }
    return (Array.isArray(types) && (types.findIndex(isGoogleDocType) > -1));
}

document.addEventListener('paste', function(e){
    var log = document.getElementById('log');
    log.innerHTML = "";
    var types = e.clipboardData.types;
    if(hasBeenPastedFromGoogleDocs(types)){
        var link = document.createElement("a");
        link.href='https://flic.kr/p/qcdMSr';
        var img = document.createElement("img");
        img.src = "picture.jpg";
        link.appendChild(img);
        log.appendChild(link);
    }
});
