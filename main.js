
window.onload=function()
{
	var body=document.querySelector("body");
	document.addEventListener("click",function()
	{
		var text=window.getSelection().toString();
		if(text){
			callExtension({start:true});
			get('https://imdb.mgsplay.club/api/'+text,function(resp)
			{
				console.log(resp);
				if(resp.rating){
					callExtension({imdb:resp});
				}
			})
		}
	})
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
		console.log('received message=====');
		console.log(resp);
	})
}
// alert('called');