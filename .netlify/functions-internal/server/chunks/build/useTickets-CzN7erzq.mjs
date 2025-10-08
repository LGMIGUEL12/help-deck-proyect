import { d as useState } from './server.mjs';
import { readonly, computed } from 'vue';

const useTickets = () => {
  const allTickets = useState("tickets", () => []);
  const loading = useState("tickets.loading", () => false);
  const error = useState("tickets.error", () => null);
  const getUserId = () => {
    return null;
  };
  const fetchTickets = async (filters = {}) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/tickets${queryParams ? "?" + queryParams : ""}`;
      const data = await $fetch(url, {
        method: "GET",
        headers: {
          "x-user-id": userId
        }
      });
      if (data.success) {
        allTickets.value = data.tickets;
        return data.tickets;
      }
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Error al cargar tickets";
      console.error("Error fetching tickets:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };
  const createTicket = async (ticketData) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const data = await $fetch("/api/tickets", {
        method: "POST",
        headers: {
          "x-user-id": userId
        },
        body: ticketData
      });
      if (data.success) {
        allTickets.value.unshift(data.ticket);
        return { success: true, ticket: data.ticket };
      }
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Error al crear ticket";
      console.error("Error creating ticket:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };
  const getTicketById = async (ticketId) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const data = await $fetch(`/api/tickets/${ticketId}`, {
        method: "GET",
        headers: {
          "x-user-id": userId
        }
      });
      if (data.success) {
        return data.ticket;
      }
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Error al obtener ticket";
      console.error("Error getting ticket:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };
  const updateTicket = async (ticketId, updates) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const data = await $fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "x-user-id": userId
        },
        body: updates
      });
      if (data.success) {
        const index = allTickets.value.findIndex((t) => t._id === ticketId);
        if (index !== -1) {
          allTickets.value[index] = data.ticket;
        }
        return { success: true, ticket: data.ticket };
      }
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Error al actualizar ticket";
      console.error("Error updating ticket:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };
  const addComment = async (ticketId, message) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const data = await $fetch(`/api/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: {
          "x-user-id": userId
        },
        body: { message }
      });
      if (data.success) {
        const index = allTickets.value.findIndex((t) => t._id === ticketId);
        if (index !== -1) {
          allTickets.value[index] = data.ticket;
        }
        return { success: true, ticket: data.ticket };
      }
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Error al agregar comentario";
      console.error("Error adding comment:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };
  const updateTicketStatus = async (ticketId, newStatus) => {
    return await updateTicket(ticketId, { status: newStatus });
  };
  const getTicketsByUser = (userId) => {
    return computed(() => allTickets.value.filter((ticket) => {
      var _a;
      return ((_a = ticket.createdBy) == null ? void 0 : _a._id) === userId;
    }));
  };
  const getAllTickets = () => {
    return computed(() => allTickets.value);
  };
  const getTicketsCountByUser = (userId) => {
    return allTickets.value.filter(
      (ticket) => {
        var _a;
        return ((_a = ticket.createdBy) == null ? void 0 : _a._id) === userId && ticket.status !== "closed";
      }
    ).length;
  };
  return {
    allTickets: readonly(allTickets),
    loading: readonly(loading),
    error: readonly(error),
    fetchTickets,
    createTicket,
    getTicketById,
    updateTicket,
    updateTicketStatus,
    addComment,
    getTicketsByUser,
    getAllTickets,
    getTicketsCountByUser
  };
};

export { useTickets as u };
//# sourceMappingURL=useTickets-CzN7erzq.mjs.map
