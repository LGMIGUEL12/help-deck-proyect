import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
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

const auth = defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-CXMpb5f8.mjs.map
