import { e as defineNuxtRouteMiddleware, n as navigateTo, f as createError } from './server.mjs';
import { u as useAuth } from './useAuth-BCYmaoGs.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const admin = defineNuxtRouteMiddleware((to, from) => {
  var _a;
  const { isLoggedIn, user } = useAuth();
  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
  if (((_a = user.value) == null ? void 0 : _a.role) !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Acceso denegado. Solo administradores pueden acceder a esta p\xE1gina."
    });
  }
});

export { admin as default };
//# sourceMappingURL=admin-CiGJnbNY.mjs.map
