<template>
    <div>
        <button @click="$emit('update:modelValue', 'OR')" :class="{'selected': modelValue == 'OR'}" class="or">
            OR
        </button>
        <button @click="$emit('update:modelValue', 'AND')" :class="{'selected': modelValue == 'AND'}" class="and">
            AND
        </button>
    </div>
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<style scoped>
button {
    font-size: 12px;
    width: 40px;
    background-color: transparent;
    color: #42b983;
    border: 2px solid #42b983;
    cursor: pointer;
}

.selected {
    background-color: #42b983;
    color: black;
    cursor: auto;
}

.or {
    border-radius: 3px 0 0 3px;
}

.and {
    border-radius: 0 3px 3px 0;
}



</style>