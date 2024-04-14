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
        console.log(menuList);
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
    var titleHeight = window.getComputedStyle(document.getElementsByClassName("text")[1]).height, textHeight;
    if(document.getElementById("markdown") != undefined) textHeight = window.getComputedStyle(document.getElementById("markdown")).height;
    else textHeight = "0px";
    var titleHeightNumber = Number(titleHeight.substr(0, titleHeight.length - 2)), textHeightNumber = Number(textHeight.substr(0, textHeight.length - 2));
    var totalHeight = Math.max(titleHeightNumber + textHeightNumber + 22.5, document.getElementsByClassName("whole")[0].scrollHeight - 170);
    document.getElementsByClassName("article")[0].style.height = totalHeight.toString() + "px"; 
    document.getElementsByClassName("menu")[0].style.height = totalHeight.toString() + "px"; 
}
window.onload = function() {
    changeSize();
}
window.onresize = function() {
    changeSize();
}