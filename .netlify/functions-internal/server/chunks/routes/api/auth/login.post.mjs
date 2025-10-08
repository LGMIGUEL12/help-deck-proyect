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

const login_post = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Email y contrase\xF1a son requeridos"
      });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Credenciales inv\xE1lidas"
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: "Credenciales inv\xE1lidas"
      });
    }
    return {
      success: true,
      user: user.toJSON(),
      message: "Login exitoso"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error en login:", error);
    throw createError({
      statusCode: 500,
      message: "Error en el servidor"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
