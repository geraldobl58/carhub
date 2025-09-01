import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getServerEnv from '@carhub/env/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envResult = getServerEnv();

  if (envResult instanceof Error) {
    throw envResult;
  }

  const port = Number(envResult.PORT);

  await app.listen(port);
}

void bootstrap();
