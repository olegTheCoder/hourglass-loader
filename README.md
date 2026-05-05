# Hourglass Loader

An animated SVG hourglass loading spinner for React.

```bash
npm install @olegthecoder/hourglass-loader
```

---

## HourglassLoader

A classic hourglass with flowing sand animation that flips endlessly.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `120` | Width and height in pixels |
| `sandColor` | `string` | `'#FF8C42'` | Color of the sand |
| `glassColor` | `string` | `'#9BA4B5'` | Color of the glass bulb outline |
| `frameColor` | `string` | `'#2B2D42'` | Color of the hourglass frame |
| `speed` | `number` | `1` | Animation speed multiplier |

### Usage

```tsx
import { HourglassLoader } from '@olegthecoder/hourglass-loader';

<HourglassLoader />
```

### Options

```tsx
// Size
<HourglassLoader size={80} />
<HourglassLoader size={200} />

// Colors
<HourglassLoader sandColor="#e74c3c" />
<HourglassLoader sandColor="#f1c40f" glassColor="#bdc3c7" frameColor="#2c3e50" />

// Speed
<HourglassLoader speed={0.5} />
<HourglassLoader speed={2} />
<HourglassLoader speed={3} />

// Combined
<HourglassLoader size={160} sandColor="#e74c3c" speed={0.7} />
```

---

## License

MIT
