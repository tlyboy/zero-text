// 零宽字符映射：0 → \u200B (ZWSP), 1 → \u200C (ZWNJ)
const ZWC = { 0: '\u200B', 1: '\u200C' } as const

// 文本 → UTF-8 二进制字符串
function textToBinary(text: string): string {
  const utf8 = new TextEncoder().encode(text)
  return Array.from(utf8)
    .map((b) => b.toString(2).padStart(8, '0'))
    .join('')
}

// 二进制字符串 → 文本
function binaryToText(bin: string): string {
  const bytes = bin.match(/.{8}/g)?.map((b) => parseInt(b, 2)) ?? []
  return new TextDecoder().decode(new Uint8Array(bytes))
}

// 二进制字符串 → 零宽字符
function binaryToZWC(bin: string): string {
  return bin
    .split('')
    .map((b) => ZWC[Number(b) as keyof typeof ZWC])
    .join('')
}

// 零宽字符 → 二进制字符串
function zwcToBinary(zwcText: string): string {
  return [...zwcText]
    .map((c) => (c === '\u200B' ? '0' : c === '\u200C' ? '1' : ''))
    .join('')
}

// 加密：将秘密文本编码为零宽字符，插入载体文本中点
export function encrypt(carrier: string, secret: string): string {
  const binary = textToBinary(secret)
  const zwcText = binaryToZWC(binary)
  const mid = Math.floor(carrier.length / 2)
  return carrier.slice(0, mid) + zwcText + carrier.slice(mid)
}

// 解密：从文本中提取零宽字符，还原为明文
export function decrypt(text: string): string {
  const zwcChars = [...text]
    .filter((c) => c === '\u200B' || c === '\u200C')
    .join('')
  const binary = zwcToBinary(zwcChars)
  return binaryToText(binary)
}
