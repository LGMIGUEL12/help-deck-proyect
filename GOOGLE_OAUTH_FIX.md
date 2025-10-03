# Solución al Error 403 de Google OAuth

## Error que estás viendo:
```
[GSI_LOGGER]: The given origin is not allowed for the given client ID.
Failed to load resource: the server responded with a status of 403
```

## Causa:
El dominio `localhost:3001` (o `localhost:3000`) no está autorizado en tu configuración de Google Cloud para el Client ID que estás usando.

## Solución - Configurar Google Cloud Console:

### Paso 1: Acceder a Google Cloud Console
1. Ve a: https://console.cloud.google.com/apis/credentials
2. Inicia sesión con tu cuenta de Google
3. Selecciona el proyecto que contiene tu aplicación

### Paso 2: Editar las credenciales OAuth 2.0
1. En la página de **Credenciales**, busca tu **ID de cliente de OAuth 2.0**
2. Haz clic en el nombre de tu credencial (algo como "Web client 1")
3. Se abrirá la página de edición

### Paso 3: Agregar Orígenes Autorizados
En la sección **"Orígenes de JavaScript autorizados"**, agrega:

```
http://localhost:3000
http://localhost:3001
http://127.0.0.1:3000
http://127.0.0.1:3001
```

**IMPORTANTE:**
- ❌ NO agregues una barra diagonal `/` al final
- ✅ Usa `http://` (no `https://`) para localhost
- ✅ Agrega tanto `localhost` como `127.0.0.1`
- ✅ Agrega ambos puertos (3000 y 3001) por si el puerto cambia

### Paso 4: Agregar URIs de Redirección (Opcional pero recomendado)
En la sección **"URIs de redirección autorizados"**, agrega:

```
http://localhost:3000/auth/callback
http://localhost:3001/auth/callback
http://127.0.0.1:3000/auth/callback
http://127.0.0.1:3001/auth/callback
```

### Paso 5: Guardar cambios
1. Haz clic en **"GUARDAR"** en la parte inferior
2. Espera unos segundos (puede tardar hasta 5 minutos en propagarse)

### Paso 6: Limpiar caché y probar
1. Cierra todas las pestañas de tu aplicación
2. Limpia la caché del navegador (Ctrl + Shift + Delete)
3. Reinicia el servidor de desarrollo:
   ```bash
   # Detén el servidor (Ctrl + C)
   npm run dev
   ```
4. Abre la aplicación en una ventana de incógnito
5. Prueba el login/signup con Google

## Verificación rápida:

Tu Client ID actual es:
```
34711366814-82ch5e5uv93cm28qvns306r0f9rb9qgk.apps.googleusercontent.com
```

### Checklist de verificación:
- [ ] He agregado `http://localhost:3000` a los orígenes autorizados
- [ ] He agregado `http://localhost:3001` a los orígenes autorizados
- [ ] He guardado los cambios en Google Cloud Console
- [ ] He esperado al menos 1-2 minutos
- [ ] He limpiado la caché del navegador
- [ ] He reiniciado el servidor

## Si el problema persiste:

### Opción 1: Crear nuevas credenciales
Si sigues teniendo problemas, crea nuevas credenciales OAuth 2.0:

1. Ve a: https://console.cloud.google.com/apis/credentials
2. Haz clic en **"+ CREAR CREDENCIALES"**
3. Selecciona **"ID de cliente de OAuth 2.0"**
4. Tipo de aplicación: **"Aplicación web"**
5. Nombre: "Help Desk - Development"
6. Agrega los orígenes JavaScript autorizados (ver arriba)
7. Copia el nuevo Client ID y Client Secret
8. Actualiza el archivo `.env`:

```env
GOOGLE_CLIENT_ID=TU_NUEVO_CLIENT_ID
GOOGLE_CLIENT_SECRET=TU_NUEVO_CLIENT_SECRET
NUXT_PUBLIC_GOOGLE_CLIENT_ID=TU_NUEVO_CLIENT_ID
```

### Opción 2: Verificar la pantalla de consentimiento OAuth
1. Ve a: https://console.cloud.google.com/apis/credentials/consent
2. Asegúrate de que el estado sea **"En producción"** o **"Prueba"**
3. Si está en modo "Prueba", agrega tu email a la lista de usuarios de prueba

## Para producción (cuando despliegues):

Cuando despliegues tu aplicación a producción, recuerda agregar también:
```
https://tu-dominio.com
https://www.tu-dominio.com
```

## Recursos adicionales:
- Documentación oficial: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
- Consola de Google Cloud: https://console.cloud.google.com/
- Tutorial completo: https://support.google.com/cloud/answer/6158849

---

## ⚠️ Nota de Seguridad:
Nunca compartas tu `GOOGLE_CLIENT_SECRET` públicamente. El Client ID es público, pero el Client Secret debe mantenerse privado.
