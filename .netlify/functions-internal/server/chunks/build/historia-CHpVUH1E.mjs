import { u as useSidebar, _ as _sfc_main$1 } from './Sidebar-Da-3DNMX.mjs';
import { _ as _export_sfc, c as __nuxt_component_1$3 } from './server.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "historia",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { allTickets } = useTickets();
    const { sidebarVisible } = useSidebar();
    const selectedPeriod = ref("all");
    const selectedUser = ref("all");
    const selectedPriority = ref("all");
    const selectedStatus = ref("all");
    const showViewModal = ref(false);
    const selectedTicket = ref(null);
    const closedTickets = computed(() => {
      var _a;
      const closed = allTickets.value.filter(
        (ticket) => ticket.status === "closed" || ticket.status === "resolved"
      );
      if (((_a = user.value) == null ? void 0 : _a.role) === "admin") {
        return closed;
      } else {
        return closed.filter((ticket) => {
          var _a2, _b;
          return ((_a2 = ticket.createdBy) == null ? void 0 : _a2._id) === ((_b = user.value) == null ? void 0 : _b._id);
        });
      }
    });
    const uniqueUsers = computed(() => {
      const users = /* @__PURE__ */ new Map();
      allTickets.value.forEach((ticket) => {
        if (ticket.createdBy && !users.has(ticket.createdBy._id)) {
          users.set(ticket.createdBy._id, {
            id: ticket.createdBy._id,
            name: ticket.createdBy.name
          });
        }
      });
      return Array.from(users.values());
    });
    const filteredTickets = computed(() => {
      var _a;
      let filtered = [...closedTickets.value];
      if (((_a = user.value) == null ? void 0 : _a.role) === "admin" && selectedUser.value !== "all") {
        filtered = filtered.filter((ticket) => {
          var _a2;
          return ((_a2 = ticket.createdBy) == null ? void 0 : _a2._id) === selectedUser.value;
        });
      }
      if (selectedPriority.value !== "all") {
        filtered = filtered.filter((ticket) => ticket.priority === selectedPriority.value);
      }
      if (selectedStatus.value !== "all") {
        filtered = filtered.filter((ticket) => ticket.status === selectedStatus.value);
      }
      const now = /* @__PURE__ */ new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      switch (selectedPeriod.value) {
        case "thisMonth":
          filtered = filtered.filter((ticket) => {
            const closedDate = new Date(ticket.closedAt || ticket.resolvedAt || ticket.updatedAt);
            return closedDate.getMonth() === currentMonth && closedDate.getFullYear() === currentYear;
          });
          break;
        case "lastMonth":
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          filtered = filtered.filter((ticket) => {
            const closedDate = new Date(ticket.closedAt || ticket.resolvedAt || ticket.updatedAt);
            return closedDate.getMonth() === lastMonth && closedDate.getFullYear() === lastMonthYear;
          });
          break;
        case "thisYear":
          filtered = filtered.filter((ticket) => {
            const closedDate = new Date(ticket.closedAt || ticket.resolvedAt || ticket.updatedAt);
            return closedDate.getFullYear() === currentYear;
          });
          break;
      }
      return filtered.sort((a, b) => {
        const dateA = new Date(a.closedAt || a.resolvedAt || a.updatedAt);
        const dateB = new Date(b.closedAt || b.resolvedAt || b.updatedAt);
        return dateB - dateA;
      });
    });
    const thisMonthClosed = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      return closedTickets.value.filter((ticket) => {
        const closedDate = new Date(ticket.closedAt || ticket.resolvedAt || ticket.updatedAt);
        return closedDate.getMonth() === currentMonth && closedDate.getFullYear() === currentYear;
      }).length;
    });
    const averageResolutionTime = computed(() => {
      if (closedTickets.value.length === 0) return "N/A";
      const totalDays = closedTickets.value.reduce((sum, ticket) => {
        const opened = new Date(ticket.createdAt);
        const closed = new Date(ticket.closedAt || ticket.resolvedAt || ticket.updatedAt);
        const diffTime = Math.abs(closed - opened);
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);
      const average = Math.round(totalDays / closedTickets.value.length);
      return `${average} d\xEDas`;
    });
    const getPriorityClass = (priority) => {
      const classes = {
        "low": "text-green-600",
        "medium": "text-yellow-600",
        "high": "text-red-600",
        "urgent": "text-red-800"
      };
      return classes[priority] || "text-gray-600";
    };
    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(date));
    };
    const getResolutionTime = (ticket) => {
      if (!ticket) return "N/A";
      const opened = new Date(ticket.createdAt);
      const closed = new Date(ticket.closedAt || ticket.resolvedAt || ticket.updatedAt);
      const diffTime = Math.abs(closed - opened);
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays === 0) return "Menos de 1 d\xEDa";
      if (diffDays === 1) return "1 d\xEDa";
      if (diffDays < 7) return `${diffDays} d\xEDas`;
      const weeks = Math.floor(diffDays / 7);
      const remainingDays = diffDays % 7;
      if (weeks === 1 && remainingDays === 0) return "1 semana";
      if (remainingDays === 0) return `${weeks} semanas`;
      return `${weeks}s ${remainingDays}d`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
      const _component_Sidebar = _sfc_main$1;
      const _component_UIcon = __nuxt_component_1$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-44ba0c35>`);
      _push(ssrRenderComponent(_component_Sidebar, { currentPage: "historia" }, null, _parent));
      _push(`<div class="${ssrRenderClass([unref(sidebarVisible) ? "ml-64" : "ml-16", "min-h-screen flex flex-col bg-gray-50 transition-all duration-300"])}" data-v-44ba0c35><header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4" data-v-44ba0c35><div class="flex items-center justify-between" data-v-44ba0c35><div class="flex items-center space-x-4" data-v-44ba0c35><h2 class="text-2xl font-semibold text-gray-900" data-v-44ba0c35>Historia de Tickets</h2></div><div class="flex items-center space-x-4" data-v-44ba0c35><div class="text-sm text-gray-600" data-v-44ba0c35>`);
      if (((_a = unref(user)) == null ? void 0 : _a.role) === "admin") {
        _push(`<span class="font-medium text-blue-600" data-v-44ba0c35>Vista de Administrador</span>`);
      } else {
        _push(`<span class="font-medium text-green-600" data-v-44ba0c35>Mis Tickets Resueltos</span>`);
      }
      _push(`</div></div></div></header><main class="flex-1 p-6 bg-gray-50" data-v-44ba0c35><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" data-v-44ba0c35><div class="bg-white overflow-hidden shadow rounded-lg" data-v-44ba0c35><div class="p-5" data-v-44ba0c35><div class="flex items-center" data-v-44ba0c35><div class="flex-shrink-0" data-v-44ba0c35>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-archive-box",
        class: "h-6 w-6 text-gray-400"
      }, null, _parent));
      _push(`</div><div class="ml-5 w-0 flex-1" data-v-44ba0c35><dl data-v-44ba0c35><dt class="text-sm font-medium text-gray-500 truncate" data-v-44ba0c35>${ssrInterpolate(((_b = unref(user)) == null ? void 0 : _b.role) === "admin" ? "Total Cerrados" : "Mis Tickets Cerrados")}</dt><dd class="text-lg font-medium text-gray-900" data-v-44ba0c35>${ssrInterpolate(unref(closedTickets).length)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-44ba0c35><div class="p-5" data-v-44ba0c35><div class="flex items-center" data-v-44ba0c35><div class="flex-shrink-0" data-v-44ba0c35>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-calendar",
        class: "h-6 w-6 text-gray-400"
      }, null, _parent));
      _push(`</div><div class="ml-5 w-0 flex-1" data-v-44ba0c35><dl data-v-44ba0c35><dt class="text-sm font-medium text-gray-500 truncate" data-v-44ba0c35>Este Mes</dt><dd class="text-lg font-medium text-gray-900" data-v-44ba0c35>${ssrInterpolate(unref(thisMonthClosed))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-44ba0c35><div class="p-5" data-v-44ba0c35><div class="flex items-center" data-v-44ba0c35><div class="flex-shrink-0" data-v-44ba0c35>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "h-6 w-6 text-gray-400"
      }, null, _parent));
      _push(`</div><div class="ml-5 w-0 flex-1" data-v-44ba0c35><dl data-v-44ba0c35><dt class="text-sm font-medium text-gray-500 truncate" data-v-44ba0c35>Tiempo Promedio</dt><dd class="text-lg font-medium text-gray-900" data-v-44ba0c35>${ssrInterpolate(unref(averageResolutionTime))}</dd></dl></div></div></div></div></div><div class="bg-white rounded-lg shadow overflow-hidden" data-v-44ba0c35><div class="px-6 py-4 border-b border-gray-200" data-v-44ba0c35><div class="flex items-center justify-between" data-v-44ba0c35><div data-v-44ba0c35><h3 class="text-lg font-medium text-gray-900" data-v-44ba0c35>Tickets Resueltos</h3><p class="text-sm text-gray-500" data-v-44ba0c35> Historial de tickets cerrados${ssrInterpolate(((_c = unref(user)) == null ? void 0 : _c.role) === "admin" ? " de todos los usuarios" : "")}</p></div><div class="flex flex-wrap items-center gap-3" data-v-44ba0c35><select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 text-sm" data-v-44ba0c35><option value="all" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPeriod)) ? ssrLooseContain(unref(selectedPeriod), "all") : ssrLooseEqual(unref(selectedPeriod), "all")) ? " selected" : ""}>Todos los per\xEDodos</option><option value="thisMonth" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPeriod)) ? ssrLooseContain(unref(selectedPeriod), "thisMonth") : ssrLooseEqual(unref(selectedPeriod), "thisMonth")) ? " selected" : ""}>Este mes</option><option value="lastMonth" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPeriod)) ? ssrLooseContain(unref(selectedPeriod), "lastMonth") : ssrLooseEqual(unref(selectedPeriod), "lastMonth")) ? " selected" : ""}>Mes pasado</option><option value="thisYear" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPeriod)) ? ssrLooseContain(unref(selectedPeriod), "thisYear") : ssrLooseEqual(unref(selectedPeriod), "thisYear")) ? " selected" : ""}>Este a\xF1o</option></select><select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 text-sm" data-v-44ba0c35><option value="all" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPriority)) ? ssrLooseContain(unref(selectedPriority), "all") : ssrLooseEqual(unref(selectedPriority), "all")) ? " selected" : ""}>Todas las prioridades</option><option value="urgent" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPriority)) ? ssrLooseContain(unref(selectedPriority), "urgent") : ssrLooseEqual(unref(selectedPriority), "urgent")) ? " selected" : ""}>Urgente</option><option value="high" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPriority)) ? ssrLooseContain(unref(selectedPriority), "high") : ssrLooseEqual(unref(selectedPriority), "high")) ? " selected" : ""}>Alta</option><option value="medium" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPriority)) ? ssrLooseContain(unref(selectedPriority), "medium") : ssrLooseEqual(unref(selectedPriority), "medium")) ? " selected" : ""}>Media</option><option value="low" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPriority)) ? ssrLooseContain(unref(selectedPriority), "low") : ssrLooseEqual(unref(selectedPriority), "low")) ? " selected" : ""}>Baja</option></select><select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 text-sm" data-v-44ba0c35><option value="all" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "all") : ssrLooseEqual(unref(selectedStatus), "all")) ? " selected" : ""}>Todos los estados</option><option value="resolved" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "resolved") : ssrLooseEqual(unref(selectedStatus), "resolved")) ? " selected" : ""}>Resuelto</option><option value="closed" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "closed") : ssrLooseEqual(unref(selectedStatus), "closed")) ? " selected" : ""}>Cerrado</option></select>`);
      if (((_d = unref(user)) == null ? void 0 : _d.role) === "admin") {
        _push(`<select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 text-sm" data-v-44ba0c35><option value="all" data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedUser)) ? ssrLooseContain(unref(selectedUser), "all") : ssrLooseEqual(unref(selectedUser), "all")) ? " selected" : ""}>Todos los usuarios</option><!--[-->`);
        ssrRenderList(unref(uniqueUsers), (userOption) => {
          _push(`<option${ssrRenderAttr("value", userOption.id)} data-v-44ba0c35${ssrIncludeBooleanAttr(Array.isArray(unref(selectedUser)) ? ssrLooseContain(unref(selectedUser), userOption.id) : ssrLooseEqual(unref(selectedUser), userOption.id)) ? " selected" : ""}>${ssrInterpolate(userOption.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="overflow-x-auto" data-v-44ba0c35><table class="min-w-full divide-y divide-gray-200" data-v-44ba0c35><thead class="bg-gray-50" data-v-44ba0c35><tr data-v-44ba0c35><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-44ba0c35> ID </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-44ba0c35> Subject </th>`);
      if (((_e = unref(user)) == null ? void 0 : _e.role) === "admin") {
        _push(`<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-44ba0c35> Usuario </th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-44ba0c35> Priority </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-44ba0c35> Fecha Abierto </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-44ba0c35> Fecha Cerrado </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-44ba0c35> Tiempo Resoluci\xF3n </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-44ba0c35><!--[-->`);
      ssrRenderList(unref(filteredTickets), (ticket) => {
        var _a2, _b2, _c2, _d2, _e2, _f2;
        _push(`<tr class="hover:bg-gray-50 cursor-pointer" data-v-44ba0c35><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-44ba0c35> #${ssrInterpolate((_a2 = ticket._id) == null ? void 0 : _a2.slice(-6))}</td><td class="px-6 py-4" data-v-44ba0c35><div class="text-sm font-medium text-gray-900" data-v-44ba0c35>${ssrInterpolate(ticket.title)}</div><div class="text-sm text-gray-500 truncate max-w-xs" data-v-44ba0c35>${ssrInterpolate(ticket.description)}</div></td>`);
        if (((_b2 = unref(user)) == null ? void 0 : _b2.role) === "admin") {
          _push(`<td class="px-6 py-4 whitespace-nowrap" data-v-44ba0c35><div class="flex items-center" data-v-44ba0c35><div class="flex-shrink-0 h-8 w-8" data-v-44ba0c35><div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden" data-v-44ba0c35>`);
          if ((_c2 = ticket.createdBy) == null ? void 0 : _c2.profilePhoto) {
            _push(`<img${ssrRenderAttr("src", ticket.createdBy.profilePhoto)}${ssrRenderAttr("alt", ticket.createdBy.name)} class="w-full h-full object-cover" data-v-44ba0c35>`);
          } else {
            _push(`<span class="text-xs font-medium text-gray-700 uppercase" data-v-44ba0c35>${ssrInterpolate((_e2 = (_d2 = ticket.createdBy) == null ? void 0 : _d2.name) == null ? void 0 : _e2.charAt(0))}</span>`);
          }
          _push(`</div></div><div class="ml-3" data-v-44ba0c35><div class="text-sm font-medium text-gray-900" data-v-44ba0c35>${ssrInterpolate((_f2 = ticket.createdBy) == null ? void 0 : _f2.name)}</div></div></div></td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<td class="px-6 py-4 whitespace-nowrap" data-v-44ba0c35><span class="${ssrRenderClass([getPriorityClass(ticket.priority), "text-sm font-medium"])}" data-v-44ba0c35>${ssrInterpolate(ticket.priority)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-44ba0c35>${ssrInterpolate(formatDate(ticket.createdAt))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-44ba0c35>${ssrInterpolate(formatDate(ticket.closedAt || ticket.resolvedAt))}</td><td class="px-6 py-4 whitespace-nowrap" data-v-44ba0c35><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-44ba0c35>${ssrInterpolate(getResolutionTime(ticket))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (unref(filteredTickets).length === 0) {
        _push(`<div class="text-center py-12" data-v-44ba0c35>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-archive-box",
          class: "w-12 h-12 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900 mb-2" data-v-44ba0c35>No hay tickets cerrados</h3><p class="text-gray-500" data-v-44ba0c35>${ssrInterpolate(((_f = unref(user)) == null ? void 0 : _f.role) === "admin" ? "No se encontraron tickets cerrados en el sistema." : "A\xFAn no tienes tickets resueltos.")}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main></div>`);
      if (unref(showViewModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-44ba0c35><div class="bg-white rounded-lg w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto custom-scrollbar" data-v-44ba0c35><div class="sticky top-0 bg-white flex justify-between items-center p-6 border-b z-10" data-v-44ba0c35><div data-v-44ba0c35><h3 class="text-lg font-medium text-gray-900" data-v-44ba0c35>Detalles del Ticket #${ssrInterpolate((_h = (_g = unref(selectedTicket)) == null ? void 0 : _g._id) == null ? void 0 : _h.slice(-6))}</h3><p class="text-sm text-gray-500 mt-1" data-v-44ba0c35>Vista de solo lectura - Ticket cerrado</p></div><button class="text-gray-400 hover:text-gray-600" data-v-44ba0c35>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><div class="p-6" data-v-44ba0c35><div class="space-y-6" data-v-44ba0c35><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Asunto</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900" data-v-44ba0c35>${ssrInterpolate((_i = unref(selectedTicket)) == null ? void 0 : _i.title)}</div></div><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Descripci\xF3n</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900 min-h-[100px] whitespace-pre-wrap" data-v-44ba0c35>${ssrInterpolate((_j = unref(selectedTicket)) == null ? void 0 : _j.description)}</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-44ba0c35><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Creado por</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 flex items-center" data-v-44ba0c35><div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mr-3" data-v-44ba0c35>`);
        if ((_l = (_k = unref(selectedTicket)) == null ? void 0 : _k.createdBy) == null ? void 0 : _l.profilePhoto) {
          _push(`<img${ssrRenderAttr("src", unref(selectedTicket).createdBy.profilePhoto)}${ssrRenderAttr("alt", unref(selectedTicket).createdBy.name)} class="w-full h-full object-cover" data-v-44ba0c35>`);
        } else {
          _push(`<span class="text-xs font-medium text-gray-700 uppercase" data-v-44ba0c35>${ssrInterpolate((_o = (_n = (_m = unref(selectedTicket)) == null ? void 0 : _m.createdBy) == null ? void 0 : _n.name) == null ? void 0 : _o.charAt(0))}</span>`);
        }
        _push(`</div><div data-v-44ba0c35><div class="text-sm font-medium text-gray-900" data-v-44ba0c35>${ssrInterpolate((_q = (_p = unref(selectedTicket)) == null ? void 0 : _p.createdBy) == null ? void 0 : _q.name)}</div><div class="text-xs text-gray-500" data-v-44ba0c35>${ssrInterpolate((_s = (_r = unref(selectedTicket)) == null ? void 0 : _r.createdBy) == null ? void 0 : _s.department)}</div></div></div></div><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Prioridad</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2" data-v-44ba0c35><span class="${ssrRenderClass([getPriorityClass((_t = unref(selectedTicket)) == null ? void 0 : _t.priority), "text-sm font-medium"])}" data-v-44ba0c35>${ssrInterpolate((_u = unref(selectedTicket)) == null ? void 0 : _u.priority)}</span></div></div><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Fecha de apertura</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900" data-v-44ba0c35>${ssrInterpolate(formatDate((_v = unref(selectedTicket)) == null ? void 0 : _v.createdAt))}</div></div><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Fecha de cierre</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900" data-v-44ba0c35>${ssrInterpolate(formatDate(((_w = unref(selectedTicket)) == null ? void 0 : _w.closedAt) || ((_x = unref(selectedTicket)) == null ? void 0 : _x.resolvedAt)))}</div></div><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Estado</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2" data-v-44ba0c35><span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800" data-v-44ba0c35>${ssrInterpolate((_y = unref(selectedTicket)) == null ? void 0 : _y.status)}</span></div></div><div data-v-44ba0c35><label class="block text-sm font-medium text-gray-700 mb-2" data-v-44ba0c35>Tiempo de resoluci\xF3n</label><div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900" data-v-44ba0c35>${ssrInterpolate(getResolutionTime(unref(selectedTicket)))}</div></div></div></div></div><div class="sticky bottom-0 bg-gray-50 flex justify-end items-center p-6 border-t z-10" data-v-44ba0c35><button class="px-6 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-44ba0c35> Cerrar </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/historia.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const historia = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-44ba0c35"]]);

export { historia as default };
//# sourceMappingURL=historia-CHpVUH1E.mjs.map
