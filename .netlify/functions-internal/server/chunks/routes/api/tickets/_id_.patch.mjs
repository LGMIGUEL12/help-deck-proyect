import { d as defineEventHandler, e as connectDB, i as requireAuth, j as getRouterParam, f as createError, r as readBody, T as Ticket } from '../../../_/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
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
    const { status, priority, category, assignedTo } = body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw createError({
        statusCode: 404,
        message: "Ticket no encontrado"
      });
    }
    const isOwner = ticket.createdBy.toString() === user._id.toString();
    const isAdmin = user.role === "admin";
    if (!isOwner && !isAdmin) {
      throw createError({
        statusCode: 403,
        message: "No tienes permiso para actualizar este ticket"
      });
    }
    if (status) {
      ticket.status = status;
      if (status === "resolved") {
        ticket.resolvedAt = /* @__PURE__ */ new Date();
      }
      if (status === "closed") {
        ticket.closedAt = /* @__PURE__ */ new Date();
      }
    }
    if (priority) {
      ticket.priority = priority;
    }
    if (category) {
      ticket.category = category;
    }
    if (assignedTo !== void 0 && isAdmin) {
      ticket.assignedTo = assignedTo;
    }
    await ticket.save();
    await ticket.populate("createdBy", "name email role department profilePhoto");
    await ticket.populate("assignedTo", "name email role department profilePhoto");
    return {
      success: true,
      ticket,
      message: "Ticket actualizado exitosamente"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error actualizando ticket:", error);
    throw createError({
      statusCode: 500,
      message: "Error al actualizar el ticket"
    });
  }
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
