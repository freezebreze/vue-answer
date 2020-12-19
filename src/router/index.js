import Vue from "vue";
import VueRouter from "vue-router";
import App from '../App.vue';
import Home from '../views/home/index.vue';
import Item from '../views/item/index.vue';
import Score from '../views/score/index.vue';

Vue.use(VueRouter);

const routes = [
	{
	    path: '/',
	    component: App,
	    children: [{
	        path: '',
	        component: Home
	    }, {
	        path: '/item',
	        component: Item
	    }, {
	        path: '/score',
	        component: Score
	    }]
	}
];

const router = new VueRouter({
  routes
});

export default router;
