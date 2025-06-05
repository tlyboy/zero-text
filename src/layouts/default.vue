<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center justify-between bg-white p-4 dark:bg-black">
      <div class="font-bold">🕵️ 零宽文本加密生成器</div>

      <div class="flex justify-center gap-2 text-xl">
        <a
          class="i-carbon-logo-github icon-btn"
          href="https://github.com/tlyboy/zero-text"
          target="_blank"
          rel="noopener noreferrer"
        ></a>

        <DarkToggle />
      </div>
    </div>

    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
