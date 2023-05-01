/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/test/mongo-test-environment',
  setupFilesAfterEnv: [
    '<rootDir>/test/bootstrap-jest.js',
  ],
  coverageReporters: [
    'json',
    'text-summary',
    'lcov',
    'clover',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/api/**',
    'src/config/express/**',
  ],
  coveragePathIgnorePatterns: [
    'test/*',
    'src/config/*',
  ],
};
