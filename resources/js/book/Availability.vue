<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <transition name="fade">
                <span class="text-danger" v-if="noAvailability"
                    >(Not Available)</span
                >
                <span class="text-success" v-if="hasAvailability"
                    >(Available)</span
                >
            </transition>
        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    type="text"
                    name="from"
                    id="from"
                    class="form-control form-control-sm"
                    v-model="from"
                    placeholder="Start date"
                    :class="[{ 'is-invalid': errorFor('from') }]"
                />
                <v-errors :errors="errorFor('from')"></v-errors>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="text"
                    name="to"
                    id="to"
                    class="form-control form-control-sm"
                    v-model="to"
                    placeholder="End date"
                    :class="[{ 'is-invalid': errorFor('to') }]"
                />
                <v-errors :errors="errorFor('to')"></v-errors>
            </div>

            <process-button :loadingValue="loading"> Check </process-button>

            <!-- <button
                class="btn btn-secondary btn-block"
                @click="check"
                :disabled="loading"
            >
                <span v-if="!loading">Check!</span>
                <span v-if="loading">
                    <i class="fas fa-circle-notch fa-spin"></i> Checking...
                </span>
            </button> -->
        </div>
    </div>
</template>
<script>
import { is422 } from "./../shared/utils/response";
import validationErrors from "./../shared/mixins/validationErrors";
export default {
    props: { bookableId: String },
    mixins: [validationErrors],
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null
        };
    },
    created() {
        // this.loading = true;
        // const request = axios.get(`/api/bookables/${this.$route.params.id}`)
        // .then(response => {
        //     this.book = response.data.data;
        //     this.loading = false;
        //     });
        // console.log(request);
    },
    methods: {
        async check() {
            this.loading = true;
            this.errors = null;
            this.$store.dispatch("setLastSearch", {
                from: this.from,
                to: this.to
            });

            try {
                this.status = (
                    await axios.get(
                        `/api/bookables/availability/${this.bookableId}?from=${this.from}&to=${this.to}`
                    )
                ).status;
                this.$emit("availability", this.hasAvailability);
            } catch (err) {
                if (is422(err)) {
                    this.errors = err.response.data.errors;
                }
                this.status = err.response.status;
                this.$emit("availability", this.hasAvailability);
            }
            this.loading = false;
        }
    },
    computed: {
        hasErrors() {
            // console.log("Test 1"+422 == this.status && this.errors != null);
            return 422 === this.status && this.errors != null;
        },
        hasAvailability() {
            console.log("Test 1" + 200 === this.status);
            return 200 === this.status;
        },
        noAvailability() {
            console.log("Test 2" + 404 === this.status);
            return 404 === this.status;
        }
    }
};
</script>
<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: grey;
    font-weight: bolder;
}

.is-invalid {
    color: #b22222;
    background-image: none;
}

.invalid-feedback {
    color: #b22222;
}
</style>
