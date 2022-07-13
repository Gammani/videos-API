import ip from "ip";
import {NextFunction, Request, Response} from "express";

let counterRequests = 1;

type BlockListIpType = {
    ip: string
}
type BlockListsIpType = {
    [key: string]: BlockListIpType
}

const blockListsIp: BlockListsIpType = {
// '0': {ip: '192.168.0.104'},
    '1': {ip: '192.168.0.105'}
}

const myIp = ip.address()

export const guardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    counterRequests++
    const isInValid = Object.keys(blockListsIp).find(b => blockListsIp[b].ip === ip.address())
    res.setHeader(counterRequests.toString(), 'application/json')
    if(isInValid) {
        res.send('your IP is blocked')
    } else if (!req.is('application/json')) {
        // Send error here
        res.send(400);
    } else {
        next()
    }
}