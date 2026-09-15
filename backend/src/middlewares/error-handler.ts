import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    let statusCode = err.statusCode || 500
    let message =
        statusCode === 500 ? 'На сервере произошла ошибка' : err.message

    if (err.type === 'entity.too.large') {
        statusCode = 413
        message = 'Тело запроса слишком большое'
    }

    console.log(err)

    res.status(statusCode).send({ message })

    next()
}

export default errorHandler