var markdownFile = new XMLHttpRequest(), markdownContext;
markdownFile.open("GET", "/articles/" + title + ".md", true);
markdownFile.onreadystatechange = function() {
    if(markdownFile.readyState === 4 && markdownFile.status === 200) {
		var readText = markdownFile.responseText, resultText = "";
		markdownContext = readText;
		for(var i = 0, b1 = 1, b2 = 1; i < readText.length; i++) {
            if(readText[i] === '\\' && (!b1 || !b2)) resultText += "\\\\";
			else if(readText[i] === '~' && (!b1 || !b2)) resultText += "\\~";
			else resultText += readText[i];
			if(readText[i] !== '$') continue;
            else if(i < readText.length - 1 && readText[i + 1] !== '$') b1 = !b1;
            else if(i < readText.length - 1 && readText[i + 1] === '$') {
                b2 = !b2;
                i++;
				resultText += readText[i];
            }
        }
        var markdownText = marked.parse(resultText); resultText = "";
        for(var i = 0, b1 = 1, b2 = 1; i < markdownText.length; i++) {
            if(i < markdownText.length - 2 && markdownText.substr(i, 3) === "<a ") {
				resultText += "<a class=\"link\" ";
				i += 2;
			} else resultText += markdownText[i];
        } 
        markdownText = resultText, resultText = "";
        for(var i = 0, b1 = 1, b2 = 1; i < markdownText.length; i++) {
            if(markdownText[i] !== '$') resultText += markdownText[i];
            else if(i < markdownText.length - 1 && markdownText[i + 1] !== '$') {
                if(b1) resultText += "\\(";
                else resultText += "\\)";
                b1 = !b1;
            } else if(i < markdownText.length - 1 && markdownText[i + 1] === '$') {
                if(b2) resultText += "\\[";
                else resultText += "\\]";
                b2 = !b2;
                i++;
            }
        }
        document.getElementById("markdown").innerHTML = resultText;
        hljs.highlightAll();
        document.getElementById("title").innerText = title;
        document.title = title + " - tder の Blogs (*/ω＼*)";
        document.getElementById("tag").innerText = "「" + tag + "」";
        document.getElementById("tag").href = "/menu/" + tag + ".html";
        document.getElementById("date").innerHTML = "&nbsp;" + date; 
        changeSize();
		setTitle();
    }
};
markdownFile.send();
copyMarkdown = async() => {
	await navigator.clipboard.writeText(markdownContext);
}
setCopyMarkdown = function() {
	var copyMarkdownHtml = "<div onclick=\"copyMarkdown();\">Copy Markdown</div>";
	var copyMarkdownElement = document.createElement("div");
	copyMarkdownElement.className = "copy flex";
	copyMarkdownElement.innerHTML = copyMarkdownHtml;
    document.body.appendChild(copyMarkdownElement);
}
setCopyMarkdown();