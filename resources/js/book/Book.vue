<template>
    <div>
        <div class="row">
            <div class="col-md-8 pb-4">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">
                            Loading..
                        </div>
                        <div v-else>
                            <h2>{{ book.title }}</h2>
                            <hr />
                            <article>
                                {{ book.description }}
                            </article>
                        </div>
                    </div>
                </div>
                <review-list :bookable-id="url_id"></review-list>
            </div>

            <div class="col-md-4 pb-4">
                <availability
                    :bookable-id="url_id"
                    @availability="checkPrice($event)"
                ></availability>
            </div>
        </div>
    </div>
</template>
<script>
import Availability from "./Availability.vue";
import ReviewList from "./ReviewList.vue";
import { mapState } from "vuex";

export default {
    components: {
        Availability,
        ReviewList
    },
    data() {
        return {
            book: null,
            loading: false,
            url_id: null,
            price: null
        };
    },
    computed: mapState({
        lastSearch: "lastSearch"
    }),
    created() {
        this.loading = true;
        this.url_id = this.$route.params.id.toString();
        const request = axios
            .get(`/api/bookables/${this.$route.params.id}`)
            .then(response => {
                this.book = response.data.data;
                console.log("Hello " + this.book);
                this.loading = false;
            });
        console.log(request);
    },
    methods: {
        checkPrice(hasAvailability) {
            console.log(hasAvailability);
        }
    }
};
</script>
<style lang=""></style>
