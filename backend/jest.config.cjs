const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig.base.json');

/** @type {import('jest').Config} */
module.exports = {
  displayName: 'backend',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'backend/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '..',
  testMatch: ['<rootDir>/backend/src/**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
