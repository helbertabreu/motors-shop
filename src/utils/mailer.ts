import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (
  userEmail: string,
  resetToken: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Recuperação de senha",
    text: `Você está recebendo este e-mail porque solicitou a recuperação de senha para sua conta.
        Clique no link abaixo ou cole-o no navegador para prosseguir com a alteração da sua senha:
        http://${process.env.PGHOST}:3001/resetpassword/${resetToken}
        Caso não tenha solicitado a recuperação de senha, favor ignorar esse email.`,
  };

  await transporter.sendMail(mailOptions);
};
