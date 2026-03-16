'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Lock, Unlock, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { encrypt, decrypt } from '@/lib/zero-width'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

export default function Home() {
  const t = useTranslations()
  const [carrierText, setCarrierText] = useState('')
  const [secretText, setSecretText] = useState('')
  const [encryptResult, setEncryptResult] = useState('')

  const [decodeInput, setDecodeInput] = useState('')
  const [decryptResult, setDecryptResult] = useState('')

  const [encryptCopied, setEncryptCopied] = useState(false)
  const [decryptCopied, setDecryptCopied] = useState(false)

  const copyToClipboard = useCopyToClipboard()

  function handleEncrypt() {
    if (!carrierText || !secretText) return
    setEncryptResult(encrypt(carrierText, secretText))
  }

  function handleDecrypt() {
    if (!decodeInput) return
    setDecryptResult(decrypt(decodeInput))
  }

  async function handleCopy(text: string, type: 'encrypt' | 'decrypt') {
    await copyToClipboard(text)
    if (type === 'encrypt') {
      setEncryptCopied(true)
      setTimeout(() => setEncryptCopied(false), 1500)
    } else {
      setDecryptCopied(true)
      setTimeout(() => setDecryptCopied(false), 1500)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-4" />
            {t('encrypt.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="carrier">{t('encrypt.carrierLabel')}</Label>
            <Textarea
              id="carrier"
              placeholder={t('encrypt.carrierPlaceholder')}
              value={carrierText}
              onChange={(e) => setCarrierText(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="secret">{t('encrypt.secretLabel')}</Label>
            <Textarea
              id="secret"
              placeholder={t('encrypt.secretPlaceholder')}
              value={secretText}
              onChange={(e) => setSecretText(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleEncrypt}
            disabled={!carrierText || !secretText}
            className="w-full cursor-pointer"
          >
            <Lock className="size-4" />
            {t('encrypt.button')}
          </Button>

          {encryptResult && (
            <div className="space-y-2">
              <Label>{t('encrypt.resultLabel')}</Label>
              <div className="bg-muted/50 flex items-start gap-2 rounded-md border p-3">
                <p className="min-h-16 flex-1 text-sm break-all">
                  {encryptResult}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 cursor-pointer"
                  onClick={() => handleCopy(encryptResult, 'encrypt')}
                >
                  {encryptCopied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Unlock className="size-4" />
            {t('decrypt.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="decode">{t('decrypt.inputLabel')}</Label>
            <Textarea
              id="decode"
              placeholder={t('decrypt.inputPlaceholder')}
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleDecrypt}
            disabled={!decodeInput}
            className="w-full cursor-pointer"
          >
            <Unlock className="size-4" />
            {t('decrypt.button')}
          </Button>

          {decryptResult && (
            <div className="space-y-2">
              <Label>{t('decrypt.resultLabel')}</Label>
              <div className="bg-muted/50 flex items-start gap-2 rounded-md border p-3">
                <p className="min-h-16 flex-1 text-sm break-all">
                  {decryptResult}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 cursor-pointer"
                  onClick={() => handleCopy(decryptResult, 'decrypt')}
                >
                  {decryptCopied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
