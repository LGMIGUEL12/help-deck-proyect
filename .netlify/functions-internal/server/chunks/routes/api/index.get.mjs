import { d as defineEventHandler, e as connectDB, i as requireAuth, k as getQuery, T as Ticket, f as createError } from '../../_/nitro.mjs';
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
    const user = await requireAuth(event);
    const query = getQuery(event);
    const { status, priority, category } = query;
    let filters = {};
    if (user.role !== "admin") {
      filters.createdBy = user._id;
    }
    if (status) {
      filters.status = status;
    }
    if (priority) {
      filters.priority = priority;
    }
    if (category) {
      filters.category = category;
    }
    const tickets = await Ticket.find(filters).populate("createdBy", "name email role department profilePhoto").populate("assignedTo", "name email role department profilePhoto").sort({ createdAt: -1 });
    return {
      success: true,
      tickets,
      count: tickets.length,
      userRole: user.role
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error obteniendo tickets:", error);
    throw createError({
      statusCode: 500,
      message: "Error al obtener los tickets"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
