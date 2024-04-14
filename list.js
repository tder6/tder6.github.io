typeOfProblem = function(text) {
    var problemNumber = "";
    for(var i in text) {
        if(text[i] !== ' ') problemNumber += text[i];
        else break;
    }
    var firstDigit = -1, firstDigitCfAt = -1;
    for(var i = problemNumber.length - 1; i >= 0; i--) {
        if(problemNumber[i] >= '0' && problemNumber[i] <= '9') firstDigit = i;
        else break;
    }
    if(problemNumber[problemNumber.length - 1] >= 'A' && problemNumber[problemNumber.length - 1] <= 'Z') 
        for(var i = problemNumber.length - 2; i >= 0; i--) {
            if(problemNumber[i] >= '0' && problemNumber[i] <= '9') firstDigitCfAt = i;
            else break;
        }
    if(problemNumber.substring(0, firstDigit) === "P") return ["Luogu", Number(problemNumber.substring(firstDigit, problemNumber.length))];
    if(problemNumber.substring(0, firstDigit) === "SP") return ["SP", Number(problemNumber.substring(firstDigit, problemNumber.length))];
    if(problemNumber.substring(0, firstDigit) === "POJ") return ["POJ", Number(problemNumber.substring(firstDigit, problemNumber.length))];
    if(problemNumber.substring(0, firstDigit) === "HDU") return ["HDU", Number(problemNumber.substring(firstDigit, problemNumber.length))];
    if(problemNumber.substring(0, firstDigit) === "UVA") return ["UVA", Number(problemNumber.substring(firstDigit, problemNumber.length))];
    if(problemNumber.substring(0, firstDigit) === "LOJ") return ["LOJ", Number(problemNumber.substring(firstDigit, problemNumber.length))];
    if(problemNumber.substring(0, firstDigitCfAt) == "CF") return ["CF", Number(problemNumber.substring(firstDigitCfAt, problemNumber.length - 1)), problemNumber[problemNumber.length - 1]];
    if(problemNumber.substring(0, firstDigitCfAt) == "AT") return ["AT", Number(problemNumber.substring(firstDigitCfAt, problemNumber.length - 1)), problemNumber[problemNumber.length - 1]];
    return "NaN";
}
isProblem = function(text) {
    return typeof(typeOfProblem(text)) === "object" && typeOfProblem(text)[0] !== "NaN";
}
compareProblem = function(a, b) {
    var typeOfA = typeOfProblem(a), typeOfB = typeOfProblem(b);
    if(typeOfA[0] === typeOfB[0]) {
        if(typeOfA[1] < typeOfB[1]) return -1;
        else if(typeOfA[1] > typeOfB[1]) return 1;
        else {
            if(typeOfA[0] !== "CF" && typeOfB[0] != "AT") return 0;
            else if(typeOfA[2] < typeOfB[2]) return -1;
            else if(typeOfA[2] > typeOfB[2]) return 1;
            else return 0;
        }
    } else {
        var dictionary = {"Luogu" : 8, "AT" : 7, "CF" : 6, "LOJ" : 5, "POJ" : 4, "HDU" : 3, "UVA" : 2, "SP" : 1};
        if(dictionary[typeOfA[0]] > dictionary[typeOfB[0]]) return -1;
        else if(dictionary[typeOfA[0]] < dictionary[typeOfB[0]]) return 1;
        else return NaN;
    }
}
compareFunction = function(a, b) {
    if(isProblem(a) && isProblem(b)) return compareProblem(a, b);
    else if(isProblem(a) && !isProblem(b)) return -1;
    else if(!isProblem(a) && isProblem(b)) return 1;
    else if(a > b) return -1;
    else if(a < b) return 1;
    else return 0;
}
var listFile = new XMLHttpRequest();
listFile.open("GET", "/list/" + tag + ".txt", true);
listFile.onreadystatechange = function() {
    if(listFile.readyState === 4 && listFile.status === 200) {
        var listText = listFile.responseText, eachLine = "", titleList = []; 
        listText += "\n";
        for(var i in listText) {
            if(listText[i] === '\r') continue;
            if(listText[i] !== '\n') eachLine += listText[i];
            else {
                titleList.push(eachLine);
                eachLine = "";
            }
        }
        titleList.sort(compareFunction);
        var articleElement = document.getElementsByClassName("article")[0];
        for(var i in titleList) {
            var newArticle = document.createElement("div");
            newArticle.className = "flex";
            newArticle.innerHTML = "<a href=\"/articles/" + titleList[i] + ".html\">" + titleList[i] + "</a>";
            articleElement.appendChild(newArticle);
        }
        if(tag !== "All") document.title = "「" + tag + "」" + "- tder の Blogs";
    }
}
listFile.send();