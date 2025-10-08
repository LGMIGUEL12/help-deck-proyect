import { l as buildAssetsURL } from '../_/nitro.mjs';
import { d as useState, a as __nuxt_component_0$2, c as __nuxt_component_1$3 } from './server.mjs';
import { watch, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BCYmaoGs.mjs';

const _imports_0 = "" + buildAssetsURL("logo.Cu1j0IpA.png");
const useSidebar = () => {
  const sidebarVisible = useState("sidebarVisible", () => true);
  watch(sidebarVisible, (newValue) => {
  });
  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value;
  };
  return {
    sidebarVisible,
    toggleSidebar
  };
};
const _sfc_main = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    currentPage: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const { user } = useAuth();
    const { sidebarVisible } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_UIcon = __nuxt_component_1$3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-col fixed h-full z-10 transition-all duration-300", unref(sidebarVisible) ? "w-64" : "w-16"],
        style: { "background-color": "#284734" }
      }, _attrs))}><div class="p-2 border-b" style="${ssrRenderStyle({ "border-color": "#5a7a67" })}"><div class="flex items-center justify-between">`);
      if (unref(sidebarVisible)) {
        _push(`<div class="flex items-center"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="h-12 w-auto"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([unref(sidebarVisible) ? "" : "mx-auto", "text-gray-300 hover:text-white transition-colors p-1"])}"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div><nav class="flex-1 p-2 overflow-y-auto"><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: ["flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300", [unref(sidebarVisible) ? "px-3 py-2" : "px-2 py-2 justify-center", { "text-white": __props.currentPage === "home", "bg-[#7db88a]": __props.currentPage === "home" }]],
        title: !unref(sidebarVisible) ? "Volver al Home" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-home",
              class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
            }, null, _parent2, _scopeId));
            if (unref(sidebarVisible)) {
              _push2(`<span${_scopeId}>Volver al Home</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-home",
                class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
              }, null, 8, ["class"]),
              unref(sidebarVisible) ? (openBlock(), createBlock("span", { key: 0 }, "Volver al Home")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tickets",
        class: ["flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300", [unref(sidebarVisible) ? "px-3 py-2" : "px-2 py-2 justify-center", { "text-white": __props.currentPage === "tickets", "bg-[#7db88a]": __props.currentPage === "tickets" }]],
        title: !unref(sidebarVisible) ? "Mis Tickets" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-ticket",
              class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
            }, null, _parent2, _scopeId));
            if (unref(sidebarVisible)) {
              _push2(`<span${_scopeId}>Mis Tickets</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-ticket",
                class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
              }, null, 8, ["class"]),
              unref(sidebarVisible) ? (openBlock(), createBlock("span", { key: 0 }, "Mis Tickets")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/historia",
        class: ["flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300", [unref(sidebarVisible) ? "px-3 py-2" : "px-2 py-2 justify-center", { "text-white": __props.currentPage === "historia", "bg-[#7db88a]": __props.currentPage === "historia" }]],
        title: !unref(sidebarVisible) ? "Historia" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-archive-box",
              class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
            }, null, _parent2, _scopeId));
            if (unref(sidebarVisible)) {
              _push2(`<span${_scopeId}>Historia</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-archive-box",
                class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
              }, null, 8, ["class"]),
              unref(sidebarVisible) ? (openBlock(), createBlock("span", { key: 0 }, "Historia")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (((_a = unref(user)) == null ? void 0 : _a.role) === "admin") {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin",
          class: ["flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300", [unref(sidebarVisible) ? "px-3 py-2" : "px-2 py-2 justify-center", { "text-white": __props.currentPage === "admin", "bg-[#7db88a]": __props.currentPage === "admin" }]],
          title: !unref(sidebarVisible) ? "Panel de Control" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-squares-plus",
                class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
              }, null, _parent2, _scopeId));
              if (unref(sidebarVisible)) {
                _push2(`<span${_scopeId}>Panel de Control</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-squares-plus",
                  class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
                }, null, 8, ["class"]),
                unref(sidebarVisible) ? (openBlock(), createBlock("span", { key: 0 }, "Panel de Control")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (((_b = unref(user)) == null ? void 0 : _b.role) === "admin") {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/users",
          class: ["flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300", [unref(sidebarVisible) ? "px-3 py-2" : "px-2 py-2 justify-center", { "text-white": __props.currentPage === "users", "bg-[#7db88a]": __props.currentPage === "users" }]],
          title: !unref(sidebarVisible) ? "Usuarios" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-users",
                class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
              }, null, _parent2, _scopeId));
              if (unref(sidebarVisible)) {
                _push2(`<span${_scopeId}>Usuarios</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-users",
                  class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
                }, null, 8, ["class"]),
                unref(sidebarVisible) ? (openBlock(), createBlock("span", { key: 0 }, "Usuarios")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></nav><div class="p-2 border-t" style="${ssrRenderStyle({ "border-color": "#5a7a67" })}">`);
      if (unref(sidebarVisible)) {
        _push(`<div class="flex items-center space-x-3 mb-3 px-2"><div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">`);
        if ((_c = unref(user)) == null ? void 0 : _c.profilePhoto) {
          _push(`<img${ssrRenderAttr("src", unref(user).profilePhoto)}${ssrRenderAttr("alt", (_d = unref(user)) == null ? void 0 : _d.name)} class="w-full h-full object-cover">`);
        } else {
          _push(`<span class="text-sm font-medium text-gray-700 uppercase">${ssrInterpolate((_f = (_e = unref(user)) == null ? void 0 : _e.name) == null ? void 0 : _f.charAt(0))}</span>`);
        }
        _push(`</div><div><div class="text-sm font-medium text-white">${ssrInterpolate((_g = unref(user)) == null ? void 0 : _g.name)}</div><div class="text-xs text-gray-300">${ssrInterpolate((_h = unref(user)) == null ? void 0 : _h.department)}</div></div></div>`);
      } else {
        _push(`<div class="flex justify-center mb-3"><div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">`);
        if ((_i = unref(user)) == null ? void 0 : _i.profilePhoto) {
          _push(`<img${ssrRenderAttr("src", unref(user).profilePhoto)}${ssrRenderAttr("alt", (_j = unref(user)) == null ? void 0 : _j.name)} class="w-full h-full object-cover">`);
        } else {
          _push(`<span class="text-xs font-medium text-gray-700 uppercase">${ssrInterpolate((_l = (_k = unref(user)) == null ? void 0 : _k.name) == null ? void 0 : _l.charAt(0))}</span>`);
        }
        _push(`</div></div>`);
      }
      _push(`<button class="${ssrRenderClass([unref(sidebarVisible) ? "w-full px-3 py-2" : "px-2 py-2 justify-center w-full", "flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"])}"${ssrRenderAttr("title", !unref(sidebarVisible) ? "Cerrar Sesi\xF3n" : "")}>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-right-on-rectangle",
        class: ["w-5 h-5", unref(sidebarVisible) ? "mr-3" : ""]
      }, null, _parent));
      if (unref(sidebarVisible)) {
        _push(`<span>Cerrar Sesi\xF3n</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, useSidebar as u };
//# sourceMappingURL=Sidebar-Da-3DNMX.mjs.map
