import { u as useSidebar, _ as _sfc_main$1 } from './Sidebar-Da-3DNMX.mjs';
import { _ as _export_sfc, c as __nuxt_component_1$3 } from './server.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BCYmaoGs.mjs';
import { u as useTickets } from './useTickets-CzN7erzq.mjs';
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
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { allTickets } = useTickets();
    const { sidebarVisible } = useSidebar();
    const dateFilter = ref("newest");
    const priorityFilter = ref("all");
    const statusFilter = ref("all");
    const showTicketDetailModal = ref(false);
    const selectedTicket = ref(null);
    const filteredTickets = computed(() => {
      let tickets = [...allTickets.value];
      if (priorityFilter.value !== "all") {
        tickets = tickets.filter((ticket) => ticket.priority === priorityFilter.value);
      }
      if (statusFilter.value !== "all") {
        tickets = tickets.filter((ticket) => ticket.status === statusFilter.value);
      }
      tickets.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (dateFilter.value === "newest") {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
      return tickets;
    });
    const getStatusClass = (status) => {
      const classes = {
        "open": "bg-green-100 text-green-800",
        "in_progress": "bg-blue-100 text-blue-800",
        "closed": "bg-gray-100 text-gray-800",
        "resolved": "bg-purple-100 text-purple-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getPriorityClass = (priority) => {
      const classes = {
        "low": "text-green-600",
        "medium": "text-yellow-600",
        "high": "text-red-600",
        "urgent": "text-red-800"
      };
      return classes[priority] || "text-gray-600";
    };
    const getPriorityIconClass = (priority) => {
      const classes = {
        "low": "text-green-600",
        "medium": "text-yellow-600",
        "high": "text-red-600",
        "urgent": "text-red-800"
      };
      return classes[priority] || "text-gray-600";
    };
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(new Date(date));
    };
    const getSelectStatusClass = (status) => {
      const classes = {
        "open": "bg-green-100 text-green-800",
        "in_progress": "bg-blue-100 text-blue-800",
        "closed": "bg-gray-100 text-gray-800",
        "resolved": "bg-purple-100 text-purple-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_Sidebar = _sfc_main$1;
      const _component_UIcon = __nuxt_component_1$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-301a3d04>`);
      _push(ssrRenderComponent(_component_Sidebar, { currentPage: "admin" }, null, _parent));
      _push(`<div class="${ssrRenderClass([unref(sidebarVisible) ? "ml-64" : "ml-16", "min-h-screen flex flex-col bg-gray-50 transition-all duration-300"])}" data-v-301a3d04><header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4" data-v-301a3d04><div class="flex items-center justify-between" data-v-301a3d04><div class="flex items-center space-x-4" data-v-301a3d04><h2 class="text-2xl font-semibold text-gray-900" data-v-301a3d04>Panel de Administraci\xF3n</h2></div><div class="flex items-center space-x-4" data-v-301a3d04><span class="text-gray-700" data-v-301a3d04>Bienvenido, ${ssrInterpolate(unref(user).name)}</span></div></div></header><main class="flex-1 p-6 bg-gray-50" data-v-301a3d04><div class="mb-6" data-v-301a3d04><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-301a3d04>Todos los Tickets</h3><div class="bg-white rounded-lg shadow p-4 mb-6" data-v-301a3d04><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-301a3d04><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Ordenar por Fecha</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white text-gray-700" style="${ssrRenderStyle({ "focus": "ring-color: #7db88a" })}" data-v-301a3d04><option value="newest" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(dateFilter)) ? ssrLooseContain(unref(dateFilter), "newest") : ssrLooseEqual(unref(dateFilter), "newest")) ? " selected" : ""}>M\xE1s recientes primero</option><option value="oldest" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(dateFilter)) ? ssrLooseContain(unref(dateFilter), "oldest") : ssrLooseEqual(unref(dateFilter), "oldest")) ? " selected" : ""}>M\xE1s antiguos primero</option></select></div><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Filtrar por Prioridad</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white text-gray-700" style="${ssrRenderStyle({ "focus": "ring-color: #7db88a" })}" data-v-301a3d04><option value="all" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "all") : ssrLooseEqual(unref(priorityFilter), "all")) ? " selected" : ""}>Todas las prioridades</option><option value="urgent" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "urgent") : ssrLooseEqual(unref(priorityFilter), "urgent")) ? " selected" : ""}>Urgente</option><option value="high" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "high") : ssrLooseEqual(unref(priorityFilter), "high")) ? " selected" : ""}>Alta</option><option value="medium" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "medium") : ssrLooseEqual(unref(priorityFilter), "medium")) ? " selected" : ""}>Media</option><option value="low" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "low") : ssrLooseEqual(unref(priorityFilter), "low")) ? " selected" : ""}>Baja</option></select></div><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Filtrar por Estado</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white text-gray-700" style="${ssrRenderStyle({ "focus": "ring-color: #7db88a" })}" data-v-301a3d04><option value="all" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "all") : ssrLooseEqual(unref(statusFilter), "all")) ? " selected" : ""}>Todos los estados</option><option value="open" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "open") : ssrLooseEqual(unref(statusFilter), "open")) ? " selected" : ""}>Abierto</option><option value="in_progress" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "in_progress") : ssrLooseEqual(unref(statusFilter), "in_progress")) ? " selected" : ""}>En Progreso</option><option value="resolved" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "resolved") : ssrLooseEqual(unref(statusFilter), "resolved")) ? " selected" : ""}>Resuelto</option><option value="closed" data-v-301a3d04${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "closed") : ssrLooseEqual(unref(statusFilter), "closed")) ? " selected" : ""}>Cerrado</option></select></div></div><div class="mt-4 pt-4 border-t border-gray-200" data-v-301a3d04><p class="text-sm text-gray-600" data-v-301a3d04> Mostrando <span class="font-semibold" data-v-301a3d04>${ssrInterpolate(unref(filteredTickets).length)}</span> de <span class="font-semibold" data-v-301a3d04>${ssrInterpolate(unref(allTickets).length)}</span> tickets </p></div></div></div>`);
      if (unref(filteredTickets).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-301a3d04><!--[-->`);
        ssrRenderList(unref(filteredTickets), (ticket) => {
          var _a2, _b2, _c2, _d2, _e2;
          _push(`<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden cursor-pointer hover:scale-[1.02]" data-v-301a3d04><div class="p-4 border-b border-gray-100" style="${ssrRenderStyle({ "background-color": "#f9fafb" })}" data-v-301a3d04><div class="flex items-center justify-between mb-2" data-v-301a3d04><span class="text-xs font-semibold text-gray-500" data-v-301a3d04> #${ssrInterpolate((_a2 = ticket._id) == null ? void 0 : _a2.slice(-6))}</span><span class="${ssrRenderClass([getStatusClass(ticket.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-301a3d04>${ssrInterpolate(ticket.status)}</span></div><h4 class="text-base font-semibold text-gray-900 line-clamp-2" data-v-301a3d04>${ssrInterpolate(ticket.title)}</h4></div><div class="p-4 space-y-3" data-v-301a3d04><div data-v-301a3d04><p class="text-sm text-gray-600 line-clamp-3" data-v-301a3d04>${ssrInterpolate(ticket.description || "Sin descripci\xF3n")}</p></div><div class="flex items-center justify-between pt-2 border-t border-gray-100" data-v-301a3d04><div class="flex items-center space-x-2" data-v-301a3d04>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-exclamation-triangle",
            class: ["w-4 h-4", getPriorityIconClass(ticket.priority)]
          }, null, _parent));
          _push(`<span class="${ssrRenderClass([getPriorityClass(ticket.priority), "text-xs font-medium uppercase"])}" data-v-301a3d04>${ssrInterpolate(ticket.priority)}</span></div><div class="flex items-center space-x-1 text-xs text-gray-500" data-v-301a3d04>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-calendar",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`<span data-v-301a3d04>${ssrInterpolate(formatDate(ticket.createdAt))}</span></div></div></div><div class="px-4 py-3 border-t border-gray-100 bg-gray-50" data-v-301a3d04><div class="flex items-center space-x-2" data-v-301a3d04><div class="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0" data-v-301a3d04>`);
          if ((_b2 = ticket.createdBy) == null ? void 0 : _b2.profilePhoto) {
            _push(`<img${ssrRenderAttr("src", ticket.createdBy.profilePhoto)}${ssrRenderAttr("alt", ticket.createdBy.name)} class="w-full h-full object-cover" data-v-301a3d04>`);
          } else {
            _push(`<span class="text-xs font-medium text-gray-700 uppercase" data-v-301a3d04>${ssrInterpolate((_d2 = (_c2 = ticket.createdBy) == null ? void 0 : _c2.name) == null ? void 0 : _d2.charAt(0))}</span>`);
          }
          _push(`</div><div class="flex-1 min-w-0" data-v-301a3d04><p class="text-xs text-gray-600 truncate" data-v-301a3d04>${ssrInterpolate((_e2 = ticket.createdBy) == null ? void 0 : _e2.email)}</p></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow p-12 text-center" data-v-301a3d04>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-inbox",
          class: "w-16 h-16 mx-auto text-gray-300 mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900 mb-2" data-v-301a3d04>No hay tickets que coincidan con los filtros</h3><p class="text-sm text-gray-500" data-v-301a3d04>Intenta ajustar los filtros para ver m\xE1s resultados</p></div>`);
      }
      _push(`</main></div>`);
      if (unref(showTicketDetailModal) && unref(selectedTicket)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-301a3d04><div class="bg-white rounded-lg w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto" data-v-301a3d04><div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between" data-v-301a3d04><div data-v-301a3d04><h3 class="text-xl font-semibold text-gray-900" data-v-301a3d04>Detalles del Ticket</h3><p class="text-sm text-gray-500" data-v-301a3d04>ID: #${ssrInterpolate((_a = unref(selectedTicket)._id) == null ? void 0 : _a.slice(-6))}</p></div><button class="text-gray-400 hover:text-gray-600 transition-colors" data-v-301a3d04>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><div class="p-6 space-y-6" data-v-301a3d04><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>T\xEDtulo</label><h4 class="text-lg font-semibold text-gray-900" data-v-301a3d04>${ssrInterpolate(unref(selectedTicket).title)}</h4></div><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Estado</label><select${ssrRenderAttr("value", unref(selectedTicket).status)} class="${ssrRenderClass([getSelectStatusClass(unref(selectedTicket).status), "w-full px-4 py-2 text-sm font-semibold rounded-lg border-2 focus:ring-2 cursor-pointer transition-colors"])}" style="${ssrRenderStyle({ "focus": "ring-color: #7db88a" })}" data-v-301a3d04><option value="open" data-v-301a3d04>Abierto</option><option value="in_progress" data-v-301a3d04>En Progreso</option><option value="resolved" data-v-301a3d04>Resuelto</option><option value="closed" data-v-301a3d04>Cerrado</option></select></div><div class="grid grid-cols-2 gap-4" data-v-301a3d04><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Prioridad</label><div class="flex items-center space-x-2" data-v-301a3d04>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: ["w-5 h-5", getPriorityIconClass(unref(selectedTicket).priority)]
        }, null, _parent));
        _push(`<span class="${ssrRenderClass([getPriorityClass(unref(selectedTicket).priority), "text-base font-medium uppercase"])}" data-v-301a3d04>${ssrInterpolate(unref(selectedTicket).priority)}</span></div></div><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Fecha de Creaci\xF3n</label><div class="flex items-center space-x-2 text-gray-600" data-v-301a3d04>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-calendar",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span class="text-base" data-v-301a3d04>${ssrInterpolate(formatDate(unref(selectedTicket).createdAt))}</span></div></div></div><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Descripci\xF3n</label><div class="bg-gray-50 rounded-lg p-4 border border-gray-200" data-v-301a3d04><p class="text-gray-700 whitespace-pre-wrap" data-v-301a3d04>${ssrInterpolate(unref(selectedTicket).description || "Sin descripci\xF3n")}</p></div></div><div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Creado por</label><div class="bg-gray-50 rounded-lg p-4 border border-gray-200" data-v-301a3d04><div class="flex items-center space-x-4" data-v-301a3d04><div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0" data-v-301a3d04>`);
        if ((_b = unref(selectedTicket).createdBy) == null ? void 0 : _b.profilePhoto) {
          _push(`<img${ssrRenderAttr("src", unref(selectedTicket).createdBy.profilePhoto)}${ssrRenderAttr("alt", unref(selectedTicket).createdBy.name)} class="w-full h-full object-cover" data-v-301a3d04>`);
        } else {
          _push(`<span class="text-lg font-medium text-gray-700 uppercase" data-v-301a3d04>${ssrInterpolate((_d = (_c = unref(selectedTicket).createdBy) == null ? void 0 : _c.name) == null ? void 0 : _d.charAt(0))}</span>`);
        }
        _push(`</div><div class="flex-1" data-v-301a3d04><p class="text-base font-semibold text-gray-900" data-v-301a3d04>${ssrInterpolate((_e = unref(selectedTicket).createdBy) == null ? void 0 : _e.name)}</p><p class="text-sm text-gray-600" data-v-301a3d04>${ssrInterpolate((_f = unref(selectedTicket).createdBy) == null ? void 0 : _f.email)}</p><p class="text-xs text-gray-500" data-v-301a3d04>${ssrInterpolate(((_g = unref(selectedTicket).createdBy) == null ? void 0 : _g.department) || "Sin departamento")}</p></div></div></div></div>`);
        if (unref(selectedTicket).category) {
          _push(`<div data-v-301a3d04><label class="block text-sm font-medium text-gray-700 mb-2" data-v-301a3d04>Categor\xEDa</label><span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full" data-v-301a3d04>${ssrInterpolate(unref(selectedTicket).category)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end" data-v-301a3d04><button class="px-6 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-301a3d04> Cerrar </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-301a3d04"]]);

export { admin as default };
//# sourceMappingURL=admin-Bb14amKD.mjs.map
