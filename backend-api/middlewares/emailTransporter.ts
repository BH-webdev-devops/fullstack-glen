import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'dev.cyth@gmail.com',
        pass: process.env.NODEMAILER_PASS
    }
})