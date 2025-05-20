// This is a simple Netlify build plugin that runs before the build
// It can be used to perform any necessary setup

module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Running pre-build plugin...');
    
    // Log Node.js version for debugging
    console.log(`Using Node.js version: ${process.version}`);
    
    // Log environment for debugging
    console.log('Build environment:', process.env.NODE_ENV);
    
    // You can add more pre-build steps here if needed
  }
};
