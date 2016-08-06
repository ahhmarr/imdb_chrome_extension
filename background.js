chrome.runtime.onMessage.addListener(function(req,sender,sendResponse)
{
	if(req.start){
		setBadgeText('...','#2EABFE');
	}
	if(req.imdb){
		changeURL(req.imdb.url);
		setTitle(req.imdb.rating.name);
		setBadgeWithRatingColor(req.imdb.rating.rating);
	}
	if(req.clear){
		setBadgeText('');

	}
	
});
function setBadgeWithRatingColor(rating){
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
	setBadgeText((rating).toString(),color);
}
function setTitle(text){
	chrome.browserAction.setTitle({title:text});
}
function setBadgeText(text,bgColor){
	chrome.browserAction.setBadgeText({text:text});
	if(bgColor){
		chrome.browserAction.setBadgeBackgroundColor({color:bgColor})
	}
}
function changeURL(url){
	chrome.browserAction.onClicked.addListener(function(activeTab)
	{
		chrome.tabs.create({url:url});
	})
}