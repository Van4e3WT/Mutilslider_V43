module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^Plugin(.*)$': '<rootDir>/src/multislider-v43/plugin$1',
  },
  setupFiles: ['<rootDir>/tests/test-env.js'],
};
