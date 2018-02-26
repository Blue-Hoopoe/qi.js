function Qi(queries) {

    /* Defining inner variables and defaults. */
    var self = this;
    this.queries = queries ? queries : { small: 0, medium: 640, large: 1024 };
    this.breakpoints = [];

    /* Function that creates collection of tags that correspond with given settings. */
    this.registerElements = function(){
        var query = "";
        for (var q in self.queries) {
            query += "[qi-" + q + "],";
            self.breakpoints.push(q);
        }
        self.registered = document.querySelectorAll(query.slice(0, -1));
    }

    /* Function that returns query notation valid with given configuration. */
    this.getQuery = function () {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        for (var i = 0; i < self.breakpoints.length - 1; i++) {
            if (width >= self.queries[self.breakpoints[i]] && width < self.queries[self.breakpoints[i + 1]]) {
                return self.breakpoints[i];
            }
        }
        return self.breakpoints[i];
    }

    /* Function that changes sources of all registered elements. */
    this.resize = function () {
        var query = self.getQuery();
        if (query === self.currentQuery) { return }
        self.currentQuery = query;
        for (var i = 0; i < self.registered.length; i++) {
            var element = self.registered[i];
            for (var j = self.breakpoints.indexOf(query); j >= 0; j--) {
                var src = element.getAttribute('qi-' + self.breakpoints[j]);
                if (element.tagName === 'IMG') {
                    if (src) {
                        element.setAttribute('src', src);
                    } else {
                        element.removeAttribute('src');
                    }
                } else {
                    element.style.backgroundImage = src ? 'url(' + src + ')' : null;
                }
                j = -1;
            }
        }
    }

    /* Reviving functionality. */
    this.registerElements();
    this.resize();
    if (window.addEventListener) {
        window.addEventListener('resize', self.resize, false);
    } else {
        window.attachEvent('onresize', self.resize);
    }
}

/* Prototyping indexOf function for array (to provide compatibility with IE8, of course). */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (element) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === element) {
                return i;
            }
        }
        return -1;
    };
};
