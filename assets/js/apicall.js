// variables here
var animal = document.getElementById("add");
var btn = document.getElementById("userInput");
var avatar = document.getElementById("avatar");
var userName = document.getElementById("username");
var val = document.getElementById('input');
//function to be called on submit
btn.addEventListener("click", function(){
	val = val.value;
	console.log(val);
	var ourRequest = new XMLHttpRequest();
	var ourRequest2 = new XMLHttpRequest();
	var ourRequest3 = new XMLHttpRequest();
	var ourRequest4 = new XMLHttpRequest();

	ourRequest.open('GET', 'https://api.github.com/users/' + val + '/starred');
	ourRequest2.open('GET', 'https://api.github.com/users/' + val);
	ourRequest3.open('GET', 'https://api.github.com/users/' + val + '/repos');
	ourRequest4.open('GET', 'https://api.github.com/users/' + val + '/orgs');

	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		if (ourData.message == "Not Found") {
			alert("User not found, please enter a correct username");
			window.location.reload();
		}
		else
		{
		renderHTML(ourData);
	}
	};
	
	ourRequest2.onload = function(){
		var newData = JSON.parse(ourRequest2.responseText);
		rendernow(newData);
	};

	ourRequest3.onload = function(){
		var repoData = JSON.parse(ourRequest3.responseText);
		renderRepo(repoData);
	}

	ourRequest4.onload = function(){
		var orgsData = JSON.parse(ourRequest4.responseText);
		renderOrgs(orgsData);
	}
	ourRequest.send();
	ourRequest2.send();
	ourRequest3.send();
	ourRequest4.send();
});

// various functions for api call
function rendernow(somedata) {
	var somestring = "";
	var otherString = "";
	var date = somedata.created_at.substr(8,2);
	var month = somedata.created_at.substr(0,10).substr(5,5).substr(0,2);
	var year = somedata.created_at.substr(0,4);
	switch(month){
		case '01': month = "January";
		break;
		case '02': month = "February";
		break;
		case '03': month = "March";
		break;
		case '04': month = "April";
		break;
		case '05': month = "May";
		break;
		case '06': month = "June";
		break;
		case '07': month = "July";
		break;
		case '08': month = "August";
		break;
		case '09': month = "September";
		break;
		case '10': month = "October";
		break;
		case '11': month = "November";
		break;
		case '12': month = "December";
		break;		   
	}

	var beautyDate = date + " " + month + " " + year;

	avatar.src = somedata.avatar_url;

	document.getElementById("githuburl").href = somedata.html_url;

	userName.insertAdjacentHTML('afterbegin', somedata.name);

	document.getElementById("bio").insertAdjacentHTML('afterbegin', somedata.bio);

	somestring += "followers:  " + somedata.followers + "<br>" + "following:  " + somedata.following;
	document.getElementById("follow").insertAdjacentHTML('afterbegin', somestring);
	document.getElementById("joined").insertAdjacentHTML('afterbegin', "Joined on: " + beautyDate);
	otherString += ""
}

function renderHTML(data) {
	var htmlString = "";
	var j = 1;
	for (var i = 0; i < data.length; i++)
	{
		htmlString += '<li><span class="icon major style'+j+' fa-code"></span><h3>'+data[i].name+'</h3><p>' + data[i].description + '</p></li>'
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

function renderRepo(data) {
	var dataString = "";
	for (var i = 0; i < data.length; i++) {
		dataString += '<tr><td style="text-align: justify;">' + data[i].name + '</td><td style="text-align: justify;">' + data[i].description + '</td><td><a href="' + data[i].html_url + '">Repo</a>' + '</td></tr>';
	}
	
	document.getElementById("repos").insertAdjacentHTML('afterbegin', dataString);
	document.getElementById("repocount").insertAdjacentHTML('afterbegin', data.length + " Repositories");
}

function renderOrgs(data){
	var orgString = "";
	for (var i = 0; i < data.length; i++) {
		if (data.length == 1)
		{
			orgString += '<div class="12u"><span class="image fit"><img src="' + data[i].avatar_url + '"/>' + data[i].login + '</span></div>';
		}
		else if(data.length == 2)
		{
			orgString += '<div class="6u"><span class="image fit"><img src="' + data[i].avatar_url + '"/>' + data[i].login + '</span></div>';
		}
		else
		{
				orgString += '<div class="4u"><span class="image fit"><img src="' + data[i].avatar_url + '"/>' + '<strong>' + data[i].login + '</strong>' + '</span></div>';
		}

	}
	document.getElementById("insertorgs").insertAdjacentHTML('afterbegin', orgString);
	document.getElementById("orgs").insertAdjacentHTML('afterbegin', data.length + " Organisations");
}