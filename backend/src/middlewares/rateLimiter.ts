import rateLimit from 'express-rate-limit'

export const apiRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Слишком много запросов, попробуйте позже' },
})

export default apiRateLimiter