import rateLimit from 'express-rate-limit'

export const apiRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Слишком много запросов, попробуйте позже' },
    // CSRF-токен нужен для старта работы, его выдаём без лимита
    skip: (req) => req.path === '/auth/csrf-token',
})

export default apiRateLimiter