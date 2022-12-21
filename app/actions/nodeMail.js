const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aliho3ein.onlineshop@gmail.com",
    pass: "youfaajvhyxmvzrs",
    // pass: "onLineShop?2022",
  },
});

function sendVerify() {
  console.log("value");
  /* let detail = {
    from: "aliho3ein.onlineshop@gmail.com",
    to: "mail",
    subject: "this is a test",
    text: "this is an text",
  };

  mailTransporter.sendMail(detail, (err) => {
    err ? console.log(err) : console.log("success");
  });*/
}

module.exports = { sendVerify };
