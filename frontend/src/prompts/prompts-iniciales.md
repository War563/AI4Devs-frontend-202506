# Prompts Iniciales - Ejercicio 11 Frontend

## Contexto del Ejercicio
Se solicitó crear una interfaz "position" para visualizar y gestionar candidatos de una posición específica mediante una interfaz tipo kanban que muestre candidatos como tarjetas en diferentes columnas representando las fases del proceso de contratación.

## Prompt Principal

### Prompt 1: Análisis del Proyecto
```
Analiza la estructura del proyecto frontend existente y identifica los componentes actuales. Necesito entender qué componentes ya existen, cómo está configurado el routing y qué dependencias están disponibles para crear una nueva página tipo kanban para gestión de candidatos.
```

### Prompt 2: Creación del Servicio API
```
Crea un servicio en JavaScript para comunicarse con la API del backend que incluya:

1. GET /positions/:id/interviewFlow - Para obtener el flujo de entrevistas
2. GET /positions/:id/candidates - Para obtener candidatos de una posición
3. PUT /candidates/:id/stage - Para actualizar la etapa del candidato

El servicio debe manejar errores apropiadamente y usar axios para las peticiones HTTP. Incluye documentación JSDoc para todas las funciones.
```

### Prompt 3: Componente Kanban Principal
```
Crea un componente React TypeScript llamado PositionKanban que:

1. Muestre el título de la posición con una flecha para volver al listado
2. Implemente una interfaz kanban con columnas para cada fase del proceso
3. Muestre tarjetas de candidatos con nombre y puntuación
4. Permita drag & drop para mover candidatos entre fases
5. Sea responsive (columnas verticales en móvil)
6. Incluya estados de carga y manejo de errores
7. Use React Hooks (useState, useEffect, useCallback)
8. Integre con el servicio API creado anteriormente

Tipos de datos a considerar:
- InterviewStep: id, name, orderIndex
- Candidate: fullName, currentInterviewStep, averageScore
- PositionData: positionName, interviewFlow con interviewSteps
```

### Prompt 4: Estilos CSS Responsive
```
Crea estilos CSS para el componente PositionKanban que incluyan:

1. Diseño kanban con columnas flexibles
2. Tarjetas de candidatos con hover effects
3. Indicadores visuales para drag & drop
4. Responsive design para móvil (columnas verticales)
5. Estilos para diferentes puntuaciones (colores)
6. Animaciones sutiles para mejorar UX
7. Estados de carga y feedback visual
```

### Prompt 5: Integración con Routing
```
Actualiza el routing de la aplicación para:

1. Añadir una nueva ruta /positions/:id que renderice PositionKanban
2. Importar el nuevo componente en App.js
3. Modificar el componente Positions para incluir enlaces que naveguen al kanban de cada posición
4. Asegurar que el botón "Ver proceso" redirija correctamente

Usar react-router-dom para la navegación.
```

## Prompts de Debugging y Optimización

### Prompt 6: Resolución de Errores
```
Al compilar el proyecto aparecen los siguientes errores:
- "react-scripts no se reconoce como comando interno"
- "Module not found: Error: Can't resolve 'axios'"
- Errores de TypeScript con tipos de retorno

Analiza y proporciona soluciones para cada error, documentando el proceso de resolución.
```

### Prompt 7: Mejoras de UX
```
Mejora la experiencia de usuario del kanban añadiendo:

1. Feedback visual durante el drag & drop
2. Confirmación de cambios exitosos
3. Mejor manejo de estados de error
4. Indicadores de carga específicos
5. Validaciones antes de actualizar etapas
```

## Requerimientos Técnicos Cumplidos

✅ **Interfaz Kanban**: Columnas por fase del proceso de contratación
✅ **Drag & Drop**: Funcionalidad para mover candidatos entre fases
✅ **Título de Posición**: Mostrado en la parte superior
✅ **Botón Volver**: Flecha para regresar al listado
✅ **Tarjetas de Candidatos**: Nombre y puntuación media
✅ **Responsive Design**: Columnas verticales en móvil
✅ **Integración API**: Servicios para comunicación con backend
✅ **Routing**: Navegación desde listado a kanban específico
✅ **Manejo de Estados**: Carga, error y datos
✅ **TypeScript**: Tipos definidos para mejor desarrollo

## Tecnologías Utilizadas

- **React 18.3.1** con TypeScript
- **React Router Dom 6.23.1** para navegación
- **React Bootstrap** para componentes UI
- **Axios** para peticiones HTTP
- **CSS custom** para estilos específicos del kanban
- **React Hooks** (useState, useEffect, useCallback)

## Estructura de Archivos Creados

```
src/
├── components/
│   ├── PositionKanban.tsx      # Componente principal del kanban
│   ├── PositionKanban.css      # Estilos específicos
│   └── Positions.tsx           # Actualizado con navegación
├── services/
│   └── positionService.js      # Servicio para API
└── prompts/
    └── prompts-iniciales.md    # Este archivo
```

## Consideraciones de Desarrollo

1. **Responsive First**: El diseño se adapta automáticamente a diferentes tamaños de pantalla
2. **Manejo de Errores**: Cada operación incluye try-catch y feedback al usuario
3. **Performance**: Uso de useCallback para evitar re-renders innecesarios
4. **Accesibilidad**: Elementos drag & drop con feedback visual apropiado
5. **Escalabilidad**: Estructura modular que permite fácil extensión

## Próximos Pasos

1. Integrar con backend real (actualmente usa mock data)
2. Añadir tests unitarios para los componentes
3. Implementar optimistic updates para mejor UX
4. Añadir funcionalidades adicionales como filtros y búsqueda
5. Mejorar animaciones y transiciones
