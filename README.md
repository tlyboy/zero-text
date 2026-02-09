# Zero Text

🕵️ Zero-width text steganography generator

- ✅ Convert any content (including CJK characters and emoji) to zero-width characters
- ✅ Embed encrypted messages into normal host text (appears completely normal)
- ✅ One-click decryption to extract hidden messages
- ✅ Auto-paste, copy button, and bidirectional interaction
- ✅ Pure frontend implementation, **no data upload, safe and reliable**

## Install

```bash
git clone https://github.com/tlyboy/zero-text.git
```

## Usage

```bash
pnpm install
pnpm dev
pnpm build
```

### Encrypt & Embed

1. Enter the text you want to hide (e.g., `my password is 123456`)
2. Enter a normal-looking "host text" (e.g., `Hello, how are you today?`)
3. Click the **Encrypt & Embed** button
4. The tool inserts zero-width characters into the host text, producing text that looks completely normal

### Decrypt & Extract

1. Paste the text containing hidden information into the "Decrypt Input" area
2. Click **Decrypt & Extract**
3. The tool will recover the originally hidden text

### Technical Implementation

- Uses the following Unicode characters:
  - `\u200B` (zero-width space) to represent `0`
  - `\u200C` (zero-width non-joiner) to represent `1`
- Original text -> UTF-8 -> binary -> zero-width characters -> inserted into host text
- Decryption reverses the above process
- All encryption / decryption operations are performed locally in the browser with no data stored or uploaded

## License

[MIT](https://opensource.org/licenses/MIT) © Guany
