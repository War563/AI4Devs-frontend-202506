# 🧪 Instrucciones para Probar la Aplicación Kanban

## 🚀 Cómo Probar la Funcionalidad

### 1. Iniciar la Aplicación
La aplicación ya debería estar ejecutándose en `http://localhost:3000`

Si no está ejecutándose, ejecuta:
```bash
cd frontend
npm start
```

### 2. Navegación a la Interfaz Kanban

#### Opción A: Desde el Listado de Posiciones
1. Navega a `http://localhost:3000/positions`
2. Verás el listado de posiciones mock
3. Haz clic en **"Ver proceso"** en cualquier posición
4. Serás redirigido al kanban de esa posición

#### Opción B: Navegación Directa
Accede directamente a una de estas URLs:
- `http://localhost:3000/positions/1` - Senior Backend Engineer
- `http://localhost:3000/positions/2` - Junior Android Engineer  
- `http://localhost:3000/positions/3` - Product Manager

### 3. Funcionalidades a Probar

#### ✅ Visualización del Kanban
- [x] **Título de la posición** se muestra correctamente
- [x] **Botón "Volver"** con flecha está presente
- [x] **4 columnas de fases** están visibles:
  - Initial Screening
  - Technical Interview
  - Manager Interview
  - Final Interview
- [x] **Contador de candidatos** por columna
- [x] **6 candidatos de prueba** distribuidos en las columnas

#### ✅ Tarjetas de Candidatos
- [x] **Nombre completo** del candidato
- [x] **Puntuación media** con código de colores:
  - 🔴 Rojo: 0-2 puntos
  - 🟡 Amarillo: 2-3 puntos  
  - 🟢 Verde: 3+ puntos
  - ⚪ Gris: Sin puntuación (0)

#### ✅ Funcionalidad Drag & Drop
1. **Arrastra un candidato** desde una columna
2. **Suéltalo en otra columna**
3. **Verifica que se mueve** correctamente
4. **Observa el feedback visual** durante el arrastre
5. **Revisa la consola** para ver los logs de actualización

#### ✅ Diseño Responsive
1. **Redimensiona la ventana** del navegador
2. **Prueba en modo móvil** (F12 → Device Mode)
3. **Verifica que las columnas se apilan** verticalmente en móvil

#### ✅ Estados de Carga
- [x] **Spinner de carga** al cargar la página
- [x] **Simulación de latencia** de red (500ms + 300ms)

#### ✅ Navegación
- [x] **Botón "Volver"** regresa a `/positions`
- [x] **URLs dinámicas** funcionan correctamente

## 📱 Pruebas Específicas de Responsividad

### Desktop (> 992px)
- 4 columnas lado a lado
- Tarjetas compactas

### Tablet (768px - 992px)  
- 2 columnas por fila
- Redistribución automática

### Móvil (< 768px)
- 1 columna por fila
- Stack vertical completo
- Botones de tamaño completo

## 🔍 Datos de Prueba Incluidos

### Candidatos Mock:
1. **Jane Smith** - Technical Interview (4.2⭐)
2. **Carlos García** - Initial Screening (Sin puntuación)
3. **John Doe** - Manager Interview (4.8⭐)
4. **Ana Rodriguez** - Initial Screening (3.5⭐)
5. **Michael Johnson** - Final Interview (4.6⭐)
6. **Sophie Chen** - Technical Interview (4.1⭐)

### Posiciones Mock:
1. **Senior Backend Engineer** (ID: 1)
2. **Junior Android Engineer** (ID: 2)  
3. **Product Manager** (ID: 3)

## 🐛 Debugging y Logs

### Consola del Navegador
Abre las DevTools (F12) para ver:
- ✅ Logs de carga de datos
- ✅ Logs de drag & drop
- ✅ Mensajes de actualización de candidatos
- ❌ Errores (no debería haber ninguno)

### Network Tab
- ✅ No hay peticiones HTTP reales (usando mock data)
- ✅ Tiempos de respuesta simulados

## ⚠️ Limitaciones de la Versión de Prueba

1. **Sin Backend Real**: Usa datos simulados en memoria
2. **Persistencia Temporal**: Los cambios no se guardan al recargar
3. **Mock Data**: Candidatos fijos para todas las posiciones

## ✅ Checklist de Funcionalidades

- [ ] La aplicación carga sin errores
- [ ] El kanban muestra las 4 columnas
- [ ] Los candidatos aparecen en sus respectivas columnas  
- [ ] El drag & drop funciona entre columnas
- [ ] El diseño es responsive en móvil
- [ ] El botón volver funciona
- [ ] Los colores de puntuación son correctos
- [ ] No hay errores en la consola

## 🎯 Resultado Esperado

Si todas las funcionalidades trabajan correctamente, tendrás:
- ✅ Una interfaz kanban completamente funcional
- ✅ Drag & drop fluido entre columnas
- ✅ Diseño responsive que se adapta a cualquier pantalla
- ✅ Navegación intuitiva
- ✅ Feedback visual apropiado

¡La aplicación está lista para integración con el backend real! 🚀
