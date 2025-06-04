<template>
  <div class="flex h-full flex-col items-center justify-center gap-4">
    <RouterView />

    <div class="flex items-center gap-2">
      <DarkToggle />

      <a
        class="i-carbon-logo-github icon-btn"
        href="https://github.com/tlyboy/vue-starter"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</template>
