import { d as defineEventHandler, e as connectDB, i as requireAuth, j as getRouterParam, f as createError, T as Ticket } from '../../../_/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const user = await requireAuth(event);
    const ticketId = getRouterParam(event, "id");
    if (!ticketId) {
      throw createError({
        statusCode: 400,
        message: "ID del ticket es requerido"
      });
    }
    const ticket = await Ticket.findById(ticketId).populate("createdBy", "name email role department profilePhoto").populate("assignedTo", "name email role department profilePhoto").populate("comments.user", "name email profilePhoto");
    if (!ticket) {
      throw createError({
        statusCode: 404,
        message: "Ticket no encontrado"
      });
    }
    if (user.role !== "admin" && ticket.createdBy._id.toString() !== user._id.toString()) {
      throw createError({
        statusCode: 403,
        message: "No tienes permiso para ver este ticket"
      });
    }
    return {
      success: true,
      ticket
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error obteniendo ticket:", error);
    throw createError({
      statusCode: 500,
      message: "Error al obtener el ticket"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
