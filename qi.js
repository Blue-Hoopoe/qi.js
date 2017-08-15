function Qi(queries) {

    /* defining inner variables and defaults */
    var self = this;
    this.queries = queries ? queries : { small: 0, medium: 640, large: 1024 };
    this.breakpoints = [];

    /* creating collection of images that correspond with given settings */
    (function () {
        var query = "";
        for (var q in self.queries) {
            query += "img[qi-" + q + "],";
            self.breakpoints.push(q);
        }
        self.imgs = document.querySelectorAll(query.slice(0, -1));
    })();

    /* function that returns query notation valid with given configuration */
    this.getQuery = function () {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        for (var i = 0; i < self.breakpoints.length - 1; i++) {
            if (width >= self.queries[self.breakpoints[i]] && width < self.queries[self.breakpoints[i + 1]]) {
                return self.breakpoints[i];
            }
        }
        return self.breakpoints[i];
    }

    /* function that resizes all images */
    this.resize = function () {
        var query = self.getQuery();
        if (query === self.currentQuery) { return }
        self.currentQuery = query;
        for (var i = 0; i < self.imgs.length; i++) {
            var img = self.imgs[i];
            var changed = false;
            for (var j = self.breakpoints.indexOf(query); j >= 0; j--) {
                var src = img.getAttribute('qi-' + self.breakpoints[j]);
                if (src) {
                    img.setAttribute('src', src);
                    changed = true;
                    j = -1;
                }
            }
            if (!changed) {
                img.setAttribute('src', "");
            }
        }
    }

    /* reviving functionality */
    this.resize();
    if (window.addEventListener) {
        window.addEventListener('resize', self.resize, false);
    } else {
        window.attachEvent('onresize', self.resize);
    }
}

/* prototyping indexOf function for array (to provide compatibility with IE8, of course) */
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
