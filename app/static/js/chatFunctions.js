var escapeElement = document.createElement('textarea');

function htmlEscape(toClean) {
	escapeElement.textContent = toClean;
	return escapeElement.innerHTML;
}

function htmlUnescape(toClean) {
	escapeElement.innerHTML = toClean;
	return escapeElement.textContent;
}

function handleChatData(chatData) {
    switch(chatData.type) {
        case "chat":
            var author = htmlEscape(chatData.data.from);
            var msg = htmlEscape(chatData.data.msg);
            return "<b>" + author + "</b>: " + msg;
        case "connect_alert":
            var msg = htmlEscape(chatData.data.msg);
            return "<i>" + msg + "</i>";
        case "game_alert":
            var msg = htmlEscape(chatData.data.msg);
            return "<b>System: </b><i>" + msg + "</i>";
        default:
            var errorSpan = $("<span></span>");
            errorSpan.css("color", "red");
            errorSpan.html("<b>Error: invalid chat message received!</b>");
            return errorSpan;
    }
}