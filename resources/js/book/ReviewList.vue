<template>
    <div style="padding:1.25rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4">Review list
        </h6>

        <div class="border-bottom d-none d-md-block" v-for="number in 3" :key="number">
            <div class="row pt-4">
                <div class="col-md-6">
                    James Peters
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    STAR RATING
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    Added 5 mins ago
                </div>
            </div>
            <div class="row pt-4 pb-4">
                <div class="col-md-12">
                    Content of the review
                </div>
            </div>

        </div>

        
    </div>
</template>
<script>

export default {
    data() {
        return {
            from: null,
            to: null,
            loading:false,
        };
    },
    created() {

    },
    methods:{

    },
    computed: {

    }
};
</script>
<style scoped>
label{
    font-size: 0.7rem;
    text-transform: uppercase;
    color: grey;
    font-weight: bolder;
}

</style>
