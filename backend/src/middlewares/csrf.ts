import { doubleCsrf } from 'csrf-csrf'
import { Request } from 'express'
import { CSRF_SECRET } from '../config'

const {
    generateCsrfToken,
    doubleCsrfProtection,
    invalidCsrfTokenError,
} = doubleCsrf({
    getSecret: () => CSRF_SECRET,
    getCsrfTokenFromRequest: (req: Request) =>
        req.headers['x-csrf-token'] as string | undefined,
    cookieName: '_csrf',
    cookieOptions: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        path: '/',
    },
    getSessionIdentifier: (req) => req.ip || '',
    skipCsrfProtection: (req) =>
        ['GET', 'HEAD', 'OPTIONS'].includes(req.method),
})

export { generateCsrfToken, doubleCsrfProtection, invalidCsrfTokenError }