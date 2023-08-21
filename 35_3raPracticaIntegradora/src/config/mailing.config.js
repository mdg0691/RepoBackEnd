import mailer from 'nodemailer'
import config from './config'

export default class MailingService{
    constructor(){
        this.client= mailer.createTransport({
            service:config.mailing_service,
            port: 587,
            auth:{
                user:config.mailing_user,
                pass:config.mailing_password
            }
        })
    }

    sendSimpleMail = async ({from,to,subject,html,attachment = []}) => {
        let result = this.client.sendMail({
            from,
            to,
            subject,
            html,
            attachment
        })
        console.log(result)
        return result
    }
}

