import { d as defineEventHandler, e as connectDB, r as readBody, f as createError, h as useRuntimeConfig, U as User } from '../../../_/nitro.mjs';
import { OAuth2Client } from 'google-auth-library';
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

const google_post = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const body = await readBody(event);
    const { credential } = body;
    if (!credential) {
      throw createError({
        statusCode: 400,
        message: "Credencial de Google es requerida"
      });
    }
    const config = useRuntimeConfig();
    const googleClientId = config.googleClientId;
    if (!googleClientId) {
      throw createError({
        statusCode: 500,
        message: "Configuraci\xF3n de Google OAuth no encontrada"
      });
    }
    const client = new OAuth2Client(googleClientId);
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken: credential,
        audience: googleClientId
      });
    } catch (error) {
      console.error("Error al verificar token de Google:", error);
      throw createError({
        statusCode: 401,
        message: "Token de Google inv\xE1lido"
      });
    }
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    let user = await User.findOne({
      $or: [
        { googleId },
        { email: email.toLowerCase() }
      ]
    });
    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        if (picture && !user.profilePhoto) {
          user.profilePhoto = picture;
        }
        await user.save();
      }
    } else {
      user = await User.create({
        email: email.toLowerCase(),
        name: name || email.split("@")[0],
        googleId,
        authProvider: "google",
        profilePhoto: picture || void 0
      });
    }
    return {
      success: true,
      user: user.toJSON(),
      message: "Autenticaci\xF3n con Google exitosa"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error en Google OAuth:", error);
    throw createError({
      statusCode: 500,
      message: "Error en el servidor"
    });
  }
});

export { google_post as default };
//# sourceMappingURL=google.post.mjs.map
