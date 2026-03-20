/**
 * Vercel Serverless Function Entry Point
 *
 * This file exports the NestJS application as a Vercel serverless function.
 * Uses Node.js runtime only (no Bun-specific APIs).
 */

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { AppModule } from '../backend/src/app/app.module';

const server = express();
let cachedApp: express.Express | null = null;

async function bootstrap(): Promise<express.Express> {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.init();
  cachedApp = server;
  return cachedApp;
}

export default async (req: express.Request, res: express.Response) => {
  const instance = await bootstrap();
  instance(req, res);
};
