# First Rank India - Tailwind CSS Style Guide

## Overview
This project uses **Tailwind CSS** for styling. All custom colors, spacing, typography, and utilities are defined in `tailwind.config.js` and `index.css`.

---

## Color System

### Primary Brand Colors
| Class | Color | Use Case |
|-------|-------|----------|
| `bg-primary-saffron` | #FF9933 | Primary CTA, important elements |
| `bg-primary-white` | #FFFFFF | Background, cards |
| `bg-primary-dark` | #1A1A1A | Text, dark backgrounds |

### Saffron Scale (Orange - Primary Brand)
```
saffron-50: #FFF8F0    (Very light)
saffron-100: #FFE4CC
saffron-200: #FFD9B3
saffron-300: #FFB266   (Light)
saffron-400: #FF9933   (PRIMARY)
saffron-500: #E68A2D
saffron-600: #CC7A26
saffron-700: #B36B20
saffron-800: #995C19
saffron-900: #804D13   (Very dark)
```

**Usage:**
```jsx
// Button
<button className="bg-saffron-400 text-white rounded-base px-md py-sm hover:bg-saffron-500">
  Click Me
</button>

// Text
<h1 className="text-saffron-500">Important Heading</h1>
```

### Semantic Colors

#### Success (Emerald)
```
emerald-400: #4FB7A0  (PRIMARY - Use for success states)
```
```jsx
<div className="bg-emerald-100 text-emerald-700 rounded-base p-md">
  ✓ Operation successful
</div>
```

#### Info (Sky)
```
sky-400: #4FC3F7  (PRIMARY - Use for info/alerts)
```
```jsx
<div className="bg-sky-100 text-sky-700 rounded-base p-md">
  ℹ Important information
</div>
```

#### Error (Rose)
```
rose-400: #F06292  (PRIMARY - Use for errors)
```
```jsx
<div className="bg-rose-100 text-rose-700 rounded-base p-md">
  ✗ Error occurred
</div>
```

#### Warning (Amber)
```
amber-400: #FFB74D  (PRIMARY - Use for warnings)
```
```jsx
<div className="bg-amber-100 text-amber-700 rounded-base p-md">
  ⚠ Warning notice
</div>
```

### Text Colors
| Variable | Color | Use Case |
|----------|-------|----------|
| `text-text-primary` | #1A1A1A | Main text, headings |
| `text-text-secondary` | #4A4A4A | Body text, descriptions |
| `text-text-tertiary` | #808080 | Secondary info, hints |
| `text-text-disabled` | #CCCCCC | Disabled states |
| `text-text-inverse` | #FFFFFF | Text on dark backgrounds |

```jsx
<h1 className="text-text-primary text-h1">Heading</h1>
<p className="text-text-secondary text-base">Body text</p>
<small className="text-text-tertiary text-xs">Helper text</small>
```

### Background Colors
| Class | Color | Use Case |
|-------|-------|----------|
| `bg-white` | #FFFFFF | Default backgrounds |
| `bg-bg-light` | #F5F5F5 | Light sections |
| `bg-bg-lighter` | #FAFAFA | Even lighter backgrounds |
| `bg-neutral-50` to `neutral-900` | Grays | Neutral backgrounds |

---

## Typography

### Heading Scales
All heading classes include font-weight and line-height:

```jsx
<h1 className="text-h1">48px - Bold Heading</h1>     {/* 800 weight */}
<h2 className="text-h2">40px - Large Heading</h2>     {/* 700 weight */}
<h3 className="text-h3">32px - Section Title</h3>     {/* 700 weight */}
<h4 className="text-h4">24px - Subsection</h4>        {/* 600 weight */}
<h5 className="text-h5">20px - Minor Heading</h5>     {/* 600 weight */}
<h6 className="text-h6">16px - Small Heading</h6>     {/* 600 weight */}
```

### Body Text
| Class | Size | Weight | Line Height |
|-------|------|--------|-------------|
| `text-xs` | 12px | 400 | 1.5 |
| `text-sm` | 14px | 400 | 1.5 |
| `text-base` | 16px | 400 | 1.5 |
| `text-lg` | 18px | 400 | 1.6 |
| `text-xl` | 20px | 500 | 1.6 |
| `text-2xl` | 24px | 500 | 1.3 |

```jsx
<p className="text-base text-text-secondary">Regular paragraph</p>
<small className="text-sm text-text-tertiary">Small text</small>
<span className="text-lg font-semibold">Large emphasis</span>
```

### Font Families
```jsx
{/* Poppins - Used by default */}
<div className="font-poppins">Uses Poppins font</div>

{/* Inter - Alternative */}
<div className="font-inter">Uses Inter font</div>
```

---

## Spacing System

All spacing values are pre-defined for consistency:

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
4xl: 80px
5xl: 96px
```

**Usage:**
```jsx
<div className="p-md">Padding 16px on all sides</div>
<div className="px-lg py-md">Horizontal 24px, Vertical 16px</div>
<div className="mb-lg">Margin bottom 24px</div>
<div className="space-y-md">Children spaced 16px vertically</div>
```

---

## Border Radius

```
rounded-none: 0px
rounded-sm:   4px
rounded-base: 8px
rounded-md:   12px
rounded-lg:   16px
rounded-xl:   20px
rounded-2xl:  24px
rounded-full: 9999px
```

**Usage:**
```jsx
<div className="rounded-base">Standard border radius</div>
<div className="rounded-lg">Larger corners</div>
<button className="rounded-full">Pill-shaped button</button>
```

---

## Shadows

### Light Shadows (Default)
```jsx
<div className="shadow-soft">Minimal shadow, hover states</div>
<div className="shadow-base">Standard shadow, cards</div>
<div className="shadow-md">Medium shadow, elevated content</div>
<div className="shadow-lg">Large shadow, modals</div>
<div className="shadow-xl">Extra large shadow, top-level</div>
```

### Brand-Colored Shadows
```jsx
{/* Saffron shadows - for primary elements */}
<div className="shadow-saffron">Light saffron glow</div>
<div className="shadow-saffron-lg">Strong saffron glow</div>

{/* Dark shadows - for emphasized text/dark elements */}
<div className="shadow-dark">Light dark shadow</div>
<div className="shadow-dark-lg">Strong dark shadow</div>
```

---

## Transitions & Animations

### Transition Duration
```jsx
{/* Default: 300ms normal duration */}
<button className="transition duration-normal hover:bg-saffron-500">
  Smooth hover
</button>

{/* Fast transitions: 150ms */}
<div className="transition-all duration-fast">Quick change</div>

{/* Slow transitions: 500ms */}
<div className="transition duration-slow">Slow animation</div>
```

### Predefined Animations
```jsx
{/* Fade in from bottom */}
<div className="animate-fadeIn">Content appears smoothly</div>

{/* Slide in from left */}
<div className="animate-slideInLeft">Slides in from left</div>

{/* Slide in from right */}
<div className="animate-slideInRight">Slides in from right</div>

{/* Scale from small */}
<div className="animate-scaleIn">Grows into view</div>

{/* Pulsing effect */}
<div className="animate-pulse">Breathing pulse</div>

{/* Shimmer effect */}
<div className="animate-shimmer bg-gradient-to-r from-neutral-200">Loading state</div>
```

---

## Gradients

### Background Gradients
```jsx
{/* Saffron gradient - Primary */}
<div className="bg-gradient-saffron text-white p-lg">
  Primary gradient background
</div>

{/* Saffron fade to white */}
<div className="bg-gradient-saffron-fade p-lg">
  Fades to white
</div>

{/* Light saffron card gradient */}
<div className="bg-gradient-saffron-card p-lg">
  Soft card background
</div>

{/* Rank/badge gradient */}
<div className="bg-gradient-saffron-rank text-white p-lg">
  Rank badge style
</div>
```

---

## Common Component Patterns

### Button
```jsx
{/* Primary Button */}
<button className="
  bg-saffron-400 text-white
  px-md py-sm rounded-base
  font-semibold
  hover:bg-saffron-500
  transition duration-normal
  shadow-base hover:shadow-lg
">
  Primary Action
</button>

{/* Secondary Button */}
<button className="
  border-2 border-saffron-400 text-saffron-400
  px-md py-sm rounded-base
  font-semibold
  hover:bg-saffron-50
  transition duration-normal
">
  Secondary Action
</button>

{/* Danger Button */}
<button className="
  bg-rose-400 text-white
  px-md py-sm rounded-base
  hover:bg-rose-500
  transition duration-normal
">
  Delete
</button>
```

### Card
```jsx
<div className="
  bg-white rounded-lg
  shadow-base
  p-lg
  hover:shadow-lg transition duration-normal
">
  <h3 className="text-h4 mb-md">Card Title</h3>
  <p className="text-text-secondary">Card content here</p>
</div>
```

### Alert/Toast
```jsx
{/* Success */}
<div className="
  bg-emerald-100 border-l-4 border-emerald-400
  text-emerald-700 p-md rounded-base
">
  ✓ Success message
</div>

{/* Error */}
<div className="
  bg-rose-100 border-l-4 border-rose-400
  text-rose-700 p-md rounded-base
">
  ✗ Error message
</div>

{/* Warning */}
<div className="
  bg-amber-100 border-l-4 border-amber-400
  text-amber-700 p-md rounded-base
">
  ⚠ Warning message
</div>

{/* Info */}
<div className="
  bg-sky-100 border-l-4 border-sky-400
  text-sky-700 p-md rounded-base
">
  ℹ Info message
</div>
```

### Form Input
```jsx
<div className="mb-lg">
  <label className="
    block text-text-primary font-semibold
    mb-sm text-sm
  ">
    Label
  </label>
  <input className="
    w-full px-md py-sm
    border-2 border-neutral-300
    rounded-base
    text-text-primary
    placeholder:text-text-tertiary
    focus:outline-none focus:border-saffron-400 focus:ring-1 focus:ring-saffron-400
    transition duration-fast
  " placeholder="Enter text..." />
</div>
```

### Badge/Chip
```jsx
{/* Default */}
<span className="
  inline-block
  bg-saffron-100 text-saffron-700
  px-md py-xs rounded-full
  text-sm font-semibold
">
  Badge
</span>

{/* Primary */}
<span className="
  inline-block
  bg-saffron-400 text-white
  px-md py-xs rounded-full
  text-sm font-semibold
">
  Active
</span>
```

---

## Max Width Classes

```
max-w-container:        1024px  (Main content width)
max-w-container-lg:     1280px  (Wider layouts)
max-w-container-md:     900px   (Narrower layouts)
max-w-container-sm:     700px   (Compact layouts)
max-w-question-card:    600px   (Question cards)
```

**Usage:**
```jsx
<div className="max-w-container mx-auto px-md">
  Content with max width and centered
</div>
```

---

## Min Height Classes

```
min-h-screen:   100vh   (Full viewport height)
min-h-viewport: 100dvh  (Dynamic viewport height)
```

**Usage:**
```jsx
<div className="min-h-screen flex items-center justify-center">
  Full screen content
</div>
```

---

## Best Practices

1. **Use semantic color names**: Use `bg-emerald-400` for success, `bg-rose-400` for errors, not arbitrary colors.

2. **Stick to the spacing scale**: Always use predefined spacing (xs, sm, md, lg, xl, etc.), avoid custom values.

3. **Use responsive utilities**: 
   ```jsx
   <div className="text-base md:text-lg lg:text-2xl">
     Responsive text size
   </div>
   ```

4. **Group related classes**:
   ```jsx
   <div className="
     {/* Layout */}
     flex items-center justify-between
     {/* Spacing */}
     p-md mb-lg
     {/* Colors */}
     bg-white text-text-primary
     {/* Borders & Shadows */}
     rounded-lg shadow-base
   ">
   </div>
   ```

5. **Use component-level CSS for complex styles**: If a pattern repeats, create a reusable React component.

6. **Avoid utility Hell**: If you're using 20+ classes on one element, consider extracting to a component.

7. **Responsive Design Pattern**:
   ```jsx
   {/* Mobile first */}
   <div className="
     flex-col md:flex-row
     space-y-md md:space-y-0 md:space-x-lg
   ">
   </div>
   ```

---

## Typography Reference

### Font Stack
- **Primary**: Poppins (for headings and emphasis)
- **Secondary**: Inter (for body text)
- **Fallback**: sans-serif

### Used Font Weights
- 300: Light
- 400: Regular
- 500: Medium
- 600: Semibold
- 700: Bold
- 800: Extra Bold

---

## Customization

To add new colors, spacing, or utilities:

1. Edit `tailwind.config.js` in the `theme.extend` section
2. New colors become available as `bg-{name}`, `text-{name}`, `border-{name}`, etc.
3. Restart the dev server for changes to take effect

Example:
```js
// In tailwind.config.js
extend: {
  colors: {
    custom: '#123456',
  },
}
// Now use: className="bg-custom"
```

---

## Troubleshooting

### Colors not updating?
1. Restart the dev server
2. Clear browser cache
3. Check that the class name matches the config exactly

### Styles not applying?
1. Ensure files are in the `content` array in `tailwind.config.js`
2. Check for typos in class names
3. Verify CSS file is imported in `main.jsx`

### Need custom spacing?
Use arbitrary values only when absolutely necessary:
```jsx
<div className="p-[13px]">Odd spacing</div>
```
Better: Add to `tailwind.config.js` and use predefined class.

---

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs/installation)
