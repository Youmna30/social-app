import { createTransport, Transporter } from "nodemailer";
import { MailProvider } from "./mail.interface";

interface INodemailerConfig {
  user: string;
  password: string;
  fromEmail: string;
  host: string;
  port: number;
}
export class NodemailerProvider implements MailProvider {
  private client: Transporter;
  private fromEmail: string;

  constructor(config: INodemailerConfig) {
    this.client = createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
    this.fromEmail = config.fromEmail;
  }
  async sendEmail(email: string, subject: string, html: string) {
    await this.client.sendMail({
      from: `${this.fromEmail}`,
      to: email,
      subject: subject,
      html: html,
    });
  }
}
