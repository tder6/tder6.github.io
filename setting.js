menuCompareFunction = function(a, b) {
    var dictionary = {"Sol" : 2, "Tools" : 1};
    if(dictionary[a] > dictionary[b]) return -1;
    else if(dictionary[a] < dictionary[b]) return 1;
    else return 0;
}
var menuFile = new XMLHttpRequest();
menuFile.open("GET", "/list/Menu.txt", true);
menuFile.onreadystatechange = function() {
    if(menuFile.readyState === 4 && menuFile.status === 200) {
        var menuText = menuFile.responseText, eachLine = "", menuList = []; 
        menuText += "\n";
        for(var i in menuText) {
            if(menuText[i] === '\r') continue;
            if(menuText[i] !== '\n') eachLine += menuText[i];
            else {
                menuList.push(eachLine);
                eachLine = "";
            }
        }
        menuList.sort(menuCompareFunction);
        var articleElement = document.getElementsByClassName("menu")[0];
        for(var i in menuList) {
            var newArticle = document.createElement("div");
            newArticle.className = "flex";
            if(tag !== menuList[i]) newArticle.innerHTML = "<a href=\"/menu/" + menuList[i] + ".html\">" + menuList[i] + "</a>";
            else if(typeof(goBackToIndex) === "undefined") newArticle.innerHTML = "<a href=\"/menu/" + menuList[i] + ".html\"><strong>「" + menuList[i] + "」</strong></a>";
            else newArticle.innerHTML = "<a href=\"/\"><strong>「" + menuList[i] + "」</strong></a>";
            articleElement.appendChild(newArticle);
        }
    }
}
menuFile.send();
changeSize = function() {
    document.body.style.backgroundSize = Math.max(document.body.scrollWidth, 1500).toString() + "px"; 
	document.body.getElementsByClassName("article")[0].style.width = (document.body.scrollWidth - 360).toString() + "px";
    var titleHeight = window.getComputedStyle(document.getElementsByClassName("text")[1]).height, textHeight;
    if(document.getElementById("markdown") != undefined) textHeight = window.getComputedStyle(document.getElementById("markdown")).height;
    else {
		var linkList = document.getElementsByClassName("article")[0].getElementsByClassName("flex");
		textHeight = linkList.length * 27 - 20 + "px";
	}
    var titleHeightNumber = Number(titleHeight.substr(0, titleHeight.length - 2)), textHeightNumber = Number(textHeight.substr(0, textHeight.length - 2));
	var totalHeight = Math.max(titleHeightNumber + textHeightNumber + 22.5, document.getElementsByClassName("whole")[0].scrollHeight - 170);
    document.getElementsByClassName("article")[0].style.height = totalHeight.toString() + "px"; 
    document.getElementsByClassName("menu")[0].style.height = totalHeight.toString() + "px"; 
}
window.onload = function() {
    changeSize();
	setScroll();
	setCopyRight();
	setTitle();
	setImage();
}
window.onresize = function() {
    changeSize();
}
setScroll = function() {
    var scrollStyle = `
        <style css-id="scroll">
            ::-webkit-scrollbar {            
                width: 0px;
            }
        </style>
    `
    var newElement = document.createElement("newElement");
    var scrollNode = document.querySelector("[css-id='scroll']") || null;
    if(scrollNode) document.querySelector("head").removeChild(document.querySelector("[css-id='scroll']"));
    newElement.innerHTML = scrollStyle;
    var newScrollNode = newElement.querySelector("[css-id='scroll']");
    document.getElementsByTagName("head")[0].appendChild(newScrollNode);
}
setCopyRight = function() {
	var copyRightHtml = `
		<div class="inner">©Since 2024 By&nbsp;<a class="link" href="https://github.com/tder6">tder</a></div>
		<div class="icon">
			<a href="https://TBC." title="Based on Bloger."><img src="https://img.shields.io/badge/Frame-Bloger-c63a2a?logo=Framer" alt=""></a>
			&nbsp;
			<a href="https://marked.js.org/" title="Markdown powered by Marked.js."><img src="https://img.shields.io/badge/Markdown-Marked-c0392b?logo=Markdown" alt=""></a>
			&nbsp;
			<a href="https://www.mathjax.org/" title="LaTeX powered by MathJax."><img src="https://img.shields.io/badge/LaTeX-MathJax-b52e31?logo=Latex" alt=""></a>
			&nbsp;
			<a href="https://highlightjs.org/" title="Code highlighting powered by Highlight.js."><img src="https://img.shields.io/badge/Code-Highlight-96281b?logo=Codecademy" alt=""></a>
			&nbsp;
			<a href="https://github.com/tder6/tder6.github.io/" title="Source code hosted on Github."><img src="https://img.shields.io/badge/Source-Github-822721?logo=Github" alt=""></a>
			&nbsp;
			<a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" title="Using BY-NC-SA 4.0 license."><img src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-630820?style=flat&logo=Claris" alt=""></a>
		</div>
	`
	var copyRightElement = document.createElement("div");
	copyRightElement.className = "flex copyright";
	copyRightElement.innerHTML = copyRightHtml;
    document.body.appendChild(copyRightElement);
}
setTitle = function() {
	var linkList = document.getElementsByTagName("a");
	for(var i in linkList) {
		if(!(i >= 0 && i < linkList.length)) continue;
		linkList[i].style.cursor = "none";
		linkList[i].addEventListener('mouseover', function(event) {
			document.body.getElementsByClassName("pointer")[0].style.height = document.body.getElementsByClassName("pointer")[0].style.width = "15px";
		});
		linkList[i].addEventListener('mouseout', function(event) {
			document.body.getElementsByClassName("pointer")[0].style.height = document.body.getElementsByClassName("pointer")[0].style.width = "10px";
		});
		if(linkList[i].className !== "link") continue;
		linkList[i].title = "Link to " + linkList[i].href + ".";
	}
}
setPointer = function() {
	var pointerElement = document.createElement("div");
	pointerElement.className = "pointer";
    document.body.appendChild(pointerElement);
}
var lastClientX = 0, lastClientY = 0;
function updatePointerPosition(e) {
	var pointer = document.getElementsByClassName("pointer")[0];
	if(typeof(pointer) === "undefined") setPointer();
	var x = e.clientX, y = e.clientY + window.scrollY;
	if(typeof(e.clientX) === "undefined") x = lastClientX;
	else lastClientX = e.clientX;
	if(typeof(e.clientY) === "undefined") y = lastClientY + window.scrollY;
	else lastClientY = e.clientY;
    pointer.style.left = x + 'px';
    pointer.style.top = y + 'px';
}
document.addEventListener('mousemove', updatePointerPosition);
document.addEventListener('scroll', updatePointerPosition);
document.body.style.cursor = "none";
document.body.addEventListener('mouseout', function(event) {
	var pointerList = document.getElementsByClassName("pointer");
    if(!event.relatedTarget || (event.relatedTarget === null)) {
		for(var i in pointerList) {
			if(!(i >= 0 && i < pointerList.length)) continue;
			document.body.removeChild(pointerList[i]);
		}
	}
});
document.body.addEventListener('mouseover', function(event) {
    if(!event.relatedTarget || (event.relatedTarget === null)) setPointer();
});