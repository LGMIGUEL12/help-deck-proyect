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

const profile_patch = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const body = await readBody(event);
    const { userId, name, jobTitle, phone, email, address, department, profilePhoto, interests } = body;
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "ID de usuario es requerido"
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "Usuario no encontrado"
      });
    }
    const updateData = {};
    if (name !== void 0) updateData.name = name;
    if (jobTitle !== void 0) updateData.jobTitle = jobTitle;
    if (phone !== void 0) updateData.phone = phone;
    if (address !== void 0) updateData.address = address;
    if (department !== void 0) updateData.department = department;
    if (profilePhoto !== void 0) updateData.profilePhoto = profilePhoto;
    if (interests !== void 0) updateData.interests = interests;
    if (email !== void 0 && email !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        throw createError({
          statusCode: 400,
          message: "Este email ya est\xE1 en uso"
        });
      }
      updateData.email = email.toLowerCase();
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return {
      success: true,
      user: updatedUser.toJSON(),
      message: "Perfil actualizado exitosamente"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error al actualizar perfil:", error);
    throw createError({
      statusCode: 500,
      message: "Error al actualizar el perfil"
    });
  }
});

export { profile_patch as default };
//# sourceMappingURL=profile.patch.mjs.map
