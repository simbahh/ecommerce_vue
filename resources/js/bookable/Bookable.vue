<template>
    <div>
        <!-- <h5 class="text-info">Row is {{ rows }}</h5> -->
        <div v-if="loading">
            <h5 class="text-info">Data is loading .....</h5>
        </div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row' + row">
                <div
                    class="col d-flex align-items-stretch"
                    v-for="(bookable, column) in bookablesInRow(row)"
                    :key="'row' + row + column"
                >
                    <BookableList
                        v-bind="bookable"
                    ></BookableList>
                </div>
                <div
                    class="col"
                    v-for="placeholder in placeholdersInRow(row)"
                    :key="'placeholder' + row + placeholder"
                ></div>
                <!-- {{placeholdersInRow(row)}} -->
            </div>
        </div>
    </div>
</template>
<script>
import BookableList from "./BookableList";
export default {
    components: {
        BookableList
    },
    data() {
        return {
            bookables: null,
            loading: false,
            columns: 3
        };
    },
    computed: {
        rows() {
            return this.bookables == null
                ? 0
                : Math.ceil(this.bookables.length / this.columns);
        }
    },
    methods: {
        bookablesInRow(row) {
            return this.bookables.slice(
                (row - 1) * this.columns,
                row * this.columns
            );
        },
        placeholdersInRow(row) {
            return this.columns - this.bookablesInRow(row).length;
        }
    },
    created() {
        this.loading = true;

        const p = new Promise((resolve, reject) => {
            console.log(resolve);
            console.log(reject);
            setTimeout(() => resolve("Hello"), 3000);
        }).then(result => console.log(`Success ${result}`))
        .catch(result => console.log(`Error ${result}`));
        console.log(p);

        const request = axios
        .get("api/bookables")
        .then(response => {
            this.bookables = response.data.data;
            this.loading = false;
            });

        console.log(request);
    }
};
</script>
<style lang=""></style>
