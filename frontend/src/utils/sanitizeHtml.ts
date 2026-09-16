import DOMPurify from 'dompurify'

const ALLOWED_TAGS = ['a', 'b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li']
const ALLOWED_ATTR = ['href', 'target', 'rel']

export function sanitizeHtml(value: unknown): string {
    if (typeof value !== 'string') {
        return ''
    }
    return DOMPurify.sanitize(value, {
        ALLOWED_TAGS,
        ALLOWED_ATTR,
    })
}

export default sanitizeHtml