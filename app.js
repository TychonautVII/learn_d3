"use strict";  // Code that enforces modern javascript
(function(){
    let app = angular.module('input_bar',[ ]);

    function get_ml_results() {
        // this function gets a long csv string defined in ml_summary.js, parses and cleans it
        // Done this way to avoid async csv read
        console.log('reading csv file');
        let ml_data_dirty = d3.csvParse(raw_ml_summary);
        let id = 0;
        let ml_data_clean = ml_data_dirty.map(function (d) {
                id = id+1;
                return {
                    id: id,
                    mean_test_score: +d.mean_test_score,
                    std_test_score: +d.std_test_score,
                    mean_train_score: +d.mean_train_score,
                    std_train_score: +d.std_train_score,
                    algorithum: d.algorithum,
                    sigma_low_test_score: +d.sigma_low_test_score,
                    sigma_low_train_score: +d.sigma_low_train_score,
                    rank: +d.rank,
                    svc_kernal: d.svc_kernal,
                    gm_covariance_type: d.gm_covariance_type,
                    poly_degree: +d.poly_degree,
                    svc_C: +d.svc_C,
                    svc_gamma: +d.svc_gamma,
                    pca_n: +d.pca_n,
                }
            }
        );
        return ml_data_clean
    }

    let ml_results_sum = get_ml_results();

    // Plot Appearance Settings
    let margin = {top: 40, right: 20, bottom: 50, left: 60};
    let width = 700 - margin.left - margin.right;
    let height = 300 - margin.top - margin.bottom;
    let circle_size = 7;
    let transition_time_ms = 1000;

    // Initial Axis Settings
    let x_data_name = 'mean_train_score';
    let y_data_name = 'mean_test_score';
    let c_data_name = 'algorithum';


    console.log('init complete');

    app.controller('Plotter',function(){

        console.log('in plotter');

        // ----------------------------------------
        //  Function Defs
        // ----------------------------------------

        this.init_plot = function() {
            console.log('in init plot');

            let svg = d3.select(".chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "x axis");


            svg.append("g")
                .attr("class", "y axis");

            //x axis text
            svg.append("text")
                .attr("class","x_label")
                .attr("transform",
                    "translate(" + (width/2) + " ," +
                    (height + margin.top) + ")")
                .attr("text-anchor", "middle");

            //y axis text
            svg.append("text")
                .attr("class","y_label")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .attr("text-anchor", "middle");

            //Title text
            svg.append("text")
                .attr("class","plot_title")
                .attr("transform",
                      "translate(" + (width/2) + " ," +
                                        (0) + ")")
                .attr("text-anchor", "middle")
                .text("Heart Disease Classification Grid Search Results")
                .style("font-size","20px");


            return svg};

        this.update_plot = function(svg) {
            console.log('start update plot');

            // ----------------------------------------
            // Updating the Axes
            // ----------------------------------------

            let x_scale = d3.scaleLinear()
                .range([0, width]);

            let y_scale = d3.scaleLinear()
                .range([height, 0]); //Range is in pixel space, reversed because high down in svg

            let c_scale = d3.scaleOrdinal(d3.schemeCategory10);


            // this goes undefined inside the anon funcs, so we have to define locals
            let x_name = this['x_data_name'];
            let y_name = this['y_data_name'];
            let c_name = this['c_data_name'];

            d3.select(".x_label").text(x_name); // TODO Make this the pretty names
            d3.select(".y_label").text(y_name);

            let x_data = this['ml_data'].map(function(d) {return d[x_name]; });
            let y_data = this['ml_data'].map(function(d) {return d[y_name]; });


            // Scale the domain data in data space
            // x_scale.domain([d3.min(x_data), d3.max(x_data)]);
            // y_scale.domain([d3.min(y_data), d3.max(y_data)]);

            x_scale.domain([0, 1]);
            y_scale.domain([0, 1]);


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
                .duration(transition_time_ms);


            // Rejoin the Data
            let circles = svg.selectAll(".dot")
                .data(this.ml_data,function(d) { return d.id; });

            //remove unneeded bars
            circles.exit()
                .transition(t)
                .attr("r", 0.0)
                .remove();

            //Update Old Bars, Even if nothing has changed, I may have to do this again for the axis
            circles.attr("class", "update")
                .attr("class", "dot") // This is what the style sheet grabs
                .attr("r", circle_size)
                .transition(t)
                .attr("cx", function(d) { return x_scale(d[x_name]); })
                .attr("cy", function(d) { return y_scale(d[y_name]); })
                .attr('fill', function(d) { return c_scale(d[c_name]); } )
                .attr("data_id",function(d) { return d.id; });

            //Add new Bars
            circles.enter()
                .append("circle") //TODO What is rect doing here?
                .attr("class", "dot") // This is what the style sheet grabs
                .attr("cx", function(d) { return x_scale(d[x_name]); })
                .attr("cy", function(d) { return y_scale(d[y_name]); })
                .attr('fill', function(d) { return c_scale(d[c_name]); } )
                .attr("data_id",function(d) { return d.id; })
                .attr("r", 0.0)
                .transition(t)
                .attr("r", circle_size);


            console.log('end update plot');
        };

        // ----------------------------------------
        //  Logic
        // ----------------------------------------

        d3.select('.input').attr("position", "0, 700");

        // Inits the axis stuff in the plot
        this.x_data_name = x_data_name;
        this.y_data_name = y_data_name;
        this.c_data_name = c_data_name;

        this.ml_data = ml_results_sum;

        this.svg = this.init_plot();
        this.update_plot(this.svg);



    });

    app.controller('Inputer',function(){


        // This is the code that will be executed when the controller is called

        // TODO Might need to explictly remove undefineds and such

        // Inits the axis stuff in the form
        this.x_data_name = x_data_name;
        this.y_data_name = y_data_name;
        this.c_data_name = c_data_name;

        this.addInput = function(plotter){

            plotter.x_data_name = this.x_data_name;
            plotter.y_data_name = this.y_data_name;
            plotter.c_data_name = this.c_data_name;


            plotter.update_plot(plotter.svg); // Update the Plot
        }

    });

    d3.select(".description")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)



})();





