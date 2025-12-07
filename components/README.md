# Core Optimized Components

This directory contains performance-optimized, accessible React components built for the website performance optimization project.

## Components

### Button
A versatile button component with multiple variants, sizes, and animations.

**Features:**
- 4 variants: primary, secondary, outline, ghost
- 3 sizes: sm, md, lg (all meet 44x44px minimum touch target)
- CSS-only hover animations: subtle, scale, shine
- Loading state with spinner
- Icon support (left/right positioning)
- Full keyboard accessibility with ARIA attributes

**Usage:**
```tsx
import { Button } from '@/components';

<Button variant="primary" size="md" animation="subtle">
  Click Me
</Button>

<Button variant="outline" loading icon={<Icon />} iconPosition="left">
  Loading...
</Button>
```

### Section
A wrapper component for page sections with scroll-triggered animations.

**Features:**
- Intersection Observer integration for performance
- Multiple animation types: fade-in, slide-up, slide-down, slide-left, slide-right, scale
- Configurable threshold and delay
- Respects `prefers-reduced-motion`
- Semantic HTML support (section, article, div, aside, main)

**Usage:**
```tsx
import { Section } from '@/components';

<Section
  id="services"
  animateOnScroll
  animationType="fade-in"
  animationDelay={200}
  threshold={0.1}
>
  <h2>Our Services</h2>
  {/* Content */}
</Section>
```

### SEO
Centralized SEO metadata management component.

**Features:**
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data support
- Canonical URLs
- Robots meta tag (noindex, nofollow)

**Usage:**
```tsx
import { SEO, generateOrganizationSchema } from '@/components';

<SEO
  title="Home | MakeYou"
  description="Professional web development services"
  ogImage="https://example.com/og-image.jpg"
  canonical="https://example.com"
  structuredData={generateOrganizationSchema({
    name: "MakeYou",
    url: "https://makeyou.online",
    logo: "https://makeyou.online/logo.png",
    description: "Professional web development services"
  })}
/>
```

### OptimizedImage
Wrapper around Next.js Image with sensible defaults and accessibility features.

**Features:**
- Automatic WebP/AVIF conversion
- Blur placeholder support
- Responsive sizes for different breakpoints
- Priority loading for above-the-fold images
- Alt text validation
- Predefined responsive size presets

**Usage:**
```tsx
import { OptimizedImage, responsiveSizes } from '@/components';

// Standard image
<OptimizedImage
  src="/hero.jpg"
  alt="Hero illustration"
  width={1200}
  height={675}
  priority
  sizes={responsiveSizes.hero}
/>

// Fill container
<OptimizedImage
  src="/background.jpg"
  alt="Background"
  fill
  objectFit="cover"
/>

// With aspect ratio
import { AspectRatioImage } from '@/components';

<AspectRatioImage
  src="/card.jpg"
  alt="Card image"
  aspectRatio={16/9}
/>
```

### ErrorBoundary
React error boundary for catching and handling errors gracefully.

**Features:**
- Custom fallback UI
- Error logging to console (and monitoring services)
- Recovery actions (try again, reload, go home)
- Development mode error details
- HOC wrapper for functional components

**Usage:**
```tsx
import { ErrorBoundary, withErrorBoundary } from '@/components';

// Wrap components
<ErrorBoundary
  onError={(error, errorInfo) => {
    console.error('Error:', error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>

// Or use HOC
const SafeComponent = withErrorBoundary(YourComponent, {
  errorMessage: "Failed to load component"
});
```

## Responsive Size Presets

The `OptimizedImage` component includes predefined responsive size presets:

- `full`: 100vw on all devices
- `hero`: Full width on mobile, constrained on desktop
- `content`: Full on mobile, half on tablet, third on desktop
- `thumbnail`: Small on all devices
- `card`: Full on mobile, half on tablet, 400px on desktop
- `avatar`: 80px on mobile, 120px on desktop

## Animation Classes

The following CSS animation classes are available (defined in globals.css):

- `animate-fade-in`: Fade in animation
- `animate-slide-up`: Slide up from bottom
- `animate-slide-down`: Slide down from top
- `animate-slide-left`: Slide in from right
- `animate-slide-right`: Slide in from left
- `animate-scale`: Scale up animation

All animations respect the `prefers-reduced-motion` media query.

## Accessibility

All components follow WCAG AA accessibility standards:

- Minimum 44x44px touch targets on mobile
- Proper ARIA attributes and roles
- Keyboard navigation support
- Focus indicators
- Screen reader support
- Color contrast compliance

## Performance

These components are optimized for performance:

- CSS-only animations (GPU-accelerated)
- Intersection Observer for scroll detection
- Lazy loading support
- Code splitting friendly
- Minimal JavaScript execution
- No layout shifts
