chrome.runtime.onMessage.addListener(function(req,sender,sendResponse)
{
	console.log('response received');
	console.log(req);
	if(req.start){
		setBadgeText('..');
	}
	if(req.imdb){
		changeURL(req.imdb.url);
		setTitle(req.imdb.rating.name);
		setBadgeText(req.imdb.rating.rating,'#000');
	}
	
});
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