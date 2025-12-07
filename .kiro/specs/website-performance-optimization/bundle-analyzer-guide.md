# Bundle Analyzer Usage Guide

## Quick Start

To analyze your bundle and identify optimization opportunities:

```bash
npm run analyze
```

This will:
1. Build your application in production mode
2. Generate interactive HTML reports
3. Automatically open them in your browser

## What You'll See

The bundle analyzer creates visual treemaps showing:
- **Size of each module** in your bundle
- **Which packages** are taking up the most space
- **Duplicate dependencies** (if any)
- **Chunk composition** (how code is split)

## Understanding the Visualization

### Colors:
- Different colors represent different chunks/bundles
- Hover over any block to see detailed information

### Size Information:
- **Stat Size**: Original size of the file
- **Parsed Size**: Size after minification
- **Gzipped Size**: Size after compression (what users download)

## What to Look For

### 🔴 Red Flags:
1. **Large Dependencies**: Packages over 100KB
2. **Duplicate Packages**: Same package included multiple times
3. **Unused Code**: Large modules that aren't actually used

### 🟢 Good Signs:
1. **Small Chunks**: Well-split code
2. **Efficient Imports**: Only importing what's needed
3. **Tree-Shaken Code**: Unused exports removed

## Common Optimizations

### If You Find Large Dependencies:

1. **Check if it's needed**:
   ```bash
   # Search for usage
   grep -r "package-name" app/ components/
   ```

2. **Consider alternatives**:
   - Lighter packages with similar functionality
   - Native browser APIs instead of libraries

3. **Lazy load it**:
   ```tsx
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   ```

### If You Find Duplicate Dependencies:

1. **Check package.json**:
   - Look for version conflicts
   - Use `npm dedupe` to consolidate

2. **Update dependencies**:
   ```bash
   npm update
   ```

## Interpreting Results

### Current State (After Task 1):

**Removed Dependencies:**
- ❌ three.js (~600KB)
- ❌ face-api.js (~400KB)
- ❌ postprocessing (~150KB)

**Remaining Large Dependencies:**
- ⚠️ gsap (~200KB) - Will optimize in Task 2
- ⚠️ motion (~100KB) - Used for portfolio modal
- ✅ mongoose (server-side only, no client impact)

### Target State:

After all optimizations:
- Main bundle: <300KB (gzipped)
- Lazy chunks: <100KB each (gzipped)
- Total JavaScript: <800KB (gzipped)

## Advanced Usage

### Generate Report Without Opening Browser:

```bash
ANALYZE=true npm run build
```

Reports are saved to:
- `.next/analyze/client.html`
- `.next/analyze/server.html`

### Compare Before/After:

1. Save current report:
   ```bash
   npm run analyze
   cp .next/analyze/client.html bundle-before.html
   ```

2. Make changes

3. Generate new report:
   ```bash
   npm run analyze
   ```

4. Compare the two HTML files

## Integration with CI/CD

### GitHub Actions Example:

```yaml
- name: Analyze Bundle
  run: |
    npm run analyze
    # Upload reports as artifacts
```

### Bundle Size Limits:

Set up alerts if bundle exceeds thresholds:
- Main bundle: >400KB (gzipped) = ⚠️ Warning
- Main bundle: >500KB (gzipped) = ❌ Error

## Next Steps

After analyzing:

1. **Document findings** in bundle-analysis.md
2. **Prioritize optimizations** based on size impact
3. **Implement changes** incrementally
4. **Re-analyze** to verify improvements
5. **Monitor** bundle size in CI/CD

## Resources

- [Next.js Bundle Analyzer Docs](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Web.dev Bundle Size Guide](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

## Troubleshooting

### Analyzer Won't Open:

```bash
# Manually open the report
open .next/analyze/client.html
```

### Build Fails:

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Can't Find Reports:

Check that `ANALYZE=true` environment variable is set:
```bash
echo $ANALYZE  # Should output: true
```
