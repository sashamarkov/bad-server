import sanitizeHtml from 'sanitize-html'

const options: sanitizeHtml.IOptions = {
    allowedTags: ['a', 'b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    allowedAttributes: {
        a: ['href', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
        a: sanitizeHtml.simpleTransform('a', {
            rel: 'noopener noreferrer',
            target: '_blank',
        }),
    },
}

export function sanitizeComment(value: unknown): string {
    if (typeof value !== 'string') {
        return ''
    }
    return sanitizeHtml(value, options)
}

export default sanitizeComment