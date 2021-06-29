<template>
    <div style="padding:1.25rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4">
            Review list
        </h6>

        <div v-if="loading">
            Loading...
        </div>
        <div v-else>
            <div
                class="border-bottom d-none d-md-block"
                v-for="(review, index) in reviews"
                :key="index"
            >
                <div class="row pt-4">
                    <div class="col-md-6">
                        James Peters
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <star-rating
                            :value="review.rating"
                            class="fa-llg"
                        ></star-rating>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        {{ review.created_at | fromNow }}
                    </div>
                </div>
                <div class="row pt-4 pb-4">
                    <div class="col-md-12">
                        {{ review.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: { bookableId: String },
    data() {
        return {
            reviews: null,
            loading: false
        };
    },
    created() {
        this.loading = true;
        console.log("This id" + this.bookableId);
        const request = axios
            .get(`/api/bookables/reviews/${this.bookableId}`)
            .then(response => {
                this.reviews = response.data.data;
            })
            .then(() => (this.loading = false));
    },
    // filters:{
    //     fromNow(value){
    //         return moment(value).fromNow()
    //     }
    // },
    methods: {},
    computed: {}
};
</script>
<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: grey;
    font-weight: bolder;
}
</style>
