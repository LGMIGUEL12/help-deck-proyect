import { _ as _export_sfc, a as __nuxt_component_0$2, b as __nuxt_component_1$1, c as __nuxt_component_1$3 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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

const _sfc_main$1 = {
  __name: "LoginRequiredModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const closeModal = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center" }, _attrs))}><div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div><div class="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full"><button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="text-center mb-6"><div class="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4"><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-2xl font-semibold text-gray-800 mb-2">Acceso Requerido</h3><p class="text-gray-600"> Para enviar un ticket necesitas estar logueado. Debes crear un usuario o iniciar sesi\xF3n para continuar. </p></div><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          onClick: closeModal,
          class: "block w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"${_scopeId}> Iniciar Sesi\xF3n </button>`);
            } else {
              return [
                createVNode("button", { class: "w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200" }, " Iniciar Sesi\xF3n ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/signup",
          onClick: closeModal,
          class: "block w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-full bg-white hover:bg-gray-50 text-teal-600 font-medium py-3 px-4 rounded-lg border border-teal-600 transition-colors duration-200"${_scopeId}> Crear Cuenta </button>`);
            } else {
              return [
                createVNode("button", { class: "w-full bg-white hover:bg-gray-50 text-teal-600 font-medium py-3 px-4 rounded-lg border border-teal-600 transition-colors duration-200" }, " Crear Cuenta ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"> Cancelar </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginRequiredModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
    const showLoginModal = ref(false);
    const showContactModal = ref(false);
    const isSubmitting = ref(false);
    const contactForm = ref({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "Media"
    });
    const { isLoggedIn, user, logout } = useAuth();
    const handleLogout = () => {
      logout();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_UButton = __nuxt_component_1$1;
      const _component_UIcon = __nuxt_component_1$3;
      const _component_LoginRequiredModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen flex flex-col",
        style: { "background-color": "#3d5a52" }
      }, _attrs))} data-v-37d89e5a><header class="px-8 py-4" data-v-37d89e5a><nav class="max-w-7xl mx-auto flex items-center justify-between" data-v-37d89e5a><div class="flex items-center space-x-8" data-v-37d89e5a><div class="flex items-center space-x-2" data-v-37d89e5a><img${ssrRenderAttr("src", _imports_0)} alt="Peeplo Help" class="w-8 h-8 rounded-lg" data-v-37d89e5a><span class="text-white font-semibold" data-v-37d89e5a>Peeplo Help</span></div><div class="flex items-center space-x-6" data-v-37d89e5a><a href="/" class="text-white hover:text-gray-200 transition-colors" data-v-37d89e5a>Home</a><a href="#" class="text-white hover:text-gray-200 transition-colors" data-v-37d89e5a>Support</a><a href="#" class="text-white hover:text-gray-200 transition-colors" data-v-37d89e5a>Knowledge Base</a><a href="#" class="text-white hover:text-gray-200 transition-colors" data-v-37d89e5a>Community Forums</a></div></div>`);
      if (!unref(isLoggedIn)) {
        _push(`<div data-v-37d89e5a>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                style: { "background-color": "#a8d5ba", "color": "#3d5a52" },
                class: "font-semibold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Login `);
                  } else {
                    return [
                      createTextVNode(" Login ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  style: { "background-color": "#a8d5ba", "color": "#3d5a52" },
                  class: "font-semibold"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Login ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center space-x-4" data-v-37d89e5a><span class="text-white" data-v-37d89e5a>Hola, ${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.name)}</span><div class="flex space-x-2" data-v-37d89e5a>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/tickets" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                style: { "background-color": "#a8d5ba", "color": "#3d5a52" },
                class: "font-semibold text-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Mis Tickets `);
                  } else {
                    return [
                      createTextVNode(" Mis Tickets ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  style: { "background-color": "#a8d5ba", "color": "#3d5a52" },
                  class: "font-semibold text-sm"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Mis Tickets ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          onClick: handleLogout,
          style: { "background-color": "#dc2626", "color": "white" },
          class: "font-semibold text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Logout `);
            } else {
              return [
                createTextVNode(" Logout ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</nav></header><main class="flex-1 flex items-center justify-center px-4 py-8" data-v-37d89e5a><div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden" data-v-37d89e5a><div class="flex items-start justify-between p-8 bg-gradient-to-r from-blue-50 to-purple-50" data-v-37d89e5a><div class="flex items-center" data-v-37d89e5a><div class="w-40 h-28 rounded-2xl overflow-hidden mr-8 flex-shrink-0 bg-blue-100" data-v-37d89e5a><img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="Support Team" class="w-full h-full object-cover" data-v-37d89e5a></div><div data-v-37d89e5a><h1 class="text-4xl font-bold text-gray-800 leading-tight" data-v-37d89e5a> Welcome to Our<br data-v-37d89e5a>Support Center </h1></div></div><div class="grid grid-cols-2 gap-4 min-w-[280px]" data-v-37d89e5a><div class="flex flex-col items-center p-3 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer" data-v-37d89e5a><svg class="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-37d89e5a></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-37d89e5a></path></svg><span class="text-sm font-medium text-gray-700 text-center" data-v-37d89e5a>Troubleshooting</span></div><div class="flex flex-col items-center p-3 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer" data-v-37d89e5a><svg class="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-37d89e5a></path></svg><span class="text-sm font-medium text-gray-700 text-center" data-v-37d89e5a>FAQs</span></div><div class="flex flex-col items-center p-3 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer" data-v-37d89e5a><svg class="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" data-v-37d89e5a></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" data-v-37d89e5a></path></svg><span class="text-sm font-medium text-gray-700 text-center" data-v-37d89e5a>Book a Call</span></div></div></div><div class="p-8" data-v-37d89e5a><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-37d89e5a><div class="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow" data-v-37d89e5a><div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm" data-v-37d89e5a><svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-37d89e5a></path></svg></div><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-37d89e5a>Browse<br data-v-37d89e5a>Knowledge Base</h3><button class="text-teal-600 hover:text-teal-700 font-medium" data-v-37d89e5a>Sap action</button></div><div class="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow" data-v-37d89e5a><div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm" data-v-37d89e5a><svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-37d89e5a></path></svg></div><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-37d89e5a>Submit a Ticket</h3><p class="text-sm text-gray-600 mb-4" data-v-37d89e5a>Pase Suprsong schen</p><button class="text-teal-600 hover:text-teal-700 font-medium" data-v-37d89e5a> Sap action </button></div><div class="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow" data-v-37d89e5a><div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm" data-v-37d89e5a><svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-v-37d89e5a></path></svg></div><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-37d89e5a>Live Chat</h3><p class="text-sm text-gray-600 mb-4" data-v-37d89e5a>Tieser Ho Pes Soming<br data-v-37d89e5a>Suppoe</p><button class="text-orange-500 hover:text-orange-600 font-medium" data-v-37d89e5a>Sap action</button></div></div></div></div></main><footer class="px-8 py-6" data-v-37d89e5a><div class="max-w-7xl mx-auto flex items-center justify-between" data-v-37d89e5a><div class="flex items-center space-x-6" data-v-37d89e5a><a href="#" class="text-white hover:text-gray-200 transition-colors text-sm" data-v-37d89e5a>About Us</a><a href="#" class="text-white hover:text-gray-200 transition-colors text-sm" data-v-37d89e5a>Privacy Policy</a><a href="#" class="text-white hover:text-gray-200 transition-colors text-sm" data-v-37d89e5a>Terms of Service</a></div><div class="flex items-center space-x-4" data-v-37d89e5a><a href="#" class="text-white hover:text-gray-200 transition-colors" data-v-37d89e5a><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" data-v-37d89e5a></path></svg></a><a href="#" class="text-white hover:text-gray-200 transition-colors" data-v-37d89e5a><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" data-v-37d89e5a></path></svg></a><a href="#" class="text-white hover:text-gray-200 transition-colors" data-v-37d89e5a><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-v-37d89e5a></path></svg></a></div><div class="fixed bottom-6 right-6" data-v-37d89e5a><button class="w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg" style="${ssrRenderStyle({ "background-color": "#4CAF50" })}" title="Contactar Soporte" data-v-37d89e5a><svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-37d89e5a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" data-v-37d89e5a></path></svg></button></div></div></footer>`);
      if (unref(showContactModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-37d89e5a><div class="bg-white rounded-lg w-full max-w-lg mx-auto max-h-[90vh] overflow-hidden flex flex-col" data-v-37d89e5a><div class="flex justify-between items-center p-6 border-b" data-v-37d89e5a><div data-v-37d89e5a><h3 class="text-lg font-medium text-gray-900" data-v-37d89e5a>Contactar Soporte</h3><p class="text-sm text-gray-500 mt-1" data-v-37d89e5a>Env\xEDa un mensaje directo a nuestro equipo de soporte</p><div class="flex items-center mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md inline-flex" data-v-37d89e5a>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-envelope",
          class: "w-3 h-3 mr-1"
        }, null, _parent));
        _push(`<span class="font-medium" data-v-37d89e5a>Destinatario: ramosvasquezlusimiguel@gmail.com</span></div></div><button class="text-gray-400 hover:text-gray-600" data-v-37d89e5a>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><div class="flex-1 overflow-y-auto scrollbar-white" data-v-37d89e5a><div class="px-6 pt-4 pb-2" data-v-37d89e5a><div class="bg-blue-50 border border-blue-200 rounded-lg p-3" data-v-37d89e5a><div class="flex items-start" data-v-37d89e5a>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-information-circle",
          class: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
        }, null, _parent));
        _push(`<div class="text-sm text-blue-700" data-v-37d89e5a><p class="font-medium mb-1" data-v-37d89e5a>\xBFC\xF3mo funciona?</p><p data-v-37d89e5a>Tu mensaje ser\xE1 enviado directamente a <span class="font-mono text-xs bg-blue-100 px-1 rounded" data-v-37d89e5a>ramosvasquezlusimiguel@gmail.com</span> con toda tu informaci\xF3n para que puedan ayudarte r\xE1pidamente.</p></div></div></div></div><div class="px-6 pb-6" data-v-37d89e5a><div class="space-y-4" data-v-37d89e5a><div data-v-37d89e5a><label for="contactName" class="block text-sm font-medium text-gray-700 mb-2" data-v-37d89e5a> Nombre * `);
        if (unref(isLoggedIn)) {
          _push(`<span class="text-xs text-gray-500 font-normal ml-2" data-v-37d89e5a>(tomado de tu perfil)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><input id="contactName"${ssrRenderAttr("value", unref(contactForm).name)} type="text" required${ssrIncludeBooleanAttr(unref(isLoggedIn)) ? " readonly" : ""} class="${ssrRenderClass([
          "w-full px-3 py-2 border rounded-md focus:outline-none",
          unref(isLoggedIn) ? "bg-gray-100 text-gray-700 border-gray-200 cursor-not-allowed" : "bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
        ])}"${ssrRenderAttr("placeholder", unref(isLoggedIn) ? "" : "Tu nombre completo")} data-v-37d89e5a></div><div data-v-37d89e5a><label for="contactEmail" class="block text-sm font-medium text-gray-700 mb-2" data-v-37d89e5a> Email * `);
        if (unref(isLoggedIn)) {
          _push(`<span class="text-xs text-gray-500 font-normal ml-2" data-v-37d89e5a>(tomado de tu perfil)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><input id="contactEmail"${ssrRenderAttr("value", unref(contactForm).email)} type="email" required${ssrIncludeBooleanAttr(unref(isLoggedIn)) ? " readonly" : ""} class="${ssrRenderClass([
          "w-full px-3 py-2 border rounded-md focus:outline-none",
          unref(isLoggedIn) ? "bg-gray-100 text-gray-700 border-gray-200 cursor-not-allowed" : "bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
        ])}"${ssrRenderAttr("placeholder", unref(isLoggedIn) ? "" : "tu@email.com")} data-v-37d89e5a></div><div data-v-37d89e5a><label for="contactSubject" class="block text-sm font-medium text-gray-700 mb-2" data-v-37d89e5a> Asunto * </label><input id="contactSubject"${ssrRenderAttr("value", unref(contactForm).subject)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400" placeholder="\xBFEn qu\xE9 podemos ayudarte?" data-v-37d89e5a></div><div data-v-37d89e5a><label for="contactMessage" class="block text-sm font-medium text-gray-700 mb-2" data-v-37d89e5a> Mensaje * </label><textarea id="contactMessage" required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical bg-white text-gray-900 placeholder-gray-400" placeholder="Describe tu consulta o problema en detalle..." data-v-37d89e5a>${ssrInterpolate(unref(contactForm).message)}</textarea></div><div data-v-37d89e5a><label for="contactPriority" class="block text-sm font-medium text-gray-700 mb-2" data-v-37d89e5a> Prioridad </label><select id="contactPriority" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900" data-v-37d89e5a><option value="Baja" data-v-37d89e5a${ssrIncludeBooleanAttr(Array.isArray(unref(contactForm).priority) ? ssrLooseContain(unref(contactForm).priority, "Baja") : ssrLooseEqual(unref(contactForm).priority, "Baja")) ? " selected" : ""}>Baja - Consulta general</option><option value="Media" data-v-37d89e5a${ssrIncludeBooleanAttr(Array.isArray(unref(contactForm).priority) ? ssrLooseContain(unref(contactForm).priority, "Media") : ssrLooseEqual(unref(contactForm).priority, "Media")) ? " selected" : ""}>Media - Necesito ayuda</option><option value="Alta" data-v-37d89e5a${ssrIncludeBooleanAttr(Array.isArray(unref(contactForm).priority) ? ssrLooseContain(unref(contactForm).priority, "Alta") : ssrLooseEqual(unref(contactForm).priority, "Alta")) ? " selected" : ""}>Alta - Problema urgente</option></select></div></div></div></div><form data-v-37d89e5a><div class="flex justify-between items-center px-6 py-4 border-t bg-gray-50" data-v-37d89e5a><div class="text-xs text-gray-500 flex items-center" data-v-37d89e5a>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-paper-airplane",
          class: "w-3 h-3 mr-1"
        }, null, _parent));
        _push(`<span data-v-37d89e5a>Se enviar\xE1 a: ramosvasquezlusimiguel@gmail.com</span></div><div class="flex space-x-3" data-v-37d89e5a><button type="button" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50" data-v-37d89e5a> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="px-4 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#4CAF50" })}" onmouseover="this.style.backgroundColor=&#39;#45a049&#39;" onmouseout="this.style.backgroundColor=&#39;#4CAF50&#39;" data-v-37d89e5a>${ssrInterpolate(unref(isSubmitting) ? "Enviando..." : "Enviar Mensaje")}</button></div></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_LoginRequiredModal, {
        isOpen: unref(showLoginModal),
        onClose: ($event) => showLoginModal.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-37d89e5a"]]);

export { home as default };
//# sourceMappingURL=home-D7zlZeRn.mjs.map
