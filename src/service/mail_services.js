require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("../config");
const logger = require("../util/logger");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const SendConfirmationEmail = async (name, email, code) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Harap konfirmasi akun Anda",
      html: `<h1>konfirmasi email</h1>
      <tr>
      <td align="left" bgcolor="#ffffff"
      style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;color: #666;">
      <p>Hallo : ${name}</p>
      <p>Email : ${email}</p>
      <p>Kode OTP anda : ${code}</p>
    </td>
    <tr>
    <hr>
      <p>Terima kasih sudah Bergabung Bersama Kami</p>
    </tr>
    <td align="center" bgcolor="#e9ecef"
      style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
      <p style="margin: 0;">PT LSKK dan PPTIK<a href="http://lskk.co.id" target="_blank"></p>
      <p style="margin: 0;">Jalan Pelajar Pejuang 45 Nomor 65 Bandung</p>
    </td>
  </tr>
    `,
    })
    .catch((err) => {
      logger.error("Gagal Mengirim Email Konfirmasi");
    });
};

module.exports = {
  SendConfirmationEmail,
};
