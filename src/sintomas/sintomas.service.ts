import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Sintomas {
    nombre: string;
    descripcion: string;
    usuarioId: number;
}

@Injectable()
export class SintomasService {

    constructor(private prisma: PrismaService) { }

    async createSintomas(sintomas: Sintomas) {
        try {
            const existeSintoma = await this.prisma.sintomas.findFirst({
                where: {
                    AND: [
                        {
                            usuarioId: sintomas.usuarioId,
                            nombre: sintomas.nombre,
                        }
                    ]
                },
            });
    
            if (existeSintoma) {
                throw new BadRequestException('El usuario ya tiene registrado este síntoma');
            }
    
            const newSintomas = await this.prisma.sintomas.create({
                data: {
                    ...sintomas,
                },
            });
    
            return {
                message: 'Síntoma creado con éxito',
                data: newSintomas,
            };
    
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error('Error al crear síntoma');
        }
    }

}
