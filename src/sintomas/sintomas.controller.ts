import { Body, Controller, Post } from '@nestjs/common';
import { SintomasService } from './sintomas.service';

interface Sintomas {
  nombre: string;
  descripcion: string;
  usuarioId: number;
}

@Controller('sintomas')
export class SintomasController {
  constructor(private readonly sintomasService: SintomasService) {}

  @Post()
  async createSintomas(@Body() sintomas: Sintomas) {

    return await this.sintomasService.createSintomas(sintomas);
  }
}
