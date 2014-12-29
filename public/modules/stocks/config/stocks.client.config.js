'use strict';

// Configuring the Stocks module
angular.module('stocks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Stocks', 'stocks', 'dropdown', '/stocks(/create)?');
		Menus.addSubMenuItem('topbar', 'stocks', 'List Stocks', 'stocks');
		Menus.addSubMenuItem('topbar', 'stocks', 'New Stock', 'stocks/create');
	}
]);