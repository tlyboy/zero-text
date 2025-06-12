<template>
  <div class="flex h-full flex-col">
    <div
      class="flex items-center justify-between border-b border-[#DADADA] p-4 dark:border-[#292929]"
    >
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

    <div class="flex-1 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
