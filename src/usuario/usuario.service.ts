import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

interface Usuario {

    email: string;
    contrasena: string;
    nombre: string;
    telefono: string;
}

@Injectable()
export class UsuarioService {

    constructor(private prisma: PrismaService) {}

    // Función para verificar si el usuario ya existe por correo
    async getUsuarioByEmail(email: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: email },
        });
        return usuario; // Retorna null si no se encuentra
    }

    async createUsuarioFromGoogle(usuario: Usuario) {
        // Verificar si el usuario ya existe
        const existingUser = await this.getUsuarioByEmail(usuario.email);
        console.log('Usuario encontrado:', existingUser); // Agrega este log para depurar
    
        if (existingUser) {
            return {
                message: 'Usuario ya registrado',
                usuario: existingUser,
            };
        }
    
        // Si no existe, crear el nuevo usuario con solo nombre y email
        const newUsuario = await this.prisma.usuario.create({
            data: {
                ...usuario,
            },
        });
    
        console.log('Nuevo usuario creado:', newUsuario); // Agrega este log para depurar
    
        return {
            message: 'Usuario creado correctamente',
            usuario: newUsuario,
        };
    }
    

    async createUsuario(usuario: Usuario) {
        // Generar un hash de la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
    
        const newUsuario = await this.prisma.usuario.create({
            data: {
                ...usuario,
                contrasena: hashedPassword, // Guardar la contraseña cifrada
            },
        });
    
        return {
            message: 'Usuario creado correctamente',
            usuario: newUsuario,
        };
    }
    
    async loginUsuario(email: string, contrasena: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: email },
        });
    
        if (!usuario) {
            return {
                message: 'Error: Usuario no encontrado',
                usuario: null,
            };
        }
    
        // Comparar la contraseña ingresada con la cifrada en la base de datos
        const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
    
        if (!isPasswordValid) {
            return {
                message: 'Error: Contraseña incorrecta',
                usuario: null,
            };
        }
    
        return {
            message: 'Usuario logueado correctamente',
            usuario: usuario,
        };
    }



    //recuperar usuario
    async getUsuario(email: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });
        return {
            messagge: 'Usuario recuperado correctamente',
            usuario: usuario,
        };
    }

    //recuperar usuarios
    async getUsuarios() {
        const usuarios = await this.prisma.usuario.findMany();
        return {
            messagge: 'Usuarios recuperados correctamente',
            usuarios: usuarios,
        };
    }

    //actualizar usuario
    async updateUsuario(usuario: Usuario) {
        const updatedUsuario = await this.prisma.usuario.update({
            where: {
                email: usuario.email,
            },
            data: usuario,
        });
        return {
            messagge: 'Usuario actualizado correctamente',
            usuario: updatedUsuario,
        };
    }

    //sintomas de un usuario
    async getSintomas(email: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });
        const sintomas = await this.prisma.sintomas.findMany({
            where: {
                usuarioId: usuario?.id,
            },
        });
        return {
            messagge: 'Sintomas recuperados correctamente',
            usuario: usuario,
            sintomas: sintomas,
        };
    }

}
