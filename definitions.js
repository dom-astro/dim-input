// JavaScript
define( [], function () {
    'use strict';

    return {
		type : "items",
		component : "accordion",
		items : {
            dimensions : {
                uses : "dimensions",
                min : 1,
                max : 8
            },
            sorting : {
                uses : "sorting"
            },
            settings : {
				uses : "settings",
			}
		}
	}
} );