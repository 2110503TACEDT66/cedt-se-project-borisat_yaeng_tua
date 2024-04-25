const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

exports.sendEmail = async (req, res) => {
    const { userEmail } = req.body;

    //config transporter
    let config = {
        service: 'gmail',
        auth : {
            user: 'ratchapolkunthong13@gmail.com', //Put Admin email in here !!!
            pass: 'dsrqcnbewtwhhigf' //Put Admin password for application in here !!!
        }
    }

    //create transporter
    let transporter = await nodemailer.createTransport(config);

    //create theme for email
    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: "Mailgen",
            link: "https://mailgen.js"
        }
    });

    let response = {
        body: {
            name: "Daily Tuition",
            intro: "Your email has arrived!",
            table: {
                data: [
                    {
                        item: "Nodemailer Stack Book",
                        description: "A Backend application",
                        price: "$10.99"
                    } 
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response);

    let message = {
        from: 'ratchapolkunthong13@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: "Testing 1", // Subject line
        html: mail // html body
    };

    transporter.sendMail(message).then((info) => {
        return res.status(200).json({
            success: true,
            message: 'You should receive an email',
        });
    }).catch(error => {
        console.log(error.message);
        return res.status(500).json({success: false});
    });
};