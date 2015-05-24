var session = null;

$( document ).ready(function(){
    var loadCastInterval = setInterval(function(){
        if (chrome.cast.isAvailable) {
                console.log('Cast has loaded.');
                clearInterval(loadCastInterval);
                initializeCastApi();
        } else {
                console.log('Unavailable');
        }
    }, 1000);
});

function initializeCastApi() {
    var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
            sessionListener,
            receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
};


function sessionListener(e) {
    session = e;
    console.log('New session');
    if (session.media.length != 0) {
        console.log('Found ' + session.media.length + ' sessions.');
    }
}

function receiverListener(e) {
    if( e === 'available' ) {
        console.log("Chromecast was found on the network.");
    } else {
        console.log("There are no Chromecasts available.");
    }
}

function onInitSuccess() {
    console.log("Initialization succeeded");
}

function onInitError() {
    console.log("Initialization failed");
}

$('#castme').click(function(){
    launchApp();
});

function launchApp() {
    console.log("Launching the Chromecast App...");
    chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

function onRequestSessionSuccess(e) {
    console.log("Successfully created session: " + e.sessionId);
    session = e;
    loadMedia();
}

function onLaunchError() {
    console.log("Error connecting to the Chromecast.");
}

$('#stop').click(function(){
    stopApp();
});

function stopApp() {
    session.stop(onStopAppSuccess, onStopAppError);
}

function onStopAppSuccess() {
    console.log('Successfully stopped app.');
}

function onStopAppError() {
    console.log('Error stopping app.');
}

function loadMedia() {
    if (!session) {
        console.log("No session.");
        return;
    }

    // var mediaInfo = new chrome.cast.media.MediaInfo('http://thehqhq.files.wordpress.com/2013/03/fractal00011.jpg', 'image/jpg');
    // mediaInfo.contentType = 'image/jpg';
	var mediaInfo = new chrome.cast.media.MediaInfo('http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4', 'video/mp4');

    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    request.autoplay = true;
    console.log(request);
    session.loadMedia(request, onLoadSuccess, onLoadError);
}

function onLoadSuccess() {
    console.log('Successfully loaded image.');
}

function onLoadError() {
    console.log('Failed to load image.');
}

function play() {
    window.currentMedia.play(null,
                             mediaCommandSuccessCallback,
                             onError);
}

function pause() {
    window.currentMedia.pause(null,
                             mediaCommandSuccessCallback,
                             onError);
}