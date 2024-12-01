import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Siniestro, Cliente, Poliza, TipoDocumento } from '../types';

export function generarPlantillaSolicitud(
  siniestro: Siniestro,
  cliente: Cliente,
  poliza: Poliza,
  documentosRequeridos: TipoDocumento[]
): string {
  const fechaOcurrencia = format(
    new Date(siniestro.fechaOcurrencia),
    "dd 'de' MMMM 'de' yyyy",
    { locale: es }
  );

  const listaDocumentos = documentosRequeridos
    .map(doc => `<li>${doc}</li>`)
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Solicitud de Documentación - Siniestro ${siniestro.numeroSiniestro}</h2>
      
      <p>Estimado/a ${cliente.nombre} ${cliente.apellidos},</p>
      
      <p>En relación al siniestro ocurrido el ${fechaOcurrencia}, necesitamos que nos proporcione la siguiente documentación para continuar con el proceso de liquidación:</p>
      
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Documentos Requeridos:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          ${listaDocumentos}
        </ul>
      </div>

      <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #92400E;">Información Importante:</h4>
        <p style="margin-bottom: 0;">
          El plazo para la liquidación de este siniestro es de 
          ${poliza.primaAnualUF < 100 ? '45' : '90'} días desde la fecha de ocurrencia.
          Es importante proporcionar la documentación solicitada lo antes posible para evitar retrasos en el proceso.
        </p>
      </div>

      <p>Puede enviar la documentación respondiendo a este correo o subiéndola directamente a través de nuestra plataforma web.</p>

      <p>Si tiene alguna duda sobre la documentación solicitada o necesita asistencia, no dude en contactarnos.</p>

      <div style="margin-top: 30px;">
        <p style="color: #4B5563; font-size: 14px;">Saludos cordiales,</p>
        <p style="color: #4B5563; font-size: 14px;">Departamento de Siniestros</p>
      </div>
    </div>
  `;
}