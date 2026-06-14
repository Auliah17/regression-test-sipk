module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.cjs'],
  coverageThreshold: {
    global: {
      lines: 75,
      branches: 70,
      functions: 70,
      statements: 75
    }
  },
  collectCoverageFrom: ['server-crud.js'],
  coverageReporters: ['text', 'html', 'lcov'],
  verbose: true
};