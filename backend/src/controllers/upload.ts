import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { promises as fs } from 'fs'
import BadRequestError from '../errors/bad-request-error'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    try {
        // Проверка минимального размера
        if (req.file.size < 2 * 1024) {
            await fs.unlink(req.file.path)
            return next(new BadRequestError('Файл слишком маленький'))
        }
        // Проверка максимального размера
        if (req.file.size > 10 * 1024 * 1024) {
            await fs.unlink(req.file.path)
            return next(new BadRequestError('Файл слишком большой'))
        }
        // Проверка magic bytes для PNG
        if (req.file.mimetype === 'image/png') {
            const fileBuffer = await fs.readFile(req.file.path)
            const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
            const isPng =
                fileBuffer.length >= pngMagic.length &&
                pngMagic.every((byte, idx) => fileBuffer[idx] === byte)
            if (!isPng) {
                await fs.unlink(req.file.path)
            return next(new BadRequestError('Невалидный PNG-файл'))
            }
        }

        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
