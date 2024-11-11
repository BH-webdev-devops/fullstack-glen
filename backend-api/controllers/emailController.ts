import {Request, Response} from 'express'

import {transporter} from '../middlewares/emailTransporter'

export const sendEmail = async (req: Request, res: Response): Promise<Response | any> => {

    const {from, subject, text} = req.body
    if(!from || !subject || !text){
        return res.status(400).json({message : `All fields are required`})
    }
    
    try {
        await transporter.sendMail({
            from: "dev.cyth@gmail.com",
            to: "dev.cyth@gmail.com",
            subject: req.body.subject,
            text: req.body.text
        });

        return res.status(200).json({message: "Email send successfully"})

    } catch (err) {
        return res.status(500).json({message: "Internal server error!"})
    }
}