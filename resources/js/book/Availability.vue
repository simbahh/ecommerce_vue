<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availability 
            <span class="text-danger" v-if="noAvailability">(Not Available)</span> 
            <span class="text-success" v-if="hasAvailability">(Available)</span>
            </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input type="text" name="from" id="from" 
                class="form-control form-control-sm"
                v-model="from"
                placeholder="Start date"
                :class="[{'is-invalid':this.errorFor('from')}]">
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('from')" :key="'from' + index">{{error}}</div> 
            </div>
             <div class="form-group col-md-6">
                <label for="to">To</label>
                <input type="text" name="to" id="to" 
                class="form-control form-control-sm"
                v-model="to"
                placeholder="End date"
                :class="[{'is-invalid':this.errorFor('to')}]"> 
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('to')" :key="'to' + index">{{error}}</div> 

            </div>

            <button @click="check" :disabled="loading" class="btn btn-secondary btn-block">Check!</button>
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
            status:null,
            errors:null
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
    methods:{
        check(){
            this.loading = true;
            this.errors = null;
            console.log("Hello 1");
            axios.get(
                `/api/bookables/availability/${this.$route.params.id}?from=${this.from}&to=${this.to}`
            ).then(response => {
                this.status = response.status;
                console.log("Hello 1"+this.status);
                
            }).catch(error => {
                console.log("Hello 2");
                if(422 == error.response.status){
                    this.errors= error.response.data.errors;
                }
                this.status = error.response.status;
                 console.log("Hello 2"+this.status);
            }).then(()=>(
                console.log("Hello 3"),
                this.loading = false
                ));
        },
        errorFor(field){
            return this.hasErrors && this.errors[field] ? this.errors[field] : null;
        }
    },
    computed: {
        hasErrors(){
           // console.log("Test 1"+422 == this.status && this.errors != null);
            return 422 === this.status && this.errors != null;
        },
        hasAvailability(){
            console.log("Test 1"+200 === this.status);
            return 200 === this.status;
        },
        noAvailability(){
             console.log("Test 2"+404 === this.status);
            return 404 === this.status;
        },
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

.is-invalid{
    color: #b22222;
    background-image: none;
}

.invalid-feedback{
    color: #b22222;
}

</style>
