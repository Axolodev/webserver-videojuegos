import Airtable from 'airtable';
require('dotenv').config();

export const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY as string,
}).base(process.env.AIRTABLE_BASE as string);
export const puntosTable = base('Puntos');
