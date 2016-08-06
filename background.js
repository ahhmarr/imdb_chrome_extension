var URL='';
chrome.runtime.onMessage.addListener(function(req,sender,sendResponse)
{
	if(req.start){
		setBadgeText('...',sender.tab.id,'#2EABFE');
	}
	if(req.imdb){
		URL=req.imdb.url;
		changeURL();
		setTitle(req.imdb.rating.name);
		setBadgeWithRatingColor(req.imdb.rating.rating,sender.tab.id);
	}
	if(req.clear){
		setBadgeText('',sender.tab.id);

	}
	
});
function setBadgeWithRatingColor(rating,tabId){
	rating=parseFloat(rating);
	if(isNaN(rating)){
		setBadgeText('');
		return;
	}
	var pallatte={
		a : '#B7B101', //yellow
		b : '#9AC469', //lime green
		c : '#0D9002', //dark green
		d : '#063300', //light pink
		e : '#F00CFF', //dark pink
		f : '#F59356', //light orange
		g : '#EA4D00', //dark orange
		h : '#FA0000' //red
	}
	var color='red';
	if(rating>9){
		color=pallatte.a;
	}else if(rating >8){
		color = pallatte.b;
	}else if(rating>6.8){
		color=pallatte.c;
	}else if(rating>6.6){
		color=pallatte.d;
	}else if(rating >6.0){
		color =pallatte.e;
	}else if(rating>5){
		color = pallatte.f;
	}
	else if(rating>3){
		color = pallatte.g;
	}
	else{
		color = pallatte.h;
	}
	setBadgeText((rating).toString(),tabId,color);
}
function setTitle(text){
	chrome.browserAction.setTitle({title:text});
}
function setBadgeText(text,tabId,bgColor){
	chrome.browserAction.setBadgeText({tabId:tabId,text:text});
	if(bgColor){
		chrome.browserAction.setBadgeBackgroundColor({color:bgColor})
	}
}

function clickListen()
{
	chrome.tabs.create({url:URL});
}
function changeURL(){
	chrome.browserAction.onClicked.removeListener(clickListen);
	chrome.browserAction.onClicked.addListener(clickListen)
}