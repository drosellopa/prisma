# Estrategia — Landing Prisma

Centro Integrado de Formación de la Familia Sociosanitaria.

## 1. Estrategia

**Público objetivo:** profesionales sociosanitarios en activo, futuros alumnos y empresas/instituciones (residencias, centros de día). Son tres segmentos con motivaciones distintas, así que la landing debe permitir a cada uno identificarse rápido sin tener que leer todo el contenido.

**Objetivo principal:** notoriedad institucional. La landing no está pensada como embudo de matrícula agresivo, sino como carta de presentación sólida de Prisma: quién es, qué oferta formativa tiene y por qué es una referencia en el sector. El contacto/formulario es un CTA secundario, no el centro de la página.

**Tono:** institucional y formal. Lenguaje riguroso, profesional, con vocabulario técnico del ámbito sociosanitario cuando aporte credibilidad, pero siempre claro y sin jerga innecesaria. Se evitan coloquialismos y un tono excesivamente comercial ("¡apúntate ya!"); en su lugar, verbos como "conoce", "descubre", "consulta nuestra oferta formativa".

**Propuesta de valor (a validar con el cliente):** formación especializada e integrada en el ámbito sociosanitario, con trayectoria, rigor académico y vínculo real con el sector asistencial.

## 2. Arquitectura de la información

1. **Header/Navegación** — logo, menú (Quiénes somos · Formación · Instalaciones · Actualidad · Contacto), CTA secundario "Contacta con nosotros".
2. **Hero** — propuesta de valor institucional en una frase, imagen representativa del entorno sociosanitario, CTA principal ("Descubre nuestra oferta formativa").
3. **Quiénes somos** — misión, visión, valores, trayectoria/acreditaciones.
4. **Oferta formativa** — categorías de programas organizadas por segmento (formación para profesionales / itinerarios para nuevos alumnos / formación in-company para instituciones).
5. **Por qué Prisma** — diferenciales: metodología, equipo docente, certificaciones, convenios con centros asistenciales.
6. **Segmentos** — bloque que adapta el mensaje a cada audiencia (profesionales / futuros alumnos / instituciones), cada uno con su propio enlace de profundización.
7. **Cifras y confianza** — años de trayectoria, egresados, instituciones colaboradoras (trust signals, sin necesidad de testimonios individuales si no hay aún).
8. **Testimonios / casos de éxito** (si hay material disponible).
9. **Actualidad** (opcional, refuerza SEO y notoriedad — noticias, jornadas, colaboraciones).
10. **Contacto** — formulario institucional breve + datos de contacto + ubicación.
11. **Footer** — enlaces legales, redes sociales, mapa del sitio.

## 3. UX / Diseño

- **Mobile first**, con jerarquía visual clara y mucho aire entre secciones — coherente con un tono institucional, no recargado.
- **Accesibilidad WCAG AA**: contraste de color suficiente, tamaños de fuente legibles, navegación por teclado, textos alternativos descriptivos, estructura semántica de encabezados (un único `h1`, jerarquía `h2`/`h3` consistente).
- **Paleta sugerida** (a falta de manual de marca): tonos institucionales y de confianza — azul o azul-verdoso principal (salud, seriedad), gris neutro para texto y fondos, un color de acento cálido y discreto para CTAs. Evitar paletas muy saturadas o infantiles.
- **Tipografía sugerida**: sans-serif de alta legibilidad (ej. Source Sans 3, Inter o similar libre), con buena distinción de pesos para jerarquía sin depender solo del color.
- **Imágenes**: fotografía real del entorno sociosanitario/formativo si es posible; evitar stock genérico poco creíble.
- **Componentes reutilizables (BEM)**: `header`, `hero`, `section-title`, `card` (curso / cifra / testimonio), `cta-button`, `segment-tabs`, `footer`.
- **SEO**: metadatos por sección, `schema.org` tipo `EducationalOrganization`, URLs limpias, alt text descriptivo, contenido indexable (no depender de JS para el contenido principal).

## Pendiente de validar contigo

- Propuesta de valor definitiva (una frase clara que resuma "por qué Prisma").
- Si hay logo/manual de marca real antes de fijar paleta y tipografía definitivas.
- Si hay contenido real disponible (cifras, testimonios, programas formativos) o se trabaja con contenido provisional.
- Prioridad entre las 3 audiencias si hay que decidir jerarquía visual en el hero.
