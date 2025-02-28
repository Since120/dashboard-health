import './config'; // Lädt die Umgebungsvariablen (z.B. API_URL)
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { URL } from 'url';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  
  // Standard API_URL verwenden, wenn keine definiert ist
  const apiUrl = process.env.API_URL || 'http://localhost:3001';
  logger.log(`Verwende API_URL: ${apiUrl}`);

  let port: number;
  try {
    const parsedUrl = new URL(apiUrl);
    port = Number(parsedUrl.port) || 3001; // Verwende 3001 als Standardport, wenn keiner angegeben ist
    
    if (isNaN(port)) {
      logger.warn(`Ungültiger Port in API_URL: ${apiUrl}, verwende Standardport 3001`);
      port = 3001;
    }
  } catch (error) {
    logger.warn(`Fehler beim Parsen von API_URL: ${apiUrl}, verwende Standardport 3001`);
    port = 3001;
  }

  const app = await NestFactory.create(AppModule);
  
  // CORS aktivieren für die Kommunikation mit dem Frontend
  app.enableCors({
    origin: true, // Für die Entwicklung erlauben wir alle Ursprünge
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
  logger.log(`API läuft auf Port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});