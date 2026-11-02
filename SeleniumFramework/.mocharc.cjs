module.exports = {
  require: ['tsx/cjs', './tests/hooks.ts'],
  spec: ['tests/**/*.spec.ts'],
  reporter: './src/reporting/reporter.cjs',
  timeout: 120000,
  retries: 0,
  parallel: false
};
