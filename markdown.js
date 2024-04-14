var markdownFile = new XMLHttpRequest();
markdownFile.open("GET", "./" + title + ".markdownText", true);
markdownFile.onreadystatechange = function() {
    if(markdownFile.readyState === 4 && markdownFile.status === 200) {
        var markdownText = marked.parse(markdownFile.responseText), resultText = "";
        for(var i = 0, b1 = 1, b2 = 1; i < markdownText.length; i++) {
            if(i >= markdownText.length - 2 || markdownText[i] != '<' || markdownText[i + 1] != 'a' || markdownText[i + 2] != ' ') resultText += markdownText[i];
            else {
                resultText += "<a class=\"link\" ";
                i += 2;
            }
        } 
        markdownText = resultText, resultText = "";
        for(var i = 0, b1 = 1, b2 = 1; i < markdownText.length; i++) {
            if(markdownText[i] != '$') resultText += markdownText[i];
            else if(i < markdownText.length - 1 && markdownText[i + 1] != '$') {
                if(b1) resultText += "\\(";
                else resultText += "\\)";
                b1 = !b1;
            } else if(markdownText[i + 1] == '$') {
                if(b2) resultText += "\\[";
                else resultText += "\\]";
                b2 = !b2;
                i++;
            }
        }
        document.getElementById("markdown").innerHTML = resultText;

        hljs.highlightAll();
        
        document.getElementById("title").innerText = title;
        document.title = title + " - tder の Blogs";
        document.getElementById("tag").innerText = "「" + tag + "」";
        document.getElementById("tag").href = "/menu/" + tag + ".html";
        document.getElementById("date").innerHTML = "&nbsp;" + date; 

        changeSize();
    }
};
markdownFile.send();