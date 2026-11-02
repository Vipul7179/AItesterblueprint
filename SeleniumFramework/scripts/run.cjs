const { spawnSync } = require('node:child_process');
const args = process.argv.slice(2);
const headed = args.includes('--headed');
const mode = headed ? 'headed' : 'headless';
const result = spawnSync(process.execPath, [require.resolve('mocha/bin/mocha.js'), ...args.filter(value => value !== '--headed')], {
  stdio: 'inherit',
  env: { ...process.env, HEADED: String(headed), REPORT_DIR: process.env.REPORT_DIR || `reports/${mode}` }
});
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
