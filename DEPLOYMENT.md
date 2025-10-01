# 🚀 Guía de Despliegue en Netlify

Esta guía te ayudará a desplegar tu aplicación Nuxt 3 con MongoDB Atlas en Netlify.

## 📋 Requisitos Previos

- Cuenta en [Netlify](https://netlify.com)
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratis)
- Cuenta en [Google Cloud Console](https://console.cloud.google.com) (para OAuth)

---

## 🗄️ PASO 1: Configurar MongoDB Atlas

### 1.1 Crear Cuenta y Cluster

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita (si no tienes)
3. Crea un nuevo proyecto
4. Crea un cluster **M0 Sandbox** (gratis)
   - Proveedor: AWS / Google Cloud / Azure
   - Región: La más cercana a tus usuarios

### 1.2 Configurar Acceso a Base de Datos

1. **Database Access** (en el menú lateral):

   - Click en "Add New Database User"
   - Authentication Method: Password
   - Username: `helpdesk_user` (o el que prefieras)
   - Password: Genera una contraseña segura (guárdala)
   - Database User Privileges: `Read and write to any database`
   - Click "Add User"

2. **Network Access** (en el menú lateral):
   - Click en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - Esto es necesario para Netlify
   - Click "Confirm"

### 1.3 Obtener Connection String

1. Click en "Connect" en tu cluster
2. Selecciona "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copia el connection string:
   ```
   mongodb+srv://helpdesk_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANTE**:
   - Reemplaza `<password>` con la contraseña del usuario
   - Agrega el nombre de la base de datos: `helpdesk_db`
   - Resultado final:
   ```
   mongodb+srv://helpdesk_user:adPB6NgaDkhU2bcE@cluster0.3oiu2xe.mongodb.net/helpdesk_db?retryWrites=true&w=majority&appName=Cluster0
   ```

---

## 🔑 PASO 2: Configurar Google OAuth

### 2.1 Crear Proyecto en Google Cloud

1. Ve a https://console.cloud.google.com
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google OAuth

### 2.2 Configurar OAuth Consent Screen

1. En el menú lateral: **APIs & Services** > **OAuth consent screen**
2. User Type: **External**
3. Completa la información básica:
   - App name: "Sistema de HelpDesk"
   - User support email: tu email
   - Developer contact: tu email
4. Guarda y continúa

### 2.3 Crear Credenciales OAuth

1. **APIs & Services** > **Credentials**
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: **Web application**
4. Name: "HelpDesk Web Client"
5. **Authorized JavaScript origins**:
   - `https://darling-kashata-f7f258.netlify.app`
   - `https://tu-dominio-personalizado.com` (si tienes)
6. **Authorized redirect URIs**:
   - `https://darling-kashata-f7f258.netlify.app`
7. Click "Create"
8. **Guarda** el Client ID que aparece

---

id-cliente: 34711366814-82ch5e5uv93cm28qvns306r0f9rb9qgk.apps.googleusercontent.com
secreto de cliente: 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

## 🌐 PASO 3: Desplegar en Netlify

### 3.1 Conectar Repositorio

1. Ve a https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Conecta con tu proveedor Git (GitHub, GitLab, Bitbucket)
4. Selecciona tu repositorio

### 3.2 Configurar Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `.output/public`
- **Node version**: 20

### 3.3 Configurar Variables de Entorno

Ve a **Site settings** > **Environment variables** y agrega:

| Variable                       | Valor                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `MONGODB_URI`                  | `mongodb+srv://helpdesk_user:adPB6NgaDkhU2bcE@cluster0.3oiu2xe.mongodb.net/helpdesk_db?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET`                   | `43ddf76f8a8ca3a62f02a3c296014173a1d90467cfd5fffe716189e6da421dd26cf3267442b2e4fc9f2e69b01f9c8ce24e54af43acf33a0ecc8fe57e0022a427`   |
| `NUXT_SECRET_KEY`              | `c2f07a75a24e9e0d5a033e013ef3e0b59d747b7267ee23070ba0f76c7f09c845`                                                                   |
| `GOOGLE_CLIENT_ID`             | `34711366814-82ch5e5uv93cm28qvns306r0f9rb9qgk.apps.googleusercontent.com`                                                            |
| `GOOGLE_CLIENT_SECRET`         | `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`                                                                                                |
| `NUXT_PUBLIC_GOOGLE_CLIENT_ID` | `34711366814-82ch5e5uv93cm28qvns306r0f9rb9qgk.apps.googleusercontent.com`                                                            |
| `BCRYPT_SALT_ROUNDS`           | `12`                                                                                                                                 |

### 3.4 Deploy

1. Click "Deploy site"
2. Espera que termine el deploy (2-5 minutos)
3. Si falla, revisa los logs en **Deploys** > Click en el deploy fallido

---

## 👥 PASO 4: Inicializar Usuarios en MongoDB Atlas

### 4.1 Configurar .env Local

Crea un archivo `.env` en la raíz del proyecto con:

```env
MONGODB_URI=mongodb+srv://helpdesk_user:adPB6NgaDkhU2bcE@cluster0.3oiu2xe.mongodb.net/helpdesk_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=43ddf76f8a8ca3a62f02a3c296014173a1d90467cfd5fffe716189e6da421dd26cf3267442b2e4fc9f2e69b01f9c8ce24e54af43acf33a0ecc8fe57e0022a427
NUXT_SECRET_KEY=c2f07a75a24e9e0d5a033e013ef3e0b59d747b7267ee23070ba0f76c7f09c845
GOOGLE_CLIENT_ID=34711366814-82ch5e5uv93cm28qvns306r0f9rb9qgk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NUXT_PUBLIC_GOOGLE_CLIENT_ID=34711366814-82ch5e5uv93cm28qvns306r0f9rb9qgk.apps.googleusercontent.com
```

### 4.2 Ejecutar Script de Inicialización

Desde la terminal en la raíz del proyecto:

```bash
# Instalar dependencia dotenv si no la tienes
npm install dotenv

# Ejecutar script
node scripts/init-users.js
```

Esto creará dos usuarios:

**👨‍💼 Administrador:**

- Email: `admin@disenos.com`
- Password: `Admin123!`
- Acceso: Panel completo

**👤 Usuario Normal:**

- Email: `usuario@disenos.com`
- Password: `Usuario123!`
- Acceso: Sistema de tickets

---

## ✅ PASO 5: Verificar Deploy

1. Abre la URL de tu sitio en Netlify
2. Intenta hacer login con los usuarios creados
3. Intenta login con Google

### ❌ Solución de Problemas

#### Error 500 en Login

**Problema**: No se puede conectar a MongoDB

**Solución**:

- Verifica que `MONGODB_URI` esté correctamente configurado en Netlify
- Verifica que la IP 0.0.0.0/0 esté permitida en MongoDB Atlas
- Revisa los logs de Netlify: **Functions** > Click en la función

#### Error en Google OAuth

**Problema**: "redirect_uri_mismatch"

**Solución**:

- Verifica que la URL de Netlify esté en "Authorized redirect URIs" en Google Console
- Verifica que `GOOGLE_CLIENT_ID` y `NUXT_PUBLIC_GOOGLE_CLIENT_ID` sean iguales
- El dominio debe ser exactamente igual (con https://)

#### Variables de Entorno No Funcionan

**Solución**:

- Después de cambiar variables, haz **redeploy**
- Site settings > Deploys > Trigger deploy > Deploy site

---

## 📝 Checklist de Deploy

- [ ] MongoDB Atlas cluster creado
- [ ] Usuario de base de datos creado
- [ ] Network access configurado (0.0.0.0/0)
- [ ] Connection string obtenido
- [ ] Google OAuth configurado
- [ ] Dominio de Netlify agregado a Google Console
- [ ] Variables de entorno configuradas en Netlify
- [ ] Site desplegado en Netlify
- [ ] Usuarios iniciales creados con script
- [ ] Login con email/password funciona
- [ ] Login con Google funciona

---

## 🔄 Redeploy Después de Cambios

Cada vez que hagas cambios en el código:

```bash
git add .
git commit -m "descripción de cambios"
git push
```

Netlify detectará el push y redesplegará automáticamente.

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Netlify: **Functions** tab
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que MongoDB Atlas esté funcionando
4. Verifica la configuración de Google OAuth

---

## 🔗 Enlaces Útiles

- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Nuxt 3 Deployment](https://nuxt.com/docs/getting-started/deployment)
