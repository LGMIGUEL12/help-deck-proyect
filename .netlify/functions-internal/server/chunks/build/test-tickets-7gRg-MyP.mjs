import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BCYmaoGs.mjs';
import { u as useTickets } from './useTickets-CzN7erzq.mjs';
import './server.mjs';
import '../_/nitro.mjs';
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
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "test-tickets",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { allTickets, loading, error } = useTickets();
    const newTicket = ref({
      title: "",
      description: "",
      priority: "medium",
      category: "General"
    });
    const filters = ref({
      status: "",
      priority: "",
      category: ""
    });
    const commentModal = ref({
      show: false,
      ticketId: null,
      message: ""
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-8" }, _attrs))}><div class="max-w-6xl mx-auto"><h1 class="text-3xl font-bold mb-8">Sistema de Tickets - MongoDB</h1>`);
      if (unref(user)) {
        _push(`<div class="bg-white rounded-lg shadow p-6 mb-6"><h2 class="text-xl font-semibold mb-2">Usuario Actual</h2><p><strong>Nombre:</strong> ${ssrInterpolate(unref(user).name)}</p><p><strong>Email:</strong> ${ssrInterpolate(unref(user).email)}</p><p><strong>Rol:</strong> ${ssrInterpolate(unref(user).role)}</p><p><strong>ID:</strong> ${ssrInterpolate(unref(user)._id)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow p-6 mb-6"><h2 class="text-xl font-semibold mb-4">Crear Nuevo Ticket</h2><form class="space-y-4"><div><label class="block text-sm font-medium mb-1">T\xEDtulo</label><input${ssrRenderAttr("value", unref(newTicket).title)} type="text" class="w-full border rounded px-3 py-2" required></div><div><label class="block text-sm font-medium mb-1">Descripci\xF3n</label><textarea class="w-full border rounded px-3 py-2" rows="3" required>${ssrInterpolate(unref(newTicket).description)}</textarea></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium mb-1">Prioridad</label><select class="w-full border rounded px-3 py-2"><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "low") : ssrLooseEqual(unref(newTicket).priority, "low")) ? " selected" : ""}>Baja</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "medium") : ssrLooseEqual(unref(newTicket).priority, "medium")) ? " selected" : ""}>Media</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "high") : ssrLooseEqual(unref(newTicket).priority, "high")) ? " selected" : ""}>Alta</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "urgent") : ssrLooseEqual(unref(newTicket).priority, "urgent")) ? " selected" : ""}>Urgente</option></select></div><div><label class="block text-sm font-medium mb-1">Categor\xEDa</label><input${ssrRenderAttr("value", unref(newTicket).category)} type="text" class="w-full border rounded px-3 py-2"></div></div><button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Creando..." : "Crear Ticket")}</button></form></div><div class="bg-white rounded-lg shadow p-6 mb-6"><h2 class="text-xl font-semibold mb-4">Filtros</h2><div class="grid grid-cols-3 gap-4"><div><label class="block text-sm font-medium mb-1">Estado</label><select class="w-full border rounded px-3 py-2"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "") : ssrLooseEqual(unref(filters).status, "")) ? " selected" : ""}>Todos</option><option value="open"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "open") : ssrLooseEqual(unref(filters).status, "open")) ? " selected" : ""}>Abierto</option><option value="in_progress"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "in_progress") : ssrLooseEqual(unref(filters).status, "in_progress")) ? " selected" : ""}>En Progreso</option><option value="resolved"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "resolved") : ssrLooseEqual(unref(filters).status, "resolved")) ? " selected" : ""}>Resuelto</option><option value="closed"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "closed") : ssrLooseEqual(unref(filters).status, "closed")) ? " selected" : ""}>Cerrado</option></select></div><div><label class="block text-sm font-medium mb-1">Prioridad</label><select class="w-full border rounded px-3 py-2"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "") : ssrLooseEqual(unref(filters).priority, "")) ? " selected" : ""}>Todas</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "low") : ssrLooseEqual(unref(filters).priority, "low")) ? " selected" : ""}>Baja</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "medium") : ssrLooseEqual(unref(filters).priority, "medium")) ? " selected" : ""}>Media</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "high") : ssrLooseEqual(unref(filters).priority, "high")) ? " selected" : ""}>Alta</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "urgent") : ssrLooseEqual(unref(filters).priority, "urgent")) ? " selected" : ""}>Urgente</option></select></div><div><label class="block text-sm font-medium mb-1">Categor\xEDa</label><input${ssrRenderAttr("value", unref(filters).category)} type="text" class="w-full border rounded px-3 py-2" placeholder="Filtrar por categor\xEDa"></div></div></div>`);
      if (unref(error)) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow p-6"><h2 class="text-xl font-semibold mb-4"> Mis Tickets (${ssrInterpolate(unref(allTickets).length)}) `);
      if (unref(loading)) {
        _push(`<span class="text-sm text-gray-500">Cargando...</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h2>`);
      if (unref(allTickets).length === 0) {
        _push(`<div class="text-center py-8 text-gray-500"> No hay tickets disponibles </div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(allTickets), (ticket) => {
          var _a;
          _push(`<div class="border rounded-lg p-4 hover:shadow-md transition"><div class="flex justify-between items-start mb-2"><h3 class="text-lg font-semibold">${ssrInterpolate(ticket.title)}</h3><span class="${ssrRenderClass([{
            "bg-green-100 text-green-800": ticket.status === "open",
            "bg-yellow-100 text-yellow-800": ticket.status === "in_progress",
            "bg-blue-100 text-blue-800": ticket.status === "resolved",
            "bg-gray-100 text-gray-800": ticket.status === "closed"
          }, "px-2 py-1 rounded text-xs"])}">${ssrInterpolate(ticket.status)}</span></div><p class="text-gray-600 text-sm mb-3">${ssrInterpolate(ticket.description)}</p><div class="flex gap-4 text-xs text-gray-500 mb-3"><span>Prioridad: <strong>${ssrInterpolate(ticket.priority)}</strong></span><span>Categor\xEDa: <strong>${ssrInterpolate(ticket.category)}</strong></span><span>Creado: ${ssrInterpolate(formatDate(ticket.createdAt))}</span></div>`);
          if (ticket.createdBy) {
            _push(`<div class="text-xs text-gray-500 mb-3"> Creado por: ${ssrInterpolate(ticket.createdBy.name)} (${ssrInterpolate(ticket.createdBy.email)}) </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex gap-2">`);
          if (ticket.status === "open") {
            _push(`<button class="text-xs bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"> Iniciar </button>`);
          } else {
            _push(`<!---->`);
          }
          if (ticket.status === "in_progress") {
            _push(`<button class="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"> Resolver </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"> Comentar (${ssrInterpolate(((_a = ticket.comments) == null ? void 0 : _a.length) || 0)}) </button></div>`);
          if (ticket.comments && ticket.comments.length > 0) {
            _push(`<div class="mt-4 pt-4 border-t"><h4 class="text-sm font-semibold mb-2">Comentarios:</h4><!--[-->`);
            ssrRenderList(ticket.comments, (comment) => {
              var _a2;
              _push(`<div class="text-xs bg-gray-50 p-2 rounded mb-2"><div class="font-semibold">${ssrInterpolate(((_a2 = comment.user) == null ? void 0 : _a2.name) || "Usuario")}</div><div class="text-gray-600">${ssrInterpolate(comment.message)}</div><div class="text-gray-400 text-xs mt-1">${ssrInterpolate(formatDate(comment.createdAt))}</div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      if (unref(commentModal).show) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"><div class="bg-white rounded-lg p-6 max-w-md w-full"><h3 class="text-lg font-semibold mb-4">Agregar Comentario</h3><textarea class="w-full border rounded px-3 py-2 mb-4" rows="4" placeholder="Escribe tu comentario...">${ssrInterpolate(unref(commentModal).message)}</textarea><div class="flex gap-2"><button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Enviando..." : "Enviar")}</button><button class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"> Cancelar </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-tickets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=test-tickets-7gRg-MyP.mjs.map
