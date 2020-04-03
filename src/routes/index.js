/*ROUTES*/
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Home route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home - My first NodeJS Website' });
});

// Contact Route
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact - My first NodeJS Website', message: '' });
});

router.post('/contact', (req, res) => {

    const output = `
        <p>You have a new contact request</p>
        <h3>Contacts Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        ${req.body.message}
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'moisesmmltest@gmail.com', // generated ethereal user
            pass: 'pwdprueba' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <moisesmmltest@gmail.com>', // sender address
        to: "moisesmartinezliranzo@gmail.com", // list of receivers
        subject: "Node contact request", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render('contact', { title: 'Contact - My first NodeJS Website', message: 'Your message have been sent!' });
    });

});

module.exports = router;