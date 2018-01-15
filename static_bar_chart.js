// ----------------------------------------
//  Notes
// ----------------------------------------

/*
About Java Script:

Client Side language, runs on the client, as opposed to a server side language

Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

npm is a package manager for the JavaScript programming language

 */

// ----------------------------------------
//  Getting the Data
// ----------------------------------------

var sales = [
  { product: 'Hoodie',  count: 7 },
  { product: 'Jacket',  count: 6 },
  { product: 'Snuggie', count: 9 },
];

// ----------------------------------------
// Setting Up the scales d3 objects
// ----------------------------------------

var maxCount = d3.max(sales, function(d, i) {
  return d.count;
});

var x = d3.scaleLinear()
  .range([0, 300]) //Range is in pixel space
  .domain([0, maxCount]); // Domain is in data space

var y = d3.scaleBand()
    .domain(['Hoodie','Jacket','Snuggie'])
    .range([0, 75])
    .paddingInner(0.1);


// ----------------------------------------
// Sizing the Chart
// ----------------------------------------

width="701";
height="240";

var svg = d3.select('#chart');
svg.attr("width",width)
    .attr("height",height)



// ----------------------------------------
// Binding the Data
// ----------------------------------------
var rects = svg.selectAll('rect').data(sales); // this is a data join between rect and sales
// size of rects is intially zero, because no rects have been added


var newRects = rects.enter(); // Creates these element-less datapoints

newRects.append('rect')
  .attr('x', x(0))
  .attr('y', function(d, i) {
    return y(d.product);
  })
  .attr('height', y.bandwidth())
  .attr('width', function(d, i) {
    return x(d.count);
  });

