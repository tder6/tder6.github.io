changeSize = function() {
    document.body.style.backgroundSize = Math.max(document.body.scrollWidth, 1500).toString() + "px"; 
    var h1 = window.getComputedStyle(document.getElementsByClassName("text")[1]).height;
    var h2;
    if(document.getElementById("markdown") != undefined) h2 = window.getComputedStyle(document.getElementById("markdown")).height;
    else h2 = "0px";
    var n1 = Number(h1.substr(0, h1.length - 2));
    var n2 = Number(h2.substr(0, h2.length - 2));
    var height = Math.max(n1 + n2 + 15, document.getElementsByClassName("whole")[0].scrollHeight - 170);
    document.getElementsByClassName("article")[0].style.height = height.toString() + "px"; 
    document.getElementsByClassName("menu")[0].style.height = height.toString() + "px"; 
}
window.onload = function() {
    changeSize();
}
window.onresize = function() {
    changeSize();
}