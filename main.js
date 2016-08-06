window.onload=function()
{
	var body=document.querySelector("body");
	document.addEventListener("mouseup",eventListener)
	// document.addEventListener("ondblclick",eventListener)
}
function eventListener()
{
	var text=window.getSelection().toString();
	if(text){
		callExtension({start:true});
		get('https://imdb.mgsplay.club/api/'+text,function(resp)
		{
			if(resp.rating){
				callExtension({imdb:resp});
			}
		})
	}/*else{
		callExtension({clear:true})
	}*/
}
function get(url,callBack)
{
	var xhr=new XMLHttpRequest();
	xhr.open('GET',url,true);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200)
				callBack(JSON.parse(xhr.responseText));
			else
				callExtension({clear:true});
		}
	};
}
function callExtension(msg){
	chrome.runtime.sendMessage(msg,function(resp)
	{
	});
}
// alert('called');