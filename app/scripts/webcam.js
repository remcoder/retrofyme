
var Webcam = function() {
    "use strict";

    navigator.getMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    var video = document.createElement('video');
    var videoCanvas = document.createElement('canvas');
    var videoCtx = videoCanvas.getContext('2d');
    var videoWidth, videoHeight, videoTimer;

    /**
     * log when getUserMedia or when video metadata loading fail
     */
    function logError(err) { if(console && console.log) console.log('Error!', err); return false; }

    function setSize(width, height) {
        video.width = videoCanvas.width = videoWidth = width;
        video.height = videoCanvas.height = videoHeight = height;
    }

    function capture(captureImgData, onstart) {
        if(typeof navigator.getMedia !== 'function') {
            throw new Error('browser does not support getUserMedia');
        }

        navigator.getMedia({video: true}, function(localMediaStream){

            onstart();

            if (window.opera)
            {
                video.src = localMediaStream;
            }
            else if (navigator.mozGetUserMedia) {
                video.mozSrcObject = localMediaStream;
            }
            else
            {
                video.srcObject = localMediaStream;
            }
            video.play();
            // video.onloadedmetadata = logError;

            startCapture(15, localMediaStream, captureImgData, video);

        }, logError);
        return true;
    }

    function startCapture(interval, stream, captureImgData, video) {
        stopCapture();

        videoTimer = setInterval(function(){
            if(stream) {
                var w = videoWidth, h = videoHeight;
                videoCtx.drawImage(video, 0, 0, w, h);
                captureImgData(videoCtx.getImageData(0, 0, w, h));
            }
        }, interval);
    }

    function stopCapture() { if(videoTimer) clearInterval(videoTimer); }

    function snapshot() {
        window.open(videoCanvas.toDataURL(), "_blank");
    }

    return {
        capture : capture,
        getSize : function() { return { width : videoWidth, height : videoHeight} },
        getVideoElement : function() { return video; },
        setSize: setSize,
        snapshot : snapshot,
        stopCapture: stopCapture
    };

}();
