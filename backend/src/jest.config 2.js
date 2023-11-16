module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    moduleNameMapper: {
      // You may need to add mapping for CSS and other assets used in your app
    },
  };