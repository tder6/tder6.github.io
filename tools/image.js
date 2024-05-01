fetch('https://moe.jitsu.top/img/?sort=r18&type=json&num=1')
.then(response => {
	return response.json();
})
.then(data => {
	for(var i in data.pics) {
		var newImg = document.createElement("img");
		newImg.src = data.pics[i];
		newImg.style.height = (Number((document.getElementsByClassName("article")[0].style.height).substr(0, (document.getElementsByClassName("article")[0].style.height).length - 2)) - 72).toString() + "px";
		console.log(newImg);
		document.getElementById("markdown").appendChild(newImg);
	}
})
document.getElementById("markdown").className += " flex";