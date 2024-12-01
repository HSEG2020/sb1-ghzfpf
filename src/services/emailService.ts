import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Poliza, Cliente } from '../types';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const enviarPolizaPorEmail = async (
  poliza: Poliza,
  cliente: Cliente,
  pdfUrl: string
) => {
  const cuotaMensual = poliza.primaAnualUF / 12;
  const fechaFormateada = format(new Date(poliza.fechaInicio), 'dd MMMM yyyy', { locale: es });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">¡Bienvenido a tu nueva póliza de seguros!</h2>
      
      <p>Estimado/a ${cliente.nombre} ${cliente.apellidos},</p>
      
      <p>Nos complace confirmar que tu póliza de seguros ha sido emitida exitosamente. A continuación, encontrarás los detalles principales:</p>
      
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Número de Póliza:</strong> ${poliza.numeroPoliza}</p>
        <p><strong>Compañía:</strong> ${poliza.compania.nombre}</p>
        <p><strong>Ramo:</strong> ${poliza.ramoSeguro.nombre}</p>
        <p><strong>Fecha de Inicio:</strong> ${fechaFormateada}</p>
        <p><strong>Prima Anual:</strong> ${poliza.primaAnualUF} UF</p>
        <p><strong>Cuota Mensual:</strong> ${cuotaMensual.toFixed(2)} UF</p>
      </div>

      <p>Hemos adjuntado a este correo una copia digital de tu póliza para tu registro.</p>

      <p>Recuerda que estamos aquí para ayudarte. Si tienes alguna pregunta sobre tu póliza o necesitas asistencia, no dudes en contactarnos.</p>

      <div style="margin-top: 30px;">
        <p style="color: #4B5563; font-size: 14px;">Saludos cordiales,</p>
        <p style="color: #4B5563; font-size: 14px;">Tu Equipo de Seguros</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: cliente.email,
    subject: `Tu nueva póliza de seguros - ${poliza.numeroPoliza}`,
    html,
    attachments: [
      {
        filename: `poliza-${poliza.numeroPoliza}.pdf`,
        path: pdfUrl,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};