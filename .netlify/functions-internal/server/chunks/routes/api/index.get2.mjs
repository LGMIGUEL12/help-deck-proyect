import { d as defineEventHandler, e as connectDB, U as User, f as createError } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 });
    return {
      success: true,
      users: users.map((user) => user.toJSON())
    };
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw createError({
      statusCode: 500,
      message: "Error al obtener los usuarios"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
