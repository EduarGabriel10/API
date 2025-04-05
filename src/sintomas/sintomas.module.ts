import { Module } from '@nestjs/common';
import { SintomasService } from './sintomas.service';
import { SintomasController } from './sintomas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SintomasController],
  providers: [SintomasService],
  imports : [PrismaModule],
})
export class SintomasModule {}
