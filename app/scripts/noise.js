function Noise(canvas) {

    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var t1 = new Date().getTime();
    var timer;
    var img = ctx.createImageData(w,h);
    var step = 4;

    function animate() {
        for (var x = 0; x < w; x+=step)
        {
            for (var y = 0; y < h; y+=step)
            {

                var value = (Math.random() > 0.5) ? 255 : 0;

                for (var x2 = 0; x2 < step; x2++)
                {
                    for (var y2 = 0; y2 < step; y2++)
                    {
                        var index = 4* (x+x2 + w*(y+y2));
                        img.data[index] = value;
                        img.data[index+1] = value;
                        img.data[index+2] = value;
                        img.data[index+3] = 255;
                    }
                }
            }
        }

        ctx.putImageData(img,0,0);
        timer = setTimeout(animate, 0);
    }

    function stop() {
        clearTimeout(timer);
    }

    return {
        animate : animate,
        stop : stop
    }

}
