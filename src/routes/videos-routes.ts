import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {inputValidatorMiddleware, titleValidation} from "../middlewares/input-validator-middleware";

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    const foundVideos = videosRepository.findVideos(req.query.title?.toString())
    res.send(foundVideos)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const foundVideo = videosRepository.findVideoById(+req.params.id)
    if (foundVideo) {
        res.send(foundVideo)
    } else {
        res.send(404)
    }
})
videosRouter.post('/',
    titleValidation,
    inputValidatorMiddleware,

    (req: Request, res: Response) => {
        const newVideo = videosRepository.createVideo(req.body.title)
        res.send(newVideo)
    })
videosRouter.put('/:id',
    titleValidation,
    inputValidatorMiddleware,

    (req: Request, res: Response) => {
        const isUpdate = videosRepository.updateVideo(+req.params.id, req.body.title)
        if (isUpdate) {
            res.send(204)
        } else {
            res.send(404)
        }
    })
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const isDelete = videosRepository.deleteVideo(+req.params.id)
    if (isDelete) {
        res.send(204)
    } else {
        res.send(404)
    }
})