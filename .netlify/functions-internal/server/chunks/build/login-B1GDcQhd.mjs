import { u as useHead, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, mergeProps, withCtx, createBlock, createVNode, openBlock, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './Avatar-BJG2KIh6.mjs';
import { u as useAuth } from './useAuth-BCYmaoGs.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
          async: true,
          defer: true
        }
      ]
    });
    useAuth();
    const loginError = ref("");
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center relative" }, _attrs))}><div class="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style="${ssrRenderStyle({ "background-image": "url('/img/Backgrounds.png')" })}"></div><div class="absolute top-6 left-6 z-20">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId}></path></svg><span class="font-medium"${_scopeId}>Volver a Home</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 19l-7-7 7-7"
                })
              ])),
              createVNode("span", { class: "font-medium" }, "Volver a Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative z-10 w-full max-w-md mx-4"><div class="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-2xl p-8"><div class="flex justify-center mb-6"><img${ssrRenderAttr("src", _imports_0)} alt="Peeplo Logo" class="w-24 h-24 rounded-2xl shadow-lg"></div><h1 class="text-3xl font-bold text-center mb-2"><span class="text-purple-800">Welcome to </span><span class="text-teal-600">PEEPLO</span></h1><h2 class="text-2xl font-bold text-center text-teal-600 mb-8">Community</h2>`);
      if (unref(loginError)) {
        _push(`<div class="text-red-500 text-sm text-center mb-4 bg-red-100 p-3 rounded-lg">${ssrInterpolate(unref(loginError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-4"><div id="googleButtonContainer"></div></div><p class="text-center text-purple-400 text-sm mt-6"> Only authorized Sommardahl Ventures domains </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-B1GDcQhd.mjs.map
