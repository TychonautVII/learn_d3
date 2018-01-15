// ----------------------------------------
//  Notes
// ----------------------------------------

/*
About Java Script:

Client Side language, runs on the client, as opposed to a server side language

Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

npm is a package manager for the JavaScript programming language

 */

var d3 = require("d3"),
    jsdom = require("jsdom");

var document = jsdom.jsdom(),
    svg = d3.select(document.body).append("svg");




var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://d3js.org/d3.v4.min.js"';
document.head.appendChild(script)

// ----------------------------------------
//  Getting the Data
// ----------------------------------------

var sales1 = [
    { product: 'Hoodie', count: 7 },
    { product: 'Jacket', count: 6 }
];

var sales2 = [
    { product: 'Jacket',  count: 6 }, // same
    { product: 'Snuggie', count: 9 }  // new
];



// ----------------------------------------
// Sizing the Chart
// ----------------------------------------

width="705";
height="240";

var svg = d3.select('#chart');
svg.attr("width",width)
    .attr("height",height);






// ----------------------------------------
// Binding the Data
// ----------------------------------------
var rects = svg.selectAll('rect').data(sales1, function(d, i) { return d.product; } );
// this is a data join between rect and sales, with key function that returns the product

rects.enter().append('rect');

var nextrects = rects
    .data(sales2, function(d, i) { return d.product; });

nextrects.exit().remove(); // gets rid of the one overlapping element

nextrects.enter().append('rect'); // adds one element



// ----------------------------------------
// Setting Up the scales d3 objects
// ----------------------------------------

var maxCount = d3.max(sales, function(d, i) {
    return d.count;
});

var x = d3.scaleLinear()
    .range([0, width]) //Range is in pixel space
    .domain([0, maxCount]); // Domain is in data space

var y = d3.scaleBand()
    .domain(sales.map(function(d, i) {return d.product;}))
    .range([0, height])
    .paddingInner(0.1);

newRects.append('rect')
  .attr('x', x(0))
  .attr('y', function(d, i) {
    return y(d.product);
  })
  .attr('height', y.bandwidth())
  .attr('width', function(d, i) {
    return x(d.count);
  }); // Adds all rect's because rects are currently new

// ----------------------------------------
// Adding some Dynamic Elements
// ----------------------------------------

// Where selection.enter() selects elements that have added since the last data join,
// selection.exit() is the opposite, it applies to elements that have been removed.
console.log("Lets do stuff ");
