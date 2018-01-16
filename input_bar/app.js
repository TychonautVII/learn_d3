"use strict";  // Code that enforces modern javascript
(function(){
    let app = angular.module('input_bar',[ ]);

    console.log("This Runs");

    app.controller('Plotter',function(){
        // ----------------------------------------
        //  Init the Data
        // ----------------------------------------
                this.sales = [
                    { product: 'Hoodie',  count: 7 },
                    { product: 'Jacket',  count: 6 },
                    { product: 'Snuggie', count: 9 },
                ];

                this.plot = function(){
                    let margin = {top: 40, right: 20, bottom: 30, left: 40};

                    let width= 700 - margin.left - margin.right;
                    let height = 300 - margin.top - margin.bottom;

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
                    // Binding the Data
                    // ----------------------------------------

                    // Scale the range of the data in the domains
                    x_scale.domain(this.sales.map(function(d) { return d.product; }));
                    y_scale.domain([0, d3.max(this.sales, function(d) { return d.count; })]);

                    svg.selectAll(".bar")
                        .data(this.sales)
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
                }

                this.plot()



    });

    app.controller('Inputer',function(){
        // This is the code that will be executed when the controller is called
        this.input = {};
        this.addInput = function(plotter){
            plotter.sales.push(this.input);
            plotter.plot()
            this.input = {};
        }

    });


})();





