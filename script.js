window.onload = function() {
    document.getElementById("title").innerText = title;
    document.title = title + " - tder の Blogs";
    document.getElementById("tag").innerText = "「" + tag + "」";
    document.getElementById("tag").href = "/menu/" + tag + ".html";
    document.getElementById("date").innerHTML = "&nbsp;" + date;
}
var xhr = new XMLHttpRequest();
xhr.open("GET", "./" + title + ".md", true);
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);   
        var md = marked.parse(xhr.responseText), re = "";
        for(var i = 0, b1 = 1, b2 = 1; i < md.length; i++) {
            if(i >= md.length - 2 || md[i] != '<' || md[i + 1] != 'a' || md[i + 2] != ' ') re += md[i];
            else {
                re += "<a class=\"link\" ";
                i += 2;
            }
        } 
        md = re, re = "";
        for(var i = 0, b1 = 1, b2 = 1; i < md.length; i++) {
            if(md[i] != '$') re += md[i];
            else if(i < md.length - 1 && md[i + 1] != '$') {
                if(b1) re += "\\(";
                else re += "\\)";
                b1 = !b1;
            } else if(md[i + 1] == '$') {
                if(b2) re += "\\[";
                else re += "\\]";
                b2 = !b2;
                i++;
            }
        }
        console.log(re);
        document.getElementById("markdown").innerHTML = re; 
    }
};
xhr.send();