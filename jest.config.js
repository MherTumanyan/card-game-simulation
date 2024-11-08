module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Allows for importing with `@/`
    },
    testMatch: ['**/tests/**/*.test.ts'], // Looks for test files ending with `.test.ts`
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transforms TypeScript files using `ts-jest`
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  };
  