import { a as __nuxt_component_0$2 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "seed-tickets",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const message = ref("");
    const messageClass = ref("");
    const summary = ref(null);
    const getStatusColor = (status) => {
      const colors = {
        open: "text-green-600",
        in_progress: "text-blue-600",
        resolved: "text-purple-600",
        closed: "text-gray-600"
      };
      return colors[status] || "text-gray-600";
    };
    const getPriorityColor = (priority) => {
      const colors = {
        low: "text-green-600",
        medium: "text-yellow-600",
        high: "text-orange-600",
        urgent: "text-red-600"
      };
      return colors[priority] || "text-gray-600";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center p-6" }, _attrs))}><div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">Generador de Tickets de Prueba</h1><p class="text-gray-600">Crea m\xFAltiples tickets de prueba con diferentes usuarios, fechas y estados</p></div>`);
      if (unref(message)) {
        _push(`<div class="${ssrRenderClass([unref(messageClass), "mb-6 p-4 rounded-lg"])}"><p class="font-medium">${ssrInterpolate(unref(message))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(summary)) {
        _push(`<div class="mb-6 bg-gray-50 rounded-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Resumen de Tickets Creados</h3><div class="grid grid-cols-2 gap-4 mb-4"><div class="bg-white rounded p-4 border border-gray-200"><p class="text-sm text-gray-600 mb-1">Total de Tickets</p><p class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(summary).count)}</p></div></div><div class="space-y-4"><div><h4 class="text-sm font-medium text-gray-700 mb-2">Por Estado:</h4><div class="grid grid-cols-2 md:grid-cols-4 gap-2"><!--[-->`);
        ssrRenderList(unref(summary).summary.byStatus, (count, status) => {
          _push(`<div class="bg-white rounded p-3 border border-gray-200"><p class="text-xs text-gray-600 capitalize">${ssrInterpolate(status)}</p><p class="${ssrRenderClass([getStatusColor(status), "text-lg font-semibold"])}">${ssrInterpolate(count)}</p></div>`);
        });
        _push(`<!--]--></div></div><div><h4 class="text-sm font-medium text-gray-700 mb-2">Por Prioridad:</h4><div class="grid grid-cols-2 md:grid-cols-4 gap-2"><!--[-->`);
        ssrRenderList(unref(summary).summary.byPriority, (count, priority) => {
          _push(`<div class="bg-white rounded p-3 border border-gray-200"><p class="text-xs text-gray-600 capitalize">${ssrInterpolate(priority)}</p><p class="${ssrRenderClass([getPriorityColor(priority), "text-lg font-semibold"])}">${ssrInterpolate(count)}</p></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"><div class="flex items-start"><svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg><div><h3 class="text-sm font-medium text-blue-900 mb-1">Informaci\xF3n</h3><ul class="text-sm text-blue-800 space-y-1"><li>\u2022 Se crear\xE1n 15 tickets de prueba</li><li>\u2022 Con diferentes usuarios, fechas (\xFAltimos 60 d\xEDas), prioridades y estados</li><li>\u2022 Los tickets se asignar\xE1n aleatoriamente a usuarios existentes</li><li>\u2022 Algunos tickets estar\xE1n cerrados/resueltos con fechas de cierre</li></ul></div></div></div><div class="flex gap-4"><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="flex-1 px-6 py-3 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed" style="${ssrRenderStyle([{ "background-color": "#7db88a" }, !unref(loading) ? "" : "background-color: #9ca3af !important"])}" onmouseover="if (!this.disabled) this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="if (!this.disabled) this.style.backgroundColor=&#39;#7db88a&#39;">`);
      if (!unref(loading)) {
        _push(`<span>Generar Tickets de Prueba</span>`);
      } else {
        _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generando... </span>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tickets",
        class: "px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver Tickets `);
          } else {
            return [
              createTextVNode(" Ver Tickets ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-6 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "text-sm text-gray-600 hover:text-gray-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 Volver al inicio `);
          } else {
            return [
              createTextVNode(" \u2190 Volver al inicio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/seed-tickets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=seed-tickets-Cvvt2vIH.mjs.map
