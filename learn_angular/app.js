(function(){
    var app = angular.module('store',[ ]);

    console.log("This Runs");


    app.controller('StoreController',function(){
    // This is the code that will be executed when the controller is called
        this.products = [
            {name:'bob',
            price:2.95,
            description: 'Sup Doug!',
            reviews: [
                {
                    stars: 5,
                    body: "I love this product!",
                    author: "joe@thomas.com",
                },
                {
                    stars: 1,
                    body: "This product sucks",
                    author: "tim@hater.com",
                },
                ]},
            ]

    });

    app.controller('ReviewController',function(){
        // This is the code that will be executed when the controller is called
        this.review = {};
        this.addReview = function(product){
            product.reviews.push(this.review);
            this.review = {};
        }

    });

})();

// Directives are HTML annotations that trigger javascript behaviors
// -- ng-app, attach an application
// -- ng-contoller, attach a controller to an element
// -- ng-show/ng-hide/ng-repeat
// -- filters can be attached to directives to modify behavior


// modules are where our application comonents live

// Expressions Allow you to insert dynamic values into your HTML
// -- filters can be attached to expressions to allow formatting

// Controllers are where we define out apps behavior by defining dunctions and values

// Wrapping my javascript in a closure