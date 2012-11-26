
var Webcam = function() {

    navigator.getMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    var video = document.createElement('video');
    // video.autoplay = "autoplay";
    var videoCanvas = document.createElement('canvas');
    var videoCtx = videoCanvas.getContext('2d');
    var videoWidth, videoHeight, videoTimer;

    /**
     * log when getUserMedia or when video metadata loading fail
     */
    function logError(err) { if(console && console.log) console.log('Error!', err); return false; }

    /**
     * Sets the video dimension
     */
    function setVideoDimension(width, height) {
        video.width = videoCanvas.width = videoWidth = width;
        video.height = videoCanvas.height = videoHeight = height;
    }

    function capture(capture) {
        if(typeof navigator.getMedia !== 'function') {
            throw new Error('Error: browser does not support getUserMedia');
        }

        navigator.getMedia({video: true}, function(localMediaStream){

            var url = window.URL || window.webkitURL;
            video.src = url.createObjectURL(localMediaStream);
            video.play();
            video.onloadedmetadata = logError;
            // videoWidth = video.videoWidth;
            // videoHeight = video.videoHeight;

            startLoop(15, localMediaStream, capture, video);

        }, logError);
        return true;
    }

    function startLoop(interval, stream, capture, video) {
        if(typeof interval !== 'number') interval = 20;

        stopRender();

        videoTimer = setInterval(function(){
            if(stream) {
                var w = videoWidth, h = videoHeight;
                videoCtx.drawImage(video, 0, 0, w, h);
                capture(videoCtx.getImageData(0, 0, w, h));
            }
        }, interval);
    }

    /**
     * Allow pause and play for ascii rendering
     */
    function stopRender() { if(videoTimer) clearInterval(videoTimer); }

    function snapshot() {
        window.open(videoCanvas.toDataURL(), "_blank");
    }

    // init WxH
    setVideoDimension(640, 480);

    return {
        capture : capture,
        getVideo : function() { return video; },
        setVideoDimension: setVideoDimension,
        snapshot : snapshot,
        width : function() { return videoWidth; },
        height : function() { return videoHeight; },

        stopRender: stopRender
    };

}();
