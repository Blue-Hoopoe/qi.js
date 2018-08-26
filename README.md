# qi.js

This is the first release of Queried Images - lightweight (minified file has only 861 bytes of code) and simple to use javascript module that allows assigning different image sources depending on window width. To learn more, please visit ```getting-started``` folder or read documentation below.

## Basic usage
To start using qi.js there are only three steps that you must follow:
  1. Add to every queried ```<img> ``` tag in your html code additional qi prefixed attributes, which contains alternative image sources for each media query. For example:
```html
<img qi-small  = "http://via.placeholder.com/100x100"
     qi-medium = "http://via.placeholder.com/200x100"
     qi-large  = "http://via.placeholder.com/300x100" />
```
  2. Pull qi javascript code to your page:
```html
<script src = "qi.min.js"></script>
```
  3. Before closing ```</body>``` tag initialize Qi instance by inserting this code (or create function that fires after document is loaded):
```html
<script>
    new Qi();
</script>
```

## Defualt media queries

By default, qi has three media breakpoints based on device's width:
- **qi-small** - this query will be shown allways, on any screen,
- **qi-medium** - for windows 640 pixels width an more,
- **qi-large** - destined  for large devices which screen is 1024 pixels width or more.

This queries are based on [Zurb's Foundation approach](http://foundation.zurb.com/sites/docs/media-queries.html). The most important fact is that larger queries overrides smaller, so with default settings and window's width of 1600px, qi module will show the bigger image : 
``` html
<img qi-small = "http://via.placeholder.com/100x100"
     qi-large = "http://via.placeholder.com/100x300"/>
```

## Custom breakpoints
There is an option to invoke personalized breakpoints by passing proper query object when creating new Qi instance. You can override defaults breakpoints giving json parameter like this:
``` html
<script>
    new Qi({ small:  0, 
             medium: 768, 
             large:  1200 });
</script>
```
Or even create new breakpoints names (but don't forget to add *qi* prefixes in ```<img>``` tags) in a similar way:
``` html
<img qi-sm = "http://via.placeholder.com/100x100"
     qi-lg = "http://via.placeholder.com/300x100" />

<script>
    new Qi({ sm: 0, 
             lg: 1200 });
</script>
```

## Combining media queries
Because of the fact, that qi.js is basically an object, it allows you to have several media rules in one html document. To achive that, just create as many qi objects, as queries groups:
``` html
<!-- image that is based on Bootstrap queries -->
<img qi-xs = "http://via.placeholder.com/100x100"
     qi-md = "http://via.placeholder.com/300x100" />
     
<!-- image that is based on Foundation queries -->
<img qi-small = "http://via.placeholder.com/100x100"
     qi-large = "http://via.placeholder.com/300x100" />

<script>
    // Bootstrap media queries
    new Qi({ xs: 0, 
             sm: 768, 
             md: 992, 
             lg: 1200 });
           
    // Foundation media queries  
    new Qi({ small:  0, 
             medium: 640, 
             large:  1024 });
</script>
```
Don't forget that none of your ```<img>``` tags can have several different queries mixed like this:
``` html
<img qi-small  = "http://via.placeholder.com/100x100"
     qi-xs  = "http://via.placeholder.com/300x100" />
```
And be sure, that there is no names overlapping in your code:
``` html
<script>
    new Qi({ small: 0, 
             large: 1024 });
             
    new Qi({ small: 0, 
             medium: 640 });
 </script>
```
## Compatibility
Based on researches from [caniuse.com](https://caniuse.com), module should work without any problems on almost all modern browsers starting with the early versions of Chrome, Firefox or Opera and ending at browsers designated especially for smartphones. The only exception is Internet Explorer, because versions under 8 will not cooperate with qi.js.

Browsers that were tested personally:
- Chrome (ver. 4, ver. 60),
- Firefox (ver. 3.5, ver. 55),
- Safari (ver. 5.1),
- Opera (ver. 10.1, ver. 47),
- Microsoft Edge (ver. 15),
- Internet Explorer (ver. 8, ver. 9, ver. 11).
