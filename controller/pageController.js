const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {

    console.log(req.session.UserID);
    res.render('index', {

        page_name: 'index',
    });
};



exports.getAboutPage = (req, res) => {
    res.render('about', {
        page_name: 'about',
    });
};

exports.getRegisterPage = (req, res) => {
    res.render('register', {
        page_name: 'register',
    });
};

exports.getLoginPage = (req, res) => {
    res.render('login', {
        page_name: 'login',
    });
};

exports.getContactPage = (req, res) => {
    res.render('contact', {
        page_name: 'contact',
    });
};

exports.sendEmail = async (req, res) => {
    try {
    const outputMessage = `
    <h1> Mail Details </h1>
    <ul>
        <li>Name: ${req.body.name} </li>
        <li>Email:${req.body.email}  </li>
    </ul>
    <h1> Message </h1>
    <p>${req.body.message} </p>
    `
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "kadir.kaplan13@gmail.com", // generated gmail user
          pass: "zgxnqhhrrfmmxprs", // generated gmail password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <kadir.kaplan13@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
       
        html: outputMessage, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    req.flash("success", "We Received your message succesfuly!");
      res.redirect('/contact');
    } catch(error){
        req.flash("error", `Something Happend! `);
        res.redirect('/contact');
    }
};



