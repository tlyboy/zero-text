<script setup lang="ts">
const secretText = ref('')
const carrierText = ref('')
const decodeInput = ref('')
const encryptResult = ref('')
const decryptResult = ref('')

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
  encryptResult.value = final
}

// 解密方法
function decrypt() {
  const zwcChars = [...decodeInput.value]
    .filter((c) => c === '\u200B' || c === '\u200C')
    .join('')
  const binary = zwcToBinary(zwcChars)
  decryptResult.value = binaryToText(binary)
}

const isEncryptCopied = ref(false)
const isDecryptCopied = ref(false)

// 复制加密结果
async function copyEncryptResult() {
  try {
    isEncryptCopied.value = true
    await navigator.clipboard.writeText(encryptResult.value)
    setTimeout(() => {
      isEncryptCopied.value = false
    }, 1500)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 复制解密结果
async function copyDecryptResult() {
  try {
    isDecryptCopied.value = true
    await navigator.clipboard.writeText(decryptResult.value)
    setTimeout(() => {
      isDecryptCopied.value = false
    }, 1500)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div
    class="flex h-full flex-col overflow-y-auto border-t border-[#DADADA] md:flex-row dark:border-[#292929]"
  >
    <div
      class="flex flex-1 flex-col gap-4 border-b border-[#DADADA] p-4 md:border-r md:border-b-0 dark:border-[#292929]"
    >
      <label class="px-2 text-sm">要显示的文本：</label>
      <textarea
        v-model="carrierText"
        class="h-32 w-full resize-none rounded bg-white p-4 outline-none dark:bg-[#2C2C2C] dark:text-white"
        placeholder="输入要显示的文本"
      />

      <label class="px-2 text-sm">要隐藏的文本：</label>
      <textarea
        v-model="secretText"
        class="h-32 w-full resize-none rounded bg-white p-4 outline-none dark:bg-[#2C2C2C] dark:text-white"
        placeholder="输入要隐藏的内容"
      />

      <div>
        <button @click="encrypt" class="btn flex items-center gap-2">
          <div class="i-carbon-locked"></div>
          <div>加密嵌入</div>
        </button>
      </div>

      <label class="px-2 text-sm">加密结果：</label>

      <div class="flex min-h-32 gap-4 rounded bg-white p-4 dark:bg-[#2C2C2C]">
        <div class="flex-1">
          {{ encryptResult }}
        </div>

        <div>
          <button
            @click="copyEncryptResult"
            class="btn flex items-center gap-2"
            :disabled="isEncryptCopied"
          >
            <div class="i-carbon-copy"></div>
            <div>{{ isEncryptCopied ? '已复制' : '复制' }}</div>
          </button>
        </div>
      </div>
    </div>

    <div
      class="flex flex-1 flex-col gap-4 border-t border-[#DADADA] p-4 md:border-t-0 md:border-l dark:border-[#292929]"
    >
      <label class="px-2 text-sm"
        >解密输入区（将含零宽字符的文本粘贴到这里）：</label
      >
      <textarea
        v-model="decodeInput"
        class="h-32 w-full resize-none rounded bg-white p-4 outline-none dark:bg-[#2C2C2C] dark:text-white"
        placeholder="粘贴嵌入了零宽字符的文本"
      />

      <div>
        <button @click="decrypt" class="btn flex items-center gap-2">
          <div class="i-carbon-unlocked"></div>
          <div>解密提取</div>
        </button>
      </div>

      <label class="px-2 text-sm">解密结果：</label>

      <div class="flex min-h-32 gap-4 rounded bg-white p-4 dark:bg-[#2C2C2C]">
        <div class="flex-1">
          {{ decryptResult }}
        </div>

        <div>
          <button
            @click="copyDecryptResult"
            class="btn flex items-center gap-2"
            :disabled="isDecryptCopied"
          >
            <div class="i-carbon-copy"></div>
            <div>{{ isDecryptCopied ? '已复制' : '复制' }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
