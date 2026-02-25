const IMAGE_BASE_URL = process.env.EXPO_PUBLIC_IMAGE_BASE_URL || ''

export const getImageUrl = (photoSrc?: string | null, fallback?: string): string => {
    if (!photoSrc) {
        return fallback || ''
    }

    if (photoSrc.startsWith('http://') || photoSrc.startsWith('https://')) {
        return photoSrc
    }

    return `${IMAGE_BASE_URL}${photoSrc}`
}
