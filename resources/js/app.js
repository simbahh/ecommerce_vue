require("./bootstrap");
import Vue from "vue";
import App from "./components/App";
import router from "./routes";
import moment from "moment";
import VueRouter from "vue-router";
import Vuex from "vuex";
import FatalError from "./shared/components/FatalError";
import Button from "./shared/components/Button";
import StarRating from "./shared/components/StarRating";
import Success from "./shared/components/Success";
import storeDefinition from "./store";

import ValidationErrors from "./shared/components/ValidationErrors";
window.Vue = require("vue");

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

// // Vue.component('example-component2', require('./components/ExampleComponent2.vue').default);

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("process-button", Button);
Vue.component("v-errors", ValidationErrors);
Vue.component("success", Success);

const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        app: App
    },
    beforeCreate() {
        this.$store.dispatch("loadStoredState");
    }
});
