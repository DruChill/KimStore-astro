# Componente Card

Un componente de tarjeta estático para mostrar productos en KimYuna Store, basado en el diseño original de React pero adaptado para Astro.

## Características

- ✅ Diseño responsivo
- ✅ Soporte para iconos personalizados
- ✅ Integración con PayPal
- ✅ Transiciones suaves
- ✅ Indicador de seguridad
- ✅ Totalmente estático (no requiere JavaScript del lado del cliente)

## Uso

### Importación

```astro
---
import Card from '../components/Card.astro';
---
```

### Uso básico

```astro
<Card 
  name="Nombre del Producto"
  price={99}
  description="Descripción del producto..."
  ico="nombre-del-icono"
  id="product-id"
/>
```

### Ejemplo completo

```astro
---
import Card from '../components/Card.astro';

const product = {
  name: "Adobe Photoshop",
  price: 299,
  description: "Editor de imágenes profesional con IA integrada.",
  ico: "adobe",
  id: "photoshop"
};
---

<Card 
  name={product.name}
  price={product.price}
  description={product.description}
  ico={product.ico}
  id={product.id}
/>
```

## Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `name` | `string` | No | `"Herramienta Creativa"` | Nombre del producto |
| `price` | `number` | No | `99` | Precio del producto |
| `description` | `string` | No | `"Una herramienta poderosa..."` | Descripción del producto |
| `ico` | `string` | No | `"design-tool"` | Nombre del archivo de icono (sin extensión) |
| `id` | `string` | No | `"1"` | ID único del producto para enlaces |

## Estructura de archivos necesaria

Para que el componente funcione correctamente, necesitas los siguientes archivos en la carpeta `public/`:

```
public/
├── apple.svg          # Logo de Apple
├── [ico].svg         # Icono del producto (nombre basado en la prop 'ico')
└── cards/
    └── paypal.svg    # Logo de PayPal
```

## Estilos

El componente utiliza Tailwind CSS. Asegúrate de que esté configurado en tu proyecto.

### Clases principales:
- Tarjeta: `max-w-xs w-full p-6 bg-white rounded-lg shadow border`
- Botón: `bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full`
- Layout: `flex flex-col justify-between space-y-4`

## Personalización

### Cambiar colores del botón
```astro
<!-- En el componente Card.astro, modifica la clase del botón -->
<button class="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition">
  Comprar
</button>
```

### Agregar nuevos iconos
1. Coloca el archivo SVG en `/public/`
2. Usa el nombre del archivo (sin extensión) en la prop `ico`

### Modificar el enlace de compra
El componente genera enlaces del tipo `/tool/{id}`. Para cambiar esto, modifica la línea:
```astro
<a href={`/producto/${id}`}>
```

## Ejemplos de uso

### Grid de productos
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <Card 
      name={product.name}
      price={product.price}
      description={product.description}
      ico={product.ico}
      id={product.id}
    />
  ))}
</div>
```

### Tarjeta destacada
```astro
<div class="flex justify-center">
  <Card 
    name="Producto Destacado"
    price={199}
    description="Este es nuestro producto más popular..."
    ico="featured"
    id="featured-product"
  />
</div>
```

## Notas técnicas

- El componente es completamente estático y no requiere JavaScript
- Los iconos SVG se cargan como imágenes estáticas
- El enlace de PayPal es solo visual (no funcional en esta versión)
- El botón de compra redirige a `/tool/{id}`

## Próximas mejoras

- [ ] Soporte para múltiples métodos de pago
- [ ] Animaciones CSS avanzadas
- [ ] Modo oscuro
- [ ] Variantes de tamaño (pequeña, mediana, grande)
- [ ] Soporte para badges o etiquetas