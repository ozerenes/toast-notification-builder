/**
 * Jest configuration only.
 * Vite config lives in vite.config.ts.
 * @type {import('jest').Config}
 */
module.exports = {
  testEnvironment: 'jsdom',
  watchman: false,
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@vue/test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
  },
  testMatch: ['**/__tests__/**/*.spec.ts', '**/__tests__/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.{ts,vue}', '!src/**/*.d.ts', '!src/main.ts'],
  coverageDirectory: 'coverage',
}
