import { d as defineEventHandler, e as connectDB, r as readBody, f as createError, U as User } from '../../../_/nitro.mjs';
import 'mongoose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'bcrypt';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';

const create_post = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const body = await readBody(event);
    const { email, name, role, department, password } = body;
    if (!email || !name) {
      throw createError({
        statusCode: 400,
        message: "Email y nombre son requeridos"
      });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: "Ya existe un usuario con este correo electr\xF3nico"
      });
    }
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: password || "Password123!",
      // Password por defecto si no se proporciona
      name,
      role: role || "user",
      department: department || ""
    });
    return {
      success: true,
      user: newUser.toJSON(),
      message: "Usuario creado exitosamente"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      throw createError({
        statusCode: 400,
        message: messages.join(", ")
      });
    }
    console.error("Error al crear usuario:", error);
    throw createError({
      statusCode: 500,
      message: "Error en el servidor"
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
