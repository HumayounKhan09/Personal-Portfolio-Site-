// ===================================
// Main Entry Point - Module Setup
// ===================================

// Import React and ReactDOM as ES modules
let React;
let ReactDOM;

async function loadReact() {
    try {
        // Import React and ReactDOM as ES modules
        React = await import('react');
        ReactDOM = await import('react-dom');
        
        // Make available globally for compatibility
        window.React = React;
        window.ReactDOM = ReactDOM;
        
        console.log('✅ React and ReactDOM loaded as ES modules');
        return true;
    } catch (error) {
        console.error('❌ Failed to load React:', error);
        return false;
    }
}

// Import the Framer Tech Eye component
let TechEyeModule;
let TechEye;

async function loadTechEye() {
    try {
        // Load React first as ES modules
        const reactLoaded = await loadReact();
        if (!reactLoaded) {
            throw new Error('Failed to load React');
        }
        
        console.log('React loaded:', React, ReactDOM);
        
        // Import the component module
        console.log('📦 Importing Tech Eye module...');
        TechEyeModule = await import("https://framerusercontent.com/modules/mTLBzztmhhqEm9HAd1H4/g0BWdgVW4b3PBwCGb9Dz/The_Glitching_Tech_Eye.js");
        
        console.log('✅ Tech Eye module imported:', TechEyeModule);
        
        // Get the actual component (default export)
        TechEye = TechEyeModule?.default || TechEyeModule;
        
        console.log('👁️ Tech Eye component:', TechEye);
        console.log('📝 Tech Eye type:', typeof TechEye);
        
        // Make TechEye available globally for script.js if needed
        window.TechEyeModule = TechEyeModule;
        window.TechEye = TechEye;
        window.React = React;
        window.ReactDOM = ReactDOM;
        
        // Initialize after loading
        initTechEye();
    } catch (error) {
        console.error('❌ Error loading Tech Eye module:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        
        // Show error in the mount point
        const mountPoint = document.getElementById('techEyeMount');
        if (mountPoint) {
            mountPoint.innerHTML = `<div style="color: #00ff88; padding: 20px; text-align: center; font-family: monospace;">
                <p style="color: #ff0088;">Error loading Tech Eye component</p>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">${error.message}</p>
                <p style="font-size: 10px; color: #666; margin-top: 5px;">Check console for details</p>
            </div>`;
        }
    }
}

// Initialize Tech Eye component
function initTechEye() {
    const mountPoint = document.getElementById('techEyeMount');
    if (!mountPoint) {
        console.warn('Tech Eye mount point not found');
        return;
    }

    if (!TechEye) {
        console.warn('Tech Eye component not loaded yet');
        return;
    }

    try {
        if (!React || !ReactDOM) {
            console.error('❌ React or ReactDOM not available');
            mountPoint.innerHTML = '<div style="color: #ff0088; padding: 20px;">React not loaded</div>';
            return;
        }
        
        console.log('🎨 Attempting to render Tech Eye component...');
        console.log('📍 Mount point:', mountPoint);
        console.log('👁️ TechEye:', TechEye);
        
        // The component is a React function component, render it
        if (typeof TechEye === 'function') {
            try {
                // Create React root and render
                const root = ReactDOM.createRoot(mountPoint);
                
                // Get viewport dimensions for full-screen background
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                
                // The component accepts props - full viewport with dark blue background
                const props = {
                    width: viewportWidth,
                    height: viewportHeight,
                    bg: "#0a0f1a", // Dark blue background
                    hueBase: 0, // Red hue (0 degrees for red)
                    rotationSpeed: 0.3, // Reduced from 1 to 0.3 to slow down ASCII animation
                    glitchiness: 0.7,
                    grainStrength: 0.4, // 40% static as requested
                    asciiDensity: " .:-=+*#%@",
                    maxAsciiCols: Math.floor(viewportWidth / 5),
                    maxAsciiRows: Math.floor(viewportHeight / 5),
                    eyeFollow: 0.9,
                    style: { 
                        width: `${viewportWidth}px`, 
                        height: `${viewportHeight}px`,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        backgroundColor: '#0a0f1a', // Dark blue
                        overflow: 'hidden',
                        zIndex: -1,
                        filter: 'contrast(1.2) brightness(1.1)', // Enhanced contrast for XDR performance
                        WebkitFilter: 'contrast(1.2) brightness(1.1)' // Webkit prefix for compatibility
                    }
                };
                
                // Handle window resize to update component size
                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        const newWidth = window.innerWidth;
                        const newHeight = window.innerHeight;
                        // Re-render with new dimensions
                        if (mountPoint.querySelector('div')) {
                            const root = ReactDOM.createRoot(mountPoint);
                            root.render(React.createElement(TechEye, {
                                ...props,
                                width: newWidth,
                                height: newHeight,
                                rotationSpeed: 0.3, // Keep slow speed on resize
                                maxAsciiCols: Math.floor(newWidth / 5),
                                maxAsciiRows: Math.floor(newHeight / 5),
                                style: {
                                    ...props.style,
                                    width: `${newWidth}px`,
                                    height: `${newHeight}px`,
                                    filter: 'contrast(1.2) brightness(1.1)',
                                    WebkitFilter: 'contrast(1.2) brightness(1.1)'
                                }
                            }));
                        }
                    }, 250);
                });
                
                // Use React.createElement with the component and props
                root.render(React.createElement(TechEye, props));
                console.log('✅ Tech Eye React component rendered successfully!');
                return;
            } catch (reactError) {
                console.error('❌ Failed to render as React component:', reactError);
                console.error('React error details:', reactError.message);
                console.error('Error stack:', reactError.stack);
                
                // Try without props as fallback
                try {
                    const root = ReactDOM.createRoot(mountPoint);
                    root.render(React.createElement(TechEye));
                    console.log('✅ Tech Eye rendered without props');
                } catch (error2) {
                    console.error('❌ Also failed without props:', error2);
                    mountPoint.innerHTML = `<div style="color: #ff0088; padding: 20px; font-family: monospace;">
                        <p>Error rendering component</p>
                        <pre style="font-size: 10px; color: #888;">${error2.message}</pre>
                    </div>`;
                }
            }
        } else {
            console.error('❌ TechEye is not a function:', typeof TechEye, TechEye);
            mountPoint.innerHTML = `<div style="color: #ff0088; padding: 20px;">
                <p>Tech Eye is not a valid React component</p>
                <pre style="font-size: 10px; color: #888;">Type: ${typeof TechEye}</pre>
            </div>`;
        }
    } catch (error) {
        console.error('❌ Error initializing Tech Eye component:', error);
        console.error('Error stack:', error.stack);
        mountPoint.innerHTML = `<div style="color: #ff0088; padding: 20px; font-family: monospace;">
            <p>Unexpected error</p>
            <pre style="font-size: 10px; color: #888;">${error.message}</pre>
        </div>`;
    }
}

// Wait for DOM to be ready, then load Tech Eye
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadTechEye();
        loadMainScript();
    });
} else {
    // DOM already ready
    loadTechEye();
    loadMainScript();
}

// Load the main script (non-module) as a regular script
function loadMainScript() {
    const script = document.createElement('script');
    script.src = 'script.js';
    script.async = true;
    document.body.appendChild(script);
}

