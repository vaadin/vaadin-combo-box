/* eslint-env node */
const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');

const config = {
  nodeResolve: true,
  testsFinishTimeout: 60000,
  testFramework: {
    config: {
      timeout: '10000' // default 2000
    }
  },
  coverageConfig: {
    include: ['**/src/*'],
    threshold: {
      statements: 99,
      branches: 65,
      functions: 97,
      lines: 99
    }
  }
};

if (process.env.TEST_ENV === 'sauce') {
  const sauceLabsLauncher = createSauceLabsLauncher({
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY
  });

  const sharedCapabilities = {
    'sauce:options': {
      name: 'vaadin-combo-box unit tests',
      build: `${process.env.GITHUB_REF || 'local'} build ${process.env.GITHUB_RUN_NUMBER || ''}`
    }
  };

  config.concurrency = 1;
  config.browsers = [
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'firefox',
      platform: 'Windows 10',
      browserVersion: 'latest'
    }),
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'safari',
      platform: 'macOS 10.15',
      browserVersion: '13.1'
    })
  ];
}

module.exports = config;
