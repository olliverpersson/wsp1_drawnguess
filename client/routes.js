// Import the router factory
import {
	RouterFactory,
	nativeScrollBehavior
} from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
	mode: 'history',
	scrollBehavior: nativeScrollBehavior
})

import AllView from './views/AllView.vue'
import GameView from './views/GameView.vue'
import LoginView from './views/LoginView.vue'
import CreateView from './views/CreateView.vue'

RouterFactory.configure(router => {

	router.addRoutes([

		{
			path: '/',
			name: 'all',
			component: AllView,
    	},
		{
			path: '/game/:id',
			name: 'game',
			component: GameView
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/create',
			name: 'create',
			component: CreateView
		}

  	])

})

export default routerFactory;
