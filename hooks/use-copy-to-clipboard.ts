import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function useCopyToClipboard() {
  const t = useTranslations('copy')

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        toast.success(t('success'))
      } catch {
        toast.error(t('error'))
      }
    },
    [t],
  )

  return copy
}
