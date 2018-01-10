var w=960,h=500,
svg=d3.select("#chart") //css selector refering to the html object with an id attribute chart
.append("svg") // an "svg" variable that holds the top-level svg container, which resides in a div element called "chart"
.attr("width",w)
.attr("height",h);
 
var text=svg
.append("text")
.text("hello world, check me out in the developer consol")
.attr("y",50);