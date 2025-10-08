import { d as useState } from './server.mjs';
import { readonly } from 'vue';

const useAuth = () => {
  const isLoggedIn = useState("auth.isLoggedIn", () => false);
  const user = useState("auth.user", () => null);
  const login = async (email, password) => {
    var _a;
    try {
      const data = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password }
      });
      if (data.success) {
        isLoggedIn.value = true;
        user.value = data.user;
        if (false) ;
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.error("Error de login:", error);
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "Error de conexi\xF3n"
      };
    }
  };
  const loginSimple = (userData) => {
    isLoggedIn.value = true;
    user.value = userData;
  };
  const loginWithGoogle = async (credential) => {
    var _a;
    try {
      const data = await $fetch("/api/auth/google", {
        method: "POST",
        body: { credential }
      });
      if (data.success) {
        isLoggedIn.value = true;
        user.value = data.user;
        if (false) ;
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.error("Error de login con Google:", error);
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "Error de conexi\xF3n"
      };
    }
  };
  const logout = () => {
    isLoggedIn.value = false;
    user.value = null;
  };
  const checkAuth = () => {
  };
  const isAdmin = () => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
  };
  const isUser = () => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.role) === "user";
  };
  const hasRole = (role) => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.role) === role;
  };
  const updateUser = async (updatedData) => {
    var _a;
    if (!user.value) return { success: false, error: "Usuario no autenticado" };
    try {
      const data = await $fetch("/api/users/profile", {
        method: "PATCH",
        body: {
          userId: user.value._id,
          ...updatedData
        }
      });
      if (data.success) {
        user.value = data.user;
        if (false) ;
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "Error al actualizar el perfil"
      };
    }
  };
  return {
    isLoggedIn: readonly(isLoggedIn),
    user: readonly(user),
    login,
    loginSimple,
    loginWithGoogle,
    logout,
    checkAuth,
    isAdmin,
    isUser,
    hasRole,
    updateUser
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-BCYmaoGs.mjs.map
