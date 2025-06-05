<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center justify-between bg-white p-4 dark:bg-black">
      <div>🕵️‍♂️ Zero Text</div>

      <div class="flex items-center gap-2">
        <DarkToggle />

        <a
          class="i-carbon-logo-github icon-btn"
          href="https://github.com/tlyboy/zero-text"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </div>

    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
