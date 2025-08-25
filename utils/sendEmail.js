import nodemailer from 'nodemailer'
const sendEmail = async (email, subject, text) => {
    // Validate required parameters
    if (!email || !subject || !text) {
        throw new Error('Missing required parameters: email, subject, and text are required')
    }
    // Validate environment variables
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
        throw new Error('Missing required environment variables: MAIL_USER and MAIL_PASS')
    }
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,      
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            text: text
        })
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (err) {
        console.error('Error sending email:', err);
        throw new Error(`Failed to send email: ${err.message}`);
    }
}
export default sendEmail;