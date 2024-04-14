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