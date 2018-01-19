"use strict";  // Code that enforces modern javascript
(function(){
    let app = angular.module('input_bar',[ ]);

    console.log("This Runs");

    let margin = {top: 40, right: 20, bottom: 30, left: 40};

    let width = 700 - margin.left - margin.right;
    let height = 300 - margin.top - margin.bottom;

    app.controller('Plotter',function(){
        // ----------------------------------------
        //  Function Defs
        // ----------------------------------------

        this.init_plot = function() {

            // ----------------------------------------
            // Sizing and Placing the Chart
            // ----------------------------------------

            let svg = d3.select(".chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

            svg.append("g")
                .attr("class", "y axis");


            return svg};

        this.update_plot = function(svg) {

            // ----------------------------------------
            // Setting Up the Scales
            // ----------------------------------------

            let x_scale = d3.scaleBand()
                .range([0, width])
                .padding(0.1);

            let y_scale = d3.scaleLinear()
                .range([height, 0]); //Range is in pixel space, reversed because high down in svg


            // Scale the range of the data in the domains
            x_scale.domain(this.sales.map(function(d) { return d.product; }));
            y_scale.domain([0, d3.max(this.sales, function(d) { return d.count; })]);

            // ----------------------------------------
            // Sizing and Placing the Chart
            // ----------------------------------------

            // TODO Probs need to Not append an object here, but update it

            // add the x Axis
            svg.select(".x") // TODO Why is this the select statement for the class y axis?
                .call(d3.axisBottom(x_scale));

            // add the y Axis
            svg.select(".y")
                .call(d3.axisLeft(y_scale));


            // ----------------------------------------
            // Binding the Data
            // ----------------------------------------
            let t = d3.transition()
                .duration(1000);


            // Rejoin the Data
            let bars = svg.selectAll(".bar")
                .data(this.sales,function(d) { return d.product; });

            //remove unneeded bars
            bars.exit().remove(); // joe got removed

            //Update Old Bars, Even if nothing has changed, I may have to do this again for the axis
            bars.attr("class", "update")
                .attr("class", "bar") // This is what the style sheet grabs
                .attr("x", function(d) {return x_scale(d.product);})
                .attr("width", x_scale.bandwidth() )
                .transition(t)
                .attr("y", function(d) {return y_scale(d.count);})
                .attr("height", function(d) { return  height - y_scale(d.count); });

            //Add new Bars
            bars.enter().append("rect") //TODO What is rect doing here?
                .attr("class", "bar") // This is what the style sheet grabs
                .attr("x", function(d) {return x_scale(d.product);})
                .attr("width", x_scale.bandwidth() )
                .attr("y", function(d) {return y_scale(d.count);})
                .attr("height", function(d) { return  height - y_scale(d.count); });




            console.log("End of Update");
        };

        // ----------------------------------------
        //  Logic
        // ----------------------------------------
        this.sales = [
            { product: 'Hoodie',  count: 7 },
            { product: 'Jacket',  count: 6 },
            { product: 'Snuggie', count: 9 },
        ];



        this.svg = this.init_plot();
        this.update_plot(this.svg);



    });

    app.controller('Inputer',function(){
        // This is the code that will be executed when the controller is called
        this.input = {};
        this.addInput = function(plotter){

            let products = plotter.sales.map(function(d) { return d.product; });

            if (products.includes(this.input.product)) {
                let prod_index = products.indexOf(this.input.product);
                plotter.sales[prod_index] = this.input;
            } else {
                plotter.sales.push(this.input);
            }


            plotter.update_plot(plotter.svg); // Update the Plot
            this.input = {}; //Clear the input
        }

    });


})();





