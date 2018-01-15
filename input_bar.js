// ----------------------------------------
//  Notes
// ----------------------------------------

/*
About Java Script:

Client Side language, runs on the client, as opposed to a server side language

Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

npm is a package manager for the JavaScript programming language

 */

 "use strict";  // Code that enforces modern javascript

let margin = {top: 40, right: 20, bottom: 30, left: 40};

let width= 300 - margin.left - margin.right;
let height = 700 - margin.top - margin.bottom;

// ----------------------------------------
// Setting Up the Scales
// ----------------------------------------

let x_scale = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

let y_scale = d3.scaleLinear()
  .range([height, 0]); //Range is in pixel space, reversed because high down in svg


// ----------------------------------------
// Sizing and Placing the Chart
// ----------------------------------------

let svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// ----------------------------------------
//  Getting the Data
// ----------------------------------------

let sales = [
    { product: 'Hoodie',  count: 7 },
    { product: 'Jacket',  count: 6 },
    { product: 'Snuggie', count: 9 },
];


// ----------------------------------------
// Binding the Data
// ----------------------------------------

// Scale the range of the data in the domains
x_scale.domain(sales.map(function(d) { return d.product; }));
y_scale.domain([0, d3.max(sales, function(d) { return d.count; })]);

svg.selectAll(".bar")
    .data(sales)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {return x_scale(d.product);})
    .attr("width", x_scale.bandwidth() )
    .attr("y", function(d) {return y_scale(d.count);})
    .attr("height", function(d) { return  height - y_scale(d.count); });

// ----------------------------------------
// Sizing and Placing the Chart
// ----------------------------------------

// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_scale));

// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y_scale));

console.log("End of Program");



