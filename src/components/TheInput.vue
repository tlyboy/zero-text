<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <input
    id="input"
    v-model="modelValue"
    type="text"
    v-bind="$attrs"
    class="w-[250px] rounded border border-gray-200 bg-transparent px-4 py-2 text-center outline-none active:outline-none dark:border-gray-700"
  />
</template>
