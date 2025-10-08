import { d as defineEventHandler, e as connectDB, i as requireAuth, j as getRouterParam, f as createError, r as readBody, T as Ticket } from '../../../../_/nitro.mjs';
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

const comments_post = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const { message } = body;
    if (!message || !message.trim()) {
      throw createError({
        statusCode: 400,
        message: "El mensaje del comentario es requerido"
      });
    }
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw createError({
        statusCode: 404,
        message: "Ticket no encontrado"
      });
    }
    const isOwner = ticket.createdBy.toString() === user._id.toString();
    const isAdmin = user.role === "admin";
    const isAssigned = ticket.assignedTo && ticket.assignedTo.toString() === user._id.toString();
    if (!isOwner && !isAdmin && !isAssigned) {
      throw createError({
        statusCode: 403,
        message: "No tienes permiso para comentar en este ticket"
      });
    }
    ticket.comments.push({
      user: user._id,
      message: message.trim(),
      createdAt: /* @__PURE__ */ new Date()
    });
    await ticket.save();
    await ticket.populate("createdBy", "name email role department profilePhoto");
    await ticket.populate("assignedTo", "name email role department profilePhoto");
    await ticket.populate("comments.user", "name email profilePhoto");
    return {
      success: true,
      ticket,
      message: "Comentario agregado exitosamente"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error agregando comentario:", error);
    throw createError({
      statusCode: 500,
      message: "Error al agregar el comentario"
    });
  }
});

export { comments_post as default };
//# sourceMappingURL=comments.post.mjs.map
