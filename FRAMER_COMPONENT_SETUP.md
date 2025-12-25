# Framer Tech Eye Component Integration

## Setup

The Framer Tech Eye component has been integrated using ES6 modules.

## Files Modified

1. **index.html**: 
   - Replaced custom tech eye HTML with `<div id="techEyeMount"></div>` container
   - Changed script tag to use `type="module"` and load `main.js`

2. **main.js**: 
   - New module file that imports the Framer component
   - Handles component initialization with multiple fallback strategies

3. **script.js**: 
   - Disabled old eye tracking, particle, and ASCII animation functions (now handled by Framer component)

## Component Initialization

The component is imported from:
```
https://framerusercontent.com/modules/mTLBzztmhhqEm9HAd1H4/g0BWdgVW4b3PBwCGb9Dz/The_Glitching_Tech_Eye.js
```

The initialization code in `main.js` tries multiple strategies:
- React component (if React/ReactDOM are needed)
- Function call
- Init/create methods
- Auto-initialization

## Notes

- If the component requires React/ReactDOM, you may need to add them via CDN or npm
- Check browser console for initialization messages
- The component should render into `#techEyeMount` container

## Troubleshooting

If the component doesn't appear:
1. Check browser console for errors
2. Verify the Framer module URL is accessible
3. Check if React/ReactDOM are required and add them if needed
4. Verify CORS settings allow loading from framerusercontent.com


