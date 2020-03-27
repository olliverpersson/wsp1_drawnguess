import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
import routerFactory from './routes.js';

Vue.use(VueMeteorTracker);

import App from './App.vue';

Meteor.startup(() => {

  // Start the router
  const router = routerFactory.create();
  new Vue({
    router,
    render: h => h(App),
  }).$mount(document.body);

});
