import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController {
    async handle(req: Request, res: Response){
        const {user_id} = req;
        const listUserReceivedComplimentsService = new ListUserReceiveComplimentsService();
        const compliments = await listUserReceivedComplimentsService.execute(user_id);

        return res.json(compliments)
    }
}

export { ListUserReceiveComplimentsController }