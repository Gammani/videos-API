import {videos} from "./db";

export const videosRepository = {
    findVideos(title: string | null | undefined) {
        if(title) {
            const filteredVideo = videos.filter(v => v.title.indexOf(title.toString()) > -1)
            return filteredVideo;
        } else {
            return videos;
        }
    },
    findVideoById(id: number) {
        const video = videos.find(v => v.id === id)
        return video;
    },
    createVideo(title: string) {
        const newVideo = {
            id: +new Date(),
            title: title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        return newVideo;
    },
    updateVideo(id: number, title: string) {
        const foundVideo = videos.find(v => v.id === id)
        if(foundVideo) {
            foundVideo.title = title
            return true;
        } else {
            return false;
        }
    },
    deleteVideo(id: number) {
        const foundIndex = videos.findIndex(v => v.id === id)
        if(foundIndex > -1) {
            videos.splice(foundIndex, 1)
            return true;
        } else {
            return false;
        }
    }
}