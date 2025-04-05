import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SintomasModule } from './sintomas/sintomas.module';

@Module({
  imports: [PrismaModule, UsuarioModule, SintomasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
