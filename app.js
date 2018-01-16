(function(){
    var app = angular.module('store',[ ]);

    var gem = {
        name:'bob',
        price:2.95,
        description: 'Sup Doug!',
        canPurchase : true,
        soldOut : false,
    }

    app.controller('StoreController',function(){
    // This is the code that will be executed when the controller is called
        this.product = gem;

    });

})();

// Directives are HTML annotations that trigger javascript behaviors

// modules are where our application comonents live

// Expressions Allow you to insert dynamic values into your HTML

// Controllers are where we define out apps behavior by defining dunctions and values

// Wrapping my javascript in a closure