<template>
    <button
        class="btn btn-secondary btn-block"
        @click="$parent.check"
        :disabled="loadingValue"
    >
        <span v-if="!loadingValue"> <slot></slot> </span>
        <span v-if="loadingValue">
            <i class="fas fa-circle-notch fa-spin"></i> Loading...
        </span>
    </button>
</template>

<script>
export default {
    props: {
        loadingValue: Boolean
    }
};
</script>
