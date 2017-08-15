// variables here
var animal = document.getElementById("add");
var btn = document.getElementById("userInput");
var avatar = document.getElementById("avatar");
var userName = document.getElementById("username");

//function to be called on submit
btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	var ourRequest2 = new XMLHttpRequest();
	ourRequest.open('GET', 'https://api.github.com/users/Anupam-dagar/starred');
	ourRequest2.open('GET', 'https://api.github.com/users/Anupam-dagar');
	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		console.log(ourData);
	};
	ourRequest2.onload = function(){
		var newData = JSON.parse(ourRequest2.responseText);
		rendernow(newData);
		console.log(newData);
	};
	ourRequest.send();
	ourRequest2.send();
});

// various functions for api call
function rendernow(somedata) {
	var somestring = "";

	avatar.src = somedata.avatar_url;

	document.getElementById("githuburl").href = somedata.html_url;

	userName.insertAdjacentHTML('afterbegin', somedata.name);

	document.getElementById("bio").insertAdjacentHTML('afterbegin', somedata.bio);

	somestring += "followers:  " + somedata.followers + "<br>" + "following:  " + somedata.following;
	document.getElementById("follow").insertAdjacentHTML('afterbegin', somestring);
}
function renderHTML(data) {
	var htmlString = "";
	var j = 1;
	for (var i = 0; i < data.length; i++)
	{
		console.log(j);
		htmlString += '<li><span class="icon major style'+j+' fa-code"></span><h3>'+data[i].name+'</h3><p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p></li>'
		if(j == 3)
		{
			j = 1;
		}
		else
		{
			j++;
		}
	}
	animal.insertAdjacentHTML('afterbegin', htmlString);
}
function otherName(){
	var input = document.getElementById("userInput").value;
}