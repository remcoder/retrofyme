(function() {
  var BookmarkletLoader = (function() {

    BookmarkletLoader.name = 'BookmarkletLoader';

    function BookmarkletLoader(id, script, style, callback) {
      var cacheBust = '?' + new Date().getTime();
      this.id = id;
      this.script = script + cacheBust;
      this.style = style + cacheBust;
      this.callback = callback;
      if (this.find(this.id) === null) {
        this.add();
      }
    }

    BookmarkletLoader.prototype.find = function() {
      return document.getElementById(this.id);
    };

    BookmarkletLoader.prototype.remove = function() {
      return document.body.removeChild(this.find(this.id));
    };

    BookmarkletLoader.prototype.add = function() {
      var root, script, style;
      root = document.createElement('div');
      root.id = this.id;
      if (this.script !== null) {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'UTF-8';
        script.src = this.script;
        if (this.callback && typeof(this.callback) === 'function')
          script.onload = this.callback;
        root.appendChild(script);
      }
      if (this.style !== null) {
        style = document.createElement('link');
        style.href = this.style;
        style.rel = 'stylesheet';
        style.type = 'text/css';
        root.appendChild(style);
      }
      return document.body.appendChild(root);
    };

    return BookmarkletLoader;

  })();

  var loader = new BookmarkletLoader('retrofy', 
    'http://localhost:8000/jquery.retrofy.js', 
    'http://localhost:8000/css/c64.css',
    
    function() {
      Zepto('*').retrofy();
    });

}());
