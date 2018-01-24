# Intro
This is repository designed as a sandbox to play with javascript, 
primarily to get up and running with d3 and other visualization libs

A demo d3 visualization can be viewed at:
https://tychonautvii.github.io/learn_d3/

# Sources
 ## Introductory Material
I started with an intro to some basic front end tech in a d3 context:
http://www.jeromecukier.net/blog/2012/09/04/getting-to-hello-world-with-d3/

This is introduces the concepts of d3 well, but is a little dated and d3 v3 focused: 
https://square.github.io/intro-to-d3/web-standards/

## Javascript
My Fav Javascript Overview: https://javascript.info/

I also ended up selecting a javascript framework, mostly just to make it easier to interact with user input. 
I consulted the following resources, and ultimately chose angular:
https://da-14.com/blog/5-best-javascript-frameworks-2017
http://www.adeveloperdiary.com/react-js/integrate-react-and-d3/

I used codeschool to learn enough angular for my needs:
http://campus.codeschool.com/courses/shaping-up-with-angularjs/level/3/section/1/video/1


## Deeper on D3 
https://github.com/d3/d3/wiki/Tutorials
https://github.com/d3/d3/blob/master/CHANGES.md#selections-d3-selection



http://bl.ocks.org/alansmithy/e984477a741bc56db5a5

https://bl.ocks.org/mbostock/3808218

Good source on tooltips
http://bl.ocks.org/d3noob/a22c42db65eb00d4e369

https://medium.com/netscape/visualizing-data-with-angular-and-d3-209dde784aeb
http://rajapradhan.com/blogs/d3-js-v4-essentials/


# Features To Add:
* ~~Add a Tooltip~~
* Filter Missing Data
* Add Algorithum Checkboxes
* Add a Widget to turn on/off tooltip
* Add a Zoom Widget
* Legend (for now use tooltip)

# Development Configuration Info

I use ECMAScript 6 to have scope, and avoid declaration hoisting

Install home-brew 
https://github.com/Homebrew/install

NPM install globally or in a local project directory
```bash
brew install node
brew install npm
npm install -g d3 --save
npm install -g @types/d3 --save-dev
npm install -g angular
```

