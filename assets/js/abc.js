var animal = document.getElementById("add");
var btn = document.getElementById("userInput");
btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://api.github.com/users/Anupam-dagar/starred');
	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		console.log(ourData);
	};
	ourRequest.send();
});
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