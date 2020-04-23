// Import the router factory
import {
	RouterFactory,
	nativeScrollBehavior
} from 'meteor/akryum:vue-router2'

import {
	Meteor
} from 'meteor/meteor'

// Create router instance
const routerFactory = new RouterFactory({
	mode: 'history',
	scrollBehavior: nativeScrollBehavior
})

import AllView from './views/AllView.vue'
import GameView from './views/GameView.vue'
import LoginView from './views/LoginView.vue'
import CreateView from './views/CreateView.vue'
import RegisterView from './views/RegisterView.vue'

function checkAuth (to, from, next) {

	if( !Meteor.user() ) {

		next({ name: 'login' })

	} else {

		next()

	}

};

RouterFactory.configure(router => {

	router.addRoutes([

		{
			path: '/games',
			name: 'all',
			component: AllView,
			beforeEnter: checkAuth
    	},
		{
			path: '/game/:id',
			name: 'game',
			component: GameView,
			props: true,
			beforeEnter: checkAuth
		},
		{
			path: '/',
			name: 'login',
			component: LoginView
		},
		{
			path: '/create',
			name: 'create',
			component: CreateView,
			beforeEnter: checkAuth
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView
		}

  	])

})

export default routerFactory;
