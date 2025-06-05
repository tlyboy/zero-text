<script setup lang="ts">
const secretText = ref('')
const carrierText = ref('')
const decodeInput = ref('')
const result = ref('')

// 定义零宽字符映射
const ZWC = { 0: '\u200B', 1: '\u200C' }

// 文本转二进制
function textToBinary(text: string): string {
  const utf8 = new TextEncoder().encode(text)
  return Array.from(utf8)
    .map((b) => b.toString(2).padStart(8, '0'))
    .join('')
}

// 二进制转文本
function binaryToText(bin: string): string {
  const bytes = bin.match(/.{8}/g)?.map((b) => parseInt(b, 2)) ?? []
  return new TextDecoder().decode(new Uint8Array(bytes))
}

// 二进制转零宽字符
function binaryToZWC(bin: string): string {
  return bin
    .split('')
    .map((b) => ZWC[Number(b) as keyof typeof ZWC])
    .join('')
}

// 零宽字符转二进制
function zwcToBinary(zwcText: string): string {
  return [...zwcText]
    .map((c) => (c === '\u200B' ? '0' : c === '\u200C' ? '1' : ''))
    .join('')
}

// 将零宽字符插入载体文本
function insertZWCIntoCarrier(carrier: string, zwc: string): string {
  const mid = Math.floor(carrier.length / 2)
  return carrier.slice(0, mid) + zwc + carrier.slice(mid)
}

// 加密方法
function encrypt() {
  const binary = textToBinary(secretText.value)
  const zwcText = binaryToZWC(binary)
  const final = insertZWCIntoCarrier(carrierText.value, zwcText)
  result.value = final
  decodeInput.value = final
}

// 解密方法
function decrypt() {
  const zwcChars = [...decodeInput.value]
    .filter((c) => c === '\u200B' || c === '\u200C')
    .join('')
  const binary = zwcToBinary(zwcChars)
  result.value = binaryToText(binary)
}

// 复制结果
async function copyResult() {
  try {
    await navigator.clipboard.writeText(result.value)
    // 这里可以添加复制成功的提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div class="flex h-full flex-col gap-4 p-4">
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="flex w-full flex-col gap-2">
        <label class="px-2 text-sm">要隐藏的文本：</label>
        <textarea
          v-model="secretText"
          class="h-32 w-full resize-none rounded bg-white p-2 outline-none dark:bg-black dark:text-white"
          placeholder="输入要加密的内容"
        />

        <label class="px-2 text-sm">宿主文本（将信息嵌入到这里）：</label>
        <textarea
          v-model="carrierText"
          class="h-32 w-full resize-none rounded bg-white p-2 outline-none dark:bg-black dark:text-white"
          placeholder="输入一段正常文本"
        />

        <div>
          <button @click="encrypt" class="btn">加密嵌入</button>
        </div>
      </div>

      <div class="flex w-full flex-col gap-2">
        <label class="px-2 text-sm"
          >解密输入区（将含零宽字符的文本粘贴到这里）：</label
        >
        <textarea
          v-model="decodeInput"
          class="h-32 w-full resize-none rounded bg-white p-2 outline-none dark:bg-black dark:text-white"
          placeholder="粘贴嵌入了零宽字符的文本"
        />

        <div>
          <button @click="decrypt" class="btn">解密提取</button>
        </div>
      </div>
    </div>

    <div class="flex min-h-32 gap-4 rounded bg-white p-4 dark:bg-black">
      <div class="flex-1">
        {{ result }}
      </div>

      <div>
        <button @click="copyResult" class="btn">复制</button>
      </div>
    </div>
  </div>
</template>
