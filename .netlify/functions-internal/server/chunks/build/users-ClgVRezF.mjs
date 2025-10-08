import { u as useSidebar, _ as _sfc_main$1 } from './Sidebar-Da-3DNMX.mjs';
import { _ as _export_sfc, c as __nuxt_component_1$3 } from './server.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { sidebarVisible } = useSidebar();
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const showSuccessModal = ref(false);
    const newUser = ref({
      name: "",
      email: "",
      role: "user",
      department: ""
    });
    const editUserData = ref({
      _id: null,
      name: "",
      email: "",
      role: "user",
      department: ""
    });
    const userToDelete = ref(null);
    const successMessage = ref({ name: "" });
    const passwordCopied = ref(false);
    const usersList = ref([]);
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(new Date(date));
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Sidebar = _sfc_main$1;
      const _component_UIcon = __nuxt_component_1$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-d7346cc5>`);
      _push(ssrRenderComponent(_component_Sidebar, { currentPage: "users" }, null, _parent));
      _push(`<div class="${ssrRenderClass([unref(sidebarVisible) ? "ml-64" : "ml-16", "min-h-screen flex flex-col bg-gray-50 transition-all duration-300"])}" data-v-d7346cc5><header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4" data-v-d7346cc5><div class="flex items-center justify-between" data-v-d7346cc5><div class="flex items-center space-x-4" data-v-d7346cc5><h2 class="text-2xl font-semibold text-gray-900" data-v-d7346cc5>Gesti\xF3n de Usuarios</h2></div><div class="flex items-center space-x-4" data-v-d7346cc5><button class="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-d7346cc5>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-d7346cc5>Agregar Usuario</span></button></div></div></header><main class="flex-1 p-6 bg-gray-50" data-v-d7346cc5><div class="bg-white rounded-lg shadow overflow-hidden" data-v-d7346cc5><div class="px-6 py-4 border-b border-gray-200" data-v-d7346cc5><div data-v-d7346cc5><h3 class="text-lg font-medium text-gray-900" data-v-d7346cc5>Lista de Usuarios</h3><p class="text-sm text-gray-500" data-v-d7346cc5> Total: ${ssrInterpolate(unref(usersList).length)} usuario(s) registrado(s) </p></div></div><div class="overflow-x-auto" data-v-d7346cc5><table class="min-w-full divide-y divide-gray-200" data-v-d7346cc5><thead class="bg-gray-50" data-v-d7346cc5><tr data-v-d7346cc5><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-d7346cc5> Usuario </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-d7346cc5> Email </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-d7346cc5> Rol </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-d7346cc5> Departamento </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-d7346cc5> Fecha de Registro </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-d7346cc5> Acciones </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-d7346cc5><!--[-->`);
      ssrRenderList(unref(usersList), (userItem) => {
        var _a2;
        _push(`<tr class="hover:bg-gray-50" data-v-d7346cc5><td class="px-6 py-4 whitespace-nowrap" data-v-d7346cc5><div class="flex items-center" data-v-d7346cc5><div class="flex-shrink-0 h-10 w-10" data-v-d7346cc5><div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden" data-v-d7346cc5>`);
        if (userItem.profilePhoto) {
          _push(`<img${ssrRenderAttr("src", userItem.profilePhoto)}${ssrRenderAttr("alt", userItem.name)} class="w-full h-full object-cover" data-v-d7346cc5>`);
        } else {
          _push(`<span class="text-sm font-medium text-gray-700 uppercase" data-v-d7346cc5>${ssrInterpolate(userItem.name.charAt(0))}</span>`);
        }
        _push(`</div></div><div class="ml-4" data-v-d7346cc5><div class="text-sm font-medium text-gray-900" data-v-d7346cc5>${ssrInterpolate(userItem.name)}</div><div class="text-sm text-gray-500" data-v-d7346cc5>${ssrInterpolate(userItem.email)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-d7346cc5>${ssrInterpolate(userItem.email)}</td><td class="px-6 py-4 whitespace-nowrap" data-v-d7346cc5><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          userItem.role === "admin" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
        ])}" data-v-d7346cc5>${ssrInterpolate(userItem.role === "admin" ? "Administrador" : "Usuario")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-d7346cc5>${ssrInterpolate(userItem.department)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-d7346cc5>${ssrInterpolate(formatDate(userItem.createdAt))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium" data-v-d7346cc5><div class="flex space-x-2" data-v-d7346cc5><button class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-900 px-2 py-1 rounded transition-colors" title="Editar usuario" data-v-d7346cc5>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-pencil",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button>`);
        if (userItem._id !== ((_a2 = unref(user)) == null ? void 0 : _a2._id)) {
          _push(`<button class="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-900 px-2 py-1 rounded transition-colors" title="Eliminar usuario" data-v-d7346cc5>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-trash",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<span class="text-gray-400 text-xs px-2 py-1" data-v-d7346cc5> (Tu cuenta) </span>`);
        }
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></main></div>`);
      if (unref(showAddModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-d7346cc5><div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto" data-v-d7346cc5><div class="flex justify-between items-center mb-4" data-v-d7346cc5><h3 class="text-lg font-medium text-gray-900" data-v-d7346cc5>Agregar Nuevo Usuario</h3><button class="text-gray-400 hover:text-gray-600" data-v-d7346cc5>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><form class="space-y-4" data-v-d7346cc5><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Nombre Completo</label><input${ssrRenderAttr("value", unref(newUser).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Nombre del usuario" data-v-d7346cc5></div><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Email</label><input${ssrRenderAttr("value", unref(newUser).email)} type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="email@ejemplo.com" data-v-d7346cc5></div><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Rol</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" data-v-d7346cc5><option value="user" data-v-d7346cc5${ssrIncludeBooleanAttr(Array.isArray(unref(newUser).role) ? ssrLooseContain(unref(newUser).role, "user") : ssrLooseEqual(unref(newUser).role, "user")) ? " selected" : ""}>Usuario</option><option value="admin" data-v-d7346cc5${ssrIncludeBooleanAttr(Array.isArray(unref(newUser).role) ? ssrLooseContain(unref(newUser).role, "admin") : ssrLooseEqual(unref(newUser).role, "admin")) ? " selected" : ""}>Administrador</option></select></div><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Departamento</label><input${ssrRenderAttr("value", unref(newUser).department)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Departamento del usuario" data-v-d7346cc5></div><div class="flex justify-end space-x-3 pt-4" data-v-d7346cc5><button type="button" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50" data-v-d7346cc5> Cancelar </button><button type="submit" class="px-4 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-d7346cc5> Agregar Usuario </button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showEditModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-d7346cc5><div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto" data-v-d7346cc5><div class="flex justify-between items-center mb-4" data-v-d7346cc5><h3 class="text-lg font-medium text-gray-900" data-v-d7346cc5>Editar Usuario</h3><button class="text-gray-400 hover:text-gray-600" data-v-d7346cc5>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><form class="space-y-4" data-v-d7346cc5><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Nombre Completo</label><input${ssrRenderAttr("value", unref(editUserData).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Nombre del usuario" data-v-d7346cc5></div><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Email</label><input${ssrRenderAttr("value", unref(editUserData).email)} type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="email@ejemplo.com" data-v-d7346cc5></div><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Rol</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" data-v-d7346cc5><option value="user" data-v-d7346cc5${ssrIncludeBooleanAttr(Array.isArray(unref(editUserData).role) ? ssrLooseContain(unref(editUserData).role, "user") : ssrLooseEqual(unref(editUserData).role, "user")) ? " selected" : ""}>Usuario</option><option value="admin" data-v-d7346cc5${ssrIncludeBooleanAttr(Array.isArray(unref(editUserData).role) ? ssrLooseContain(unref(editUserData).role, "admin") : ssrLooseEqual(unref(editUserData).role, "admin")) ? " selected" : ""}>Administrador</option></select></div><div data-v-d7346cc5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d7346cc5>Departamento</label><input${ssrRenderAttr("value", unref(editUserData).department)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700" placeholder="Departamento del usuario" data-v-d7346cc5></div><div class="flex justify-end space-x-3 pt-4" data-v-d7346cc5><button type="button" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50" data-v-d7346cc5> Cancelar </button><button type="submit" class="px-4 py-2 text-white rounded-md transition-colors" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-d7346cc5> Guardar Cambios </button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showSuccessModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-d7346cc5><div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto" data-v-d7346cc5><div class="flex items-center p-6 pb-4" data-v-d7346cc5><div class="flex-shrink-0" data-v-d7346cc5><div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center" data-v-d7346cc5>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check-circle",
          class: "w-8 h-8 text-green-600"
        }, null, _parent));
        _push(`</div></div><div class="ml-4" data-v-d7346cc5><h3 class="text-lg font-medium text-gray-900" data-v-d7346cc5>Usuario Creado Exitosamente</h3></div></div><div class="px-6 pb-6" data-v-d7346cc5><p class="text-sm text-gray-600 mb-4" data-v-d7346cc5> El usuario <span class="font-semibold text-gray-900" data-v-d7346cc5>${ssrInterpolate(unref(successMessage).name)}</span> ha sido creado correctamente. </p><div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4" data-v-d7346cc5><div class="flex" data-v-d7346cc5>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-information-circle",
          class: "w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
        }, null, _parent));
        _push(`<div class="ml-3 flex-1" data-v-d7346cc5><h4 class="text-sm font-medium text-blue-900 mb-1" data-v-d7346cc5>Contrase\xF1a por defecto</h4><div class="flex items-center gap-2" data-v-d7346cc5><code class="bg-blue-100 px-2 py-1 rounded font-mono text-sm text-blue-800" data-v-d7346cc5>Password123!</code><button class="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 rounded transition-colors"${ssrRenderAttr("title", unref(passwordCopied) ? "Copiado!" : "Copiar contrase\xF1a")} data-v-d7346cc5>`);
        if (!unref(passwordCopied)) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-clipboard",
            class: "w-4 h-4"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-check",
            class: "w-4 h-4"
          }, null, _parent));
        }
        _push(`<span data-v-d7346cc5>${ssrInterpolate(unref(passwordCopied) ? "Copiado" : "Copiar")}</span></button></div><p class="text-xs text-blue-700 mt-2" data-v-d7346cc5> El usuario puede cambiar su contrase\xF1a despu\xE9s de iniciar sesi\xF3n por primera vez. </p></div></div></div><div class="flex justify-end" data-v-d7346cc5><button type="button" class="px-6 py-2 text-white rounded-md transition-colors font-medium" style="${ssrRenderStyle({ "background-color": "#7db88a" })}" onmouseover="this.style.backgroundColor=&#39;#6ba378&#39;" onmouseout="this.style.backgroundColor=&#39;#7db88a&#39;" data-v-d7346cc5> Entendido </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-d7346cc5><div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto" data-v-d7346cc5><div class="flex items-center p-6 pb-4" data-v-d7346cc5><div class="flex-shrink-0" data-v-d7346cc5>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-8 h-8 text-red-600"
        }, null, _parent));
        _push(`</div><div class="ml-4" data-v-d7346cc5><h3 class="text-lg font-medium text-gray-900" data-v-d7346cc5>Confirmar Eliminaci\xF3n</h3></div></div><div class="px-6 pb-6" data-v-d7346cc5><p class="text-sm text-gray-500 mb-6" data-v-d7346cc5> \xBFEst\xE1s seguro de que quieres eliminar a <span class="font-semibold text-gray-700" data-v-d7346cc5>${ssrInterpolate((_a = unref(userToDelete)) == null ? void 0 : _a.name)}</span>? Esta acci\xF3n no se puede deshacer. </p><div class="flex justify-end space-x-3" data-v-d7346cc5><button type="button" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" data-v-d7346cc5> Cancelar </button><button type="button" class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-semibold shadow-md" style="${ssrRenderStyle({ "background-color": "#dc2626", "color": "white" })}" onmouseover="this.style.backgroundColor=&#39;#b91c1c&#39;" onmouseout="this.style.backgroundColor=&#39;#dc2626&#39;" data-v-d7346cc5> Eliminar Usuario </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const users = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7346cc5"]]);

export { users as default };
//# sourceMappingURL=users-ClgVRezF.mjs.map
