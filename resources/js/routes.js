import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent";
import ExampleComponent2 from "./components/ExampleComponent2";
import Bookable from "./bookable/Bookable";
import Review from './review/Review'
import Book from "./book/Book";

const routes = [
    {
        path: "/",
        component: Bookable,
        name: "home",
    },
    {
        path: "/contact",
        component: ExampleComponent2,
        name: "contact",
    }
    ,
    {
        path: "/book/:id",
        component: Book,
        name: "book",
    },
    {
        path: "/review/:id",
        component: Review,
        name: "review",
    }
];

const router = new VueRouter({
    routes,
    mode:'history',
});

export default router;