const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3999',
  },
  webServer: {
    command: 'npx http-server . -p 3999 -s',
    port: 3999,
    reuseExistingServer: true,
  },
});
