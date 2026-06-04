export const catalogSubNavItems = [
  'Empresas',
  'Catálogo',
  'Marcas',
  'Proveedores',
  'Inventario',
  'Ventas',
  'Reportes',
  'IA BX7',
] as const

export const catalogCategories = [
  {
    id: 'rines',
    name: 'Rines',
    description: 'Rines de alto rendimiento',
    count: '1,248 productos',
    image: '/catalog/categories/rines.png',
    icon: 'disc' as const,
  },
  {
    id: 'suspension',
    name: 'Suspensión',
    description: 'Sistemas y componentes',
    count: '2,156 productos',
    image: '/catalog/categories/suspension.png',
    icon: 'layers' as const,
  },
  {
    id: 'iluminacion',
    name: 'Iluminación',
    description: 'Luces y sistemas LED',
    count: '856 productos',
    image: '/catalog/categories/iluminacion.png',
    icon: 'light' as const,
  },
  {
    id: 'espaciadores',
    name: 'Espaciadores',
    description: 'Separadores de rueda',
    count: '342 productos',
    image: '/catalog/categories/espaciadores.png',
    icon: 'spacer' as const,
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Accesorios y adicionales',
    count: '1,987 productos',
    image: '/catalog/categories/accesorios.png',
    icon: 'box' as const,
  },
  {
    id: 'herramientas',
    name: 'Herramientas',
    description: 'Herramientas especializadas',
    count: '523 productos',
    image: '/catalog/categories/herramientas.png',
    icon: 'wrench' as const,
  },
] as const

export const catalogFeaturedBrands = [
  { id: 'bx7', name: 'BX7', category: 'Rines y accesorios', count: '1,248 productos', logoType: 'bx7' as const },
  { id: 'teix', name: 'TEIX', category: 'Accesorios premium', count: '542 productos', logoType: 'teix' as const },
  { id: 'fox', name: 'FOX', category: 'Suspensión y amortiguadores', count: '362 productos', logoType: 'fox' as const },
  { id: 'dobinsons', name: 'Dobinsons', category: 'Suspensión off-road', count: '218 productos', logoType: 'dobinsons' as const },
  { id: 'kc-hilites', name: 'KC Hilites', category: 'Iluminación LED', count: '891 productos', logoType: 'kc' as const },
  { id: 'eibach', name: 'Eibach', category: 'Resortes y espaciadores', count: '224 productos', logoType: 'eibach' as const },
] as const

export const catalogPopularProducts = [
  {
    id: '1',
    name: 'BX7 Forge Beadlock 17x9 - Negro',
    category: 'Rines',
    sku: 'BX7-FB17-BK',
    price: 6420,
    stock: 15,
    image: '/930.jpg',
  },
  {
    id: '2',
    name: 'FOX 2.5 DSC Reservoir - F150',
    category: 'Suspensión',
    sku: 'FOX-25DSC-F150',
    price: 18950,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08f3?w=520&h=360&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'KC HiLiTES Pro6 - 50" LED',
    category: 'Iluminación',
    sku: 'KC-P6-50-BLK',
    price: 12400,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=520&h=360&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Dobinsons MRR 4" Lift Kit - Tacoma',
    category: 'Suspensión',
    sku: 'DOB-MRR-TACO',
    price: 24800,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=520&h=360&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'TEIX Carbon Fiber Tailgate - F150',
    category: 'Accesorios',
    sku: 'TEIX-CF-TG-F150',
    price: 8900,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=520&h=360&fit=crop&q=80',
  },
  {
    id: '6',
    name: 'Eibach Pro-Spacer 25mm - 6x139.7',
    category: 'Espaciadores',
    sku: 'EIB-PS-25-6x139',
    price: 3280,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=520&h=360&fit=crop&q=80',
  },
] as const

export const catalogFooterStats = [
  { id: 'products', value: '+10,000', label: 'Productos disponibles', icon: 'package' as const },
  { id: 'brands', value: '50+', label: 'Marcas líderes', icon: 'star' as const },
  { id: 'categories', value: '6', label: 'Categorías principales', icon: 'grid' as const },
  { id: 'shipping', value: 'Envíos', label: 'A todo México', icon: 'truck' as const },
  { id: 'support', value: 'Soporte experto', label: 'Asesoría personalizada', icon: 'headphones' as const },
] as const

export const catalogCategoryFilterOptions = ['Todas las categorías', 'Rines', 'Suspensión', 'Iluminación', 'Espaciadores', 'Accesorios', 'Herramientas'] as const

export const catalogBrandFilterOptions = [
  'Todas las marcas',
  'BX7',
  'TEIX',
  'FOX',
  'Dobinsons',
  'KC Hilites',
  'Eibach',
] as const
