<script setup lang="ts">
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="flex w-full flex-col gap-2">
        <label for="input1" class="px-2 text-sm">隐藏文本</label>

        <textarea
          v-model="input1"
          class="h-full w-full resize-none rounded bg-white p-2 outline-none dark:bg-black"
          id="input1"
        ></textarea>

        <label for="input2" class="px-2 text-sm">显示文本</label>

        <textarea
          v-model="input2"
          class="h-full w-full resize-none rounded bg-white p-2 outline-none dark:bg-black"
          id="input2"
        ></textarea>
      </div>

      <div class="flex items-center justify-center">
        <button class="icon-btn flex rounded-full bg-white p-2 dark:bg-black">
          <div class="i-carbon-arrows-horizontal"></div>
        </button>
      </div>

      <div class="flex w-full flex-col gap-2">
        <label for="input3" class="px-2 text-sm">解密文本</label>

        <textarea
          v-model="input3"
          class="h-full w-full resize-none rounded bg-white p-2 outline-none dark:bg-black"
          id="input3"
        ></textarea>
      </div>
    </div>
  </div>
</template>
