import { Ticket } from '../models/Ticket.js'
import { User } from '../models/User.js'
import { connectDB } from './database.js'

const ticketTemplates = [
  {
    title: 'Problema con el inicio de sesión',
    description: 'No puedo acceder a mi cuenta, el sistema me indica que mi contraseña es incorrecta pero estoy seguro de que es la correcta.',
    category: 'Acceso'
  },
  {
    title: 'Error al cargar el dashboard',
    description: 'Cuando intento acceder al dashboard principal, la página se queda cargando indefinidamente y no muestra ningún contenido.',
    category: 'Sistema'
  },
  {
    title: 'Solicitud de permisos adicionales',
    description: 'Necesito permisos de administrador para poder gestionar los usuarios de mi departamento.',
    category: 'Permisos'
  },
  {
    title: 'Falla en la generación de reportes',
    description: 'Los reportes mensuales no se están generando correctamente. Los datos aparecen incompletos y con errores de formato.',
    category: 'Reportes'
  },
  {
    title: 'Actualización de información de perfil',
    description: 'No puedo actualizar mi foto de perfil. El sistema me muestra un error cuando intento subir la imagen.',
    category: 'Perfil'
  },
  {
    title: 'Problema de rendimiento en la aplicación',
    description: 'La aplicación está muy lenta, tarda mucho en cargar las páginas y a veces se congela.',
    category: 'Rendimiento'
  },
  {
    title: 'Error al exportar datos',
    description: 'Al intentar exportar los datos a Excel, el archivo descargado está vacío o corrupto.',
    category: 'Exportación'
  },
  {
    title: 'Notificaciones no funcionan',
    description: 'No estoy recibiendo las notificaciones por email que debería recibir cuando hay actualizaciones importantes.',
    category: 'Notificaciones'
  },
  {
    title: 'Solicitud de nueva funcionalidad',
    description: 'Sería muy útil poder filtrar los tickets por múltiples criterios a la vez en lugar de uno solo.',
    category: 'Mejora'
  },
  {
    title: 'Error 404 en sección de usuarios',
    description: 'Al hacer clic en la sección de usuarios me aparece un error 404 y no puedo acceder.',
    category: 'Error'
  },
  {
    title: 'Problema con la búsqueda',
    description: 'La función de búsqueda no encuentra resultados aunque sé que los datos existen en el sistema.',
    category: 'Búsqueda'
  },
  {
    title: 'Sesión se cierra automáticamente',
    description: 'Mi sesión se cierra de manera inesperada cada 10-15 minutos, tengo que volver a iniciar sesión constantemente.',
    category: 'Sesión'
  },
  {
    title: 'Integración con Google Calendar',
    description: 'La integración con Google Calendar dejó de funcionar, los eventos no se sincronizan.',
    category: 'Integración'
  },
  {
    title: 'Cambio de contraseña no funciona',
    description: 'Intento cambiar mi contraseña pero el sistema me dice que el enlace ha expirado incluso cuando acabo de recibirlo.',
    category: 'Seguridad'
  },
  {
    title: 'Datos duplicados en la base de datos',
    description: 'Estoy viendo registros duplicados en los reportes, parece que hay un problema con la inserción de datos.',
    category: 'Base de Datos'
  }
]

const priorities = ['low', 'medium', 'high', 'urgent']
const statuses = ['open', 'in_progress', 'resolved', 'closed']

// Función para generar una fecha aleatoria en los últimos 60 días
function randomDate(daysAgo) {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  date.setHours(Math.floor(Math.random() * 24))
  date.setMinutes(Math.floor(Math.random() * 60))
  return date
}

// Función para generar fecha de resolución/cierre
function generateClosedDate(createdDate, status) {
  if (status === 'open') return null

  const created = new Date(createdDate)
  const daysToResolve = Math.floor(Math.random() * 10) + 1 // 1-10 días
  const resolvedDate = new Date(created)
  resolvedDate.setDate(created.getDate() + daysToResolve)
  resolvedDate.setHours(Math.floor(Math.random() * 24))
  resolvedDate.setMinutes(Math.floor(Math.random() * 60))

  return resolvedDate
}

export async function seedTickets() {
  try {
    await connectDB()

    console.log('🌱 Iniciando seed de tickets...')

    // Obtener todos los usuarios
    const users = await User.find()

    if (users.length === 0) {
      console.log('❌ No hay usuarios en la base de datos. Crea usuarios primero.')
      return
    }

    console.log(`✅ Encontrados ${users.length} usuarios`)

    // Limpiar tickets existentes (opcional - comenta si no quieres borrar)
    // await Ticket.deleteMany({})
    // console.log('🗑️  Tickets anteriores eliminados')

    const ticketsToCreate = []

    // Crear tickets variados
    for (let i = 0; i < ticketTemplates.length; i++) {
      const template = ticketTemplates[i]

      // Asignar usuario aleatorio
      const randomUser = users[Math.floor(Math.random() * users.length)]

      // Asignar prioridad aleatoria
      const priority = priorities[Math.floor(Math.random() * priorities.length)]

      // Asignar estado aleatorio
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      // Generar fecha de creación aleatoria (últimos 60 días)
      const createdAt = randomDate(60)

      // Generar fechas de resolución/cierre si aplica
      let resolvedAt = null
      let closedAt = null

      if (status === 'resolved' || status === 'closed') {
        resolvedAt = generateClosedDate(createdAt, status)
        if (status === 'closed') {
          closedAt = new Date(resolvedAt)
          closedAt.setHours(resolvedAt.getHours() + Math.floor(Math.random() * 48)) // Cerrado 0-48h después
        }
      }

      const ticket = {
        title: template.title,
        description: template.description,
        category: template.category,
        priority,
        status,
        createdBy: randomUser._id,
        createdAt,
        updatedAt: resolvedAt || closedAt || createdAt,
        resolvedAt,
        closedAt
      }

      ticketsToCreate.push(ticket)
    }

    // Insertar todos los tickets
    const createdTickets = await Ticket.insertMany(ticketsToCreate)

    console.log(`✅ ${createdTickets.length} tickets creados exitosamente`)

    // Mostrar resumen
    const summary = {
      total: createdTickets.length,
      byStatus: {},
      byPriority: {}
    }

    createdTickets.forEach(ticket => {
      summary.byStatus[ticket.status] = (summary.byStatus[ticket.status] || 0) + 1
      summary.byPriority[ticket.priority] = (summary.byPriority[ticket.priority] || 0) + 1
    })

    console.log('\n📊 Resumen de tickets creados:')
    console.log('Por estado:', summary.byStatus)
    console.log('Por prioridad:', summary.byPriority)

    return {
      success: true,
      count: createdTickets.length,
      summary
    }

  } catch (error) {
    console.error('❌ Error al crear tickets:', error)
    throw error
  }
}

// Si se ejecuta directamente
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedTickets()
    .then(() => {
      console.log('✅ Seed completado')
      process.exit(0)
    })
    .catch(error => {
      console.error('❌ Error en seed:', error)
      process.exit(1)
    })
}
