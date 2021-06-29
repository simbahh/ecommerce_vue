<template>
    <div>
        <nav
            class="navbar border-bottom navbar-expand-lg navbar-light bg-light"
        >
            <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }"
                >Ecommerce</router-link
            >
            <router-link class="navbar-nav pr-2" :to="{ name: 'home' }"
                >Home</router-link
            >
            <router-link class="navbar-nav" :to="{ name: 'contact' }"
                >Contact</router-link
            >
        </nav>

        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            lastSearch: this.$store.state.lastSearch
        };
    },
    computed: {
        ...mapState({
            lastSearchComputed: "lastSearch"
        }),
        somethingElse() {
            return 1 + 2;
        }
    }
};
</script>
