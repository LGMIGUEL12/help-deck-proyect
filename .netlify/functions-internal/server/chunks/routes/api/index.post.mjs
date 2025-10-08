import { d as defineEventHandler, e as connectDB, i as requireAuth, r as readBody, f as createError, T as Ticket } from '../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const user = await requireAuth(event);
    const body = await readBody(event);
    const { title, description, priority, category } = body;
    if (!title || !description) {
      throw createError({
        statusCode: 400,
        message: "T\xEDtulo y descripci\xF3n son requeridos"
      });
    }
    const ticket = new Ticket({
      title,
      description,
      priority: priority || "medium",
      category: category || "General",
      createdBy: user._id,
      status: "open"
    });
    await ticket.save();
    await ticket.populate("createdBy", "name email role department profilePhoto");
    return {
      success: true,
      ticket,
      message: "Ticket creado exitosamente"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error creando ticket:", error);
    throw createError({
      statusCode: 500,
      message: "Error al crear el ticket"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
