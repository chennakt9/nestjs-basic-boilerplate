import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rqmService = app.get(RmqService);
  app.connectMicroservice(rqmService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();
