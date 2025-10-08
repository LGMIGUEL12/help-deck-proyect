import { u as useSidebar, _ as _sfc_main$1 } from './Sidebar-Da-3DNMX.mjs';
import { _ as _export_sfc, c as __nuxt_component_1$3 } from './server.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "tickets",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { allTickets } = useTickets();
    const { sidebarVisible } = useSidebar();
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const showTimeExpiredModal = ref(false);
    const selectedTicket = ref(null);
    const newTicket = ref({
      subject: "",
      priority: "medium",
      description: ""
    });
    const editTicketData = ref({
      subject: "",
      priority: "medium",
      description: "",
      status: "open"
    });
    const userTickets = computed(() => {
      return allTickets.value.filter(
        (ticket) => {
          var _a, _b;
          return ((_a = ticket.createdBy) == null ? void 0 : _a._id) === ((_b = user.value) == null ? void 0 : _b._id) && ticket.status !== "closed";
        }
      );
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
    const canEditTicket = (ticket) => {
      if (!ticket || !ticket.createdAt) return false;
      const createdAt = new Date(ticket.createdAt);
      const now = /* @__PURE__ */ new Date();
      const diffInMinutes = (now - createdAt) / (1e3 * 60);
      return diffInMinutes <= 5;
    };
    const getTimeRemaining = (ticket) => {
      if (!ticket || !ticket.createdAt) return 0;
      const createdAt = new Date(ticket.createdAt);
      const now = /* @__PURE__ */ new Date();
      const diffInMinutes = (now - createdAt) / (1e3 * 60);
      const remaining = Math.max(0, 5 - diffInMinutes);
      return Math.ceil(remaining);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Sidebar = _sfc_main$1;
      const _component_UIcon = __nuxt_component_1$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-10756089>`);
      _push(ssrRenderComponent(_component_Sidebar, { currentPage: "tickets" }, null, _parent));
      _push(`<div class="${ssrRenderClass([unref(sidebarVisible) ? "ml-64" : "ml-16", "min-h-screen flex flex-col bg-gray-50 transition-all duration-300"])}" data-v-10756089><header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4" data-v-10756089><div class="flex items-center justify-between" data-v-10756089><div class="flex items-center space-x-4" data-v-10756089><h2 class="text-2xl font-semibold text-gray-900" data-v-10756089>Mis Tickets</h2></div><div class="flex items-center space-x-4" data-v-10756089><button class="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-10756089>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-10756089>Crear Nuevo Ticket</span></button></div></div></header><main class="flex-1 p-6 bg-gray-50" data-v-10756089><div class="mb-6" data-v-10756089><h3 class="text-lg font-medium text-gray-900" data-v-10756089>Mis Tickets</h3><p class="text-sm text-gray-500" data-v-10756089> Tienes ${ssrInterpolate(unref(userTickets).length)} ticket(s) activo(s) </p></div>`);
      if (unref(userTickets).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-10756089><!--[-->`);
        ssrRenderList(unref(userTickets), (ticket) => {
          var _a2;
          _push(`<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden" data-v-10756089><div class="p-4 border-b border-gray-100" style="${ssrRenderStyle({ "background-color": "#f9fafb" })}" data-v-10756089><div class="flex items-center justify-between mb-2" data-v-10756089><span class="text-xs font-semibold text-gray-500" data-v-10756089> #${ssrInterpolate((_a2 = ticket._id) == null ? void 0 : _a2.slice(-6))}</span><span class="${ssrRenderClass([getStatusClass(ticket.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-10756089>${ssrInterpolate(ticket.status)}</span></div><h4 class="text-base font-semibold text-gray-900 line-clamp-2" data-v-10756089>${ssrInterpolate(ticket.title)}</h4></div><div class="p-4 space-y-3" data-v-10756089><div data-v-10756089><p class="text-sm text-gray-600 line-clamp-3" data-v-10756089>${ssrInterpolate(ticket.description || "Sin descripci\xF3n")}</p></div><div class="flex items-center justify-between pt-2 border-t border-gray-100" data-v-10756089><div class="flex items-center space-x-2" data-v-10756089>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-exclamation-triangle",
            class: ["w-4 h-4", getPriorityIconClass(ticket.priority)]
          }, null, _parent));
          _push(`<span class="${ssrRenderClass([getPriorityClass(ticket.priority), "text-xs font-medium uppercase"])}" data-v-10756089>${ssrInterpolate(ticket.priority)}</span></div><div class="flex items-center space-x-1 text-xs text-gray-500" data-v-10756089>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-calendar",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`<span data-v-10756089>${ssrInterpolate(formatDate(ticket.createdAt))}</span></div></div></div><div class="px-4 py-3 border-t border-gray-100" style="${ssrRenderStyle({ "background-color": "#f9fafb" })}" data-v-10756089>`);
          if (ticket.status === "open" && canEditTicket(ticket)) {
            _push(`<button class="w-full text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-10756089>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-pencil",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`<span class="text-sm font-medium" data-v-10756089>Editar (${ssrInterpolate(getTimeRemaining(ticket))} min)</span></button>`);
          } else if (ticket.status === "open" && !canEditTicket(ticket)) {
            _push(`<button class="w-full text-gray-500 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors" data-v-10756089>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-lock-closed",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`<span class="text-sm font-medium" data-v-10756089>Tiempo de edici\xF3n expirado</span></button>`);
          } else {
            _push(`<div class="text-center text-sm text-gray-400 py-2" data-v-10756089> Ticket ${ssrInterpolate(ticket.status.toLowerCase())}</div>`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow p-12 text-center" data-v-10756089>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-inbox",
          class: "w-16 h-16 mx-auto text-gray-300 mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900 mb-2" data-v-10756089>No tienes tickets activos</h3><p class="text-sm text-gray-500 mb-6" data-v-10756089>Crea un nuevo ticket para empezar</p><button class="text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center space-x-2" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-10756089>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-plus",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span data-v-10756089>Crear Ticket</span></button></div>`);
      }
      _push(`</main></div>`);
      if (unref(showCreateModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-10756089><div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto" data-v-10756089><div class="flex justify-between items-center mb-4" data-v-10756089><h3 class="text-lg font-medium text-gray-900" data-v-10756089>Create New Ticket</h3><button class="text-gray-400 hover:text-gray-600" data-v-10756089>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><form class="space-y-4" data-v-10756089><div data-v-10756089><label class="block text-sm font-medium text-gray-700 mb-1" data-v-10756089>Subject</label><input${ssrRenderAttr("value", unref(newTicket).subject)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Enter ticket subject" data-v-10756089></div><div data-v-10756089><label class="block text-sm font-medium text-gray-700 mb-1" data-v-10756089>Priority</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" data-v-10756089><option value="low" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "low") : ssrLooseEqual(unref(newTicket).priority, "low")) ? " selected" : ""}>Low</option><option value="medium" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "medium") : ssrLooseEqual(unref(newTicket).priority, "medium")) ? " selected" : ""}>Medium</option><option value="high" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "high") : ssrLooseEqual(unref(newTicket).priority, "high")) ? " selected" : ""}>High</option><option value="urgent" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(newTicket).priority) ? ssrLooseContain(unref(newTicket).priority, "urgent") : ssrLooseEqual(unref(newTicket).priority, "urgent")) ? " selected" : ""}>Urgent</option></select></div><div data-v-10756089><label class="block text-sm font-medium text-gray-700 mb-1" data-v-10756089>Description</label><textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Describe the issue..." data-v-10756089>${ssrInterpolate(unref(newTicket).description)}</textarea></div><div class="flex justify-end space-x-3 pt-4" data-v-10756089><button type="button" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50" data-v-10756089> Cancel </button><button type="submit" class="px-4 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-10756089> Create Ticket </button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showEditModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-10756089><div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto" data-v-10756089><div class="flex justify-between items-center mb-4" data-v-10756089><h3 class="text-lg font-medium text-gray-900" data-v-10756089>Edit Ticket #${ssrInterpolate((_a = unref(selectedTicket)) == null ? void 0 : _a.id)}</h3><button class="text-gray-400 hover:text-gray-600" data-v-10756089>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><form class="space-y-4" data-v-10756089><div data-v-10756089><label class="block text-sm font-medium text-gray-700 mb-1" data-v-10756089>Subject</label><input${ssrRenderAttr("value", unref(editTicketData).subject)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Enter ticket subject" data-v-10756089></div>`);
        if (((_b = unref(user)) == null ? void 0 : _b.role) === "admin") {
          _push(`<div data-v-10756089><label class="block text-sm font-medium text-gray-700 mb-1" data-v-10756089>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" data-v-10756089><option value="open" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).status) ? ssrLooseContain(unref(editTicketData).status, "open") : ssrLooseEqual(unref(editTicketData).status, "open")) ? " selected" : ""}>Open</option><option value="in_progress" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).status) ? ssrLooseContain(unref(editTicketData).status, "in_progress") : ssrLooseEqual(unref(editTicketData).status, "in_progress")) ? " selected" : ""}>In Progress</option><option value="resolved" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).status) ? ssrLooseContain(unref(editTicketData).status, "resolved") : ssrLooseEqual(unref(editTicketData).status, "resolved")) ? " selected" : ""}>Resolved</option><option value="closed" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).status) ? ssrLooseContain(unref(editTicketData).status, "closed") : ssrLooseEqual(unref(editTicketData).status, "closed")) ? " selected" : ""}>Closed</option></select></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-10756089><label class="block text-sm font-medium text-gray-700 mb-1" data-v-10756089>Priority</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" data-v-10756089><option value="low" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).priority) ? ssrLooseContain(unref(editTicketData).priority, "low") : ssrLooseEqual(unref(editTicketData).priority, "low")) ? " selected" : ""}>Low</option><option value="medium" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).priority) ? ssrLooseContain(unref(editTicketData).priority, "medium") : ssrLooseEqual(unref(editTicketData).priority, "medium")) ? " selected" : ""}>Medium</option><option value="high" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).priority) ? ssrLooseContain(unref(editTicketData).priority, "high") : ssrLooseEqual(unref(editTicketData).priority, "high")) ? " selected" : ""}>High</option><option value="urgent" data-v-10756089${ssrIncludeBooleanAttr(Array.isArray(unref(editTicketData).priority) ? ssrLooseContain(unref(editTicketData).priority, "urgent") : ssrLooseEqual(unref(editTicketData).priority, "urgent")) ? " selected" : ""}>Urgent</option></select></div><div data-v-10756089><label class="block text-sm font-medium text-gray-700 mb-1" data-v-10756089>Description</label><textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Describe the issue..." data-v-10756089>${ssrInterpolate(unref(editTicketData).description)}</textarea></div><div class="flex justify-end space-x-3 pt-4" data-v-10756089><button type="button" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50" data-v-10756089> Cancel </button><button type="submit" class="px-4 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-10756089> Update Ticket </button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showTimeExpiredModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-10756089><div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl" data-v-10756089><div class="flex flex-col items-center text-center" data-v-10756089><div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4" data-v-10756089>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-clock",
          class: "w-8 h-8 text-red-600"
        }, null, _parent));
        _push(`</div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-10756089>Tiempo de Edici\xF3n Expirado</h3><p class="text-gray-600 mb-6" data-v-10756089> El tiempo para editar este ticket ha terminado. Solo puedes editar tickets dentro de los primeros 5 minutos despu\xE9s de su creaci\xF3n. </p><button class="px-6 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-10756089> Entendido </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tickets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tickets = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-10756089"]]);

export { tickets as default };
//# sourceMappingURL=tickets-CSo8zWr0.mjs.map
