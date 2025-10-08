import { d as defineEventHandler, s as seedTickets, f as createError } from '../../../_/nitro.mjs';
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

const tickets_post = defineEventHandler(async (event) => {
  try {
    const result = await seedTickets();
    return {
      success: true,
      message: "Tickets de prueba creados exitosamente",
      data: result
    };
  } catch (error) {
    console.error("Error al crear tickets de prueba:", error);
    throw createError({
      statusCode: 500,
      message: "Error al crear tickets de prueba: " + error.message
    });
  }
});

export { tickets_post as default };
//# sourceMappingURL=tickets.post.mjs.map
