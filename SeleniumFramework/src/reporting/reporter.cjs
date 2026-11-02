const fs = require('node:fs');
const path = require('node:path');
const { reporters } = require('mocha');

function redact(value) {
  return [process.env.VWO_EMAIL, process.env.VWO_PASSWORD, 'DeliberatelyInvalid-2026!'].filter(Boolean)
    .reduce((text, secret) => text.split(secret).join('[REDACTED]'), String(value));
}

function details(error) {
  if (!error) return '';
  return redact(`${error.stack || error.message || error}${error.cause ? `\nCaused by: ${details(error.cause)}` : ''}`);
}

function escape(value) {
  return redact(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

module.exports = class CustomReporter extends reporters.Base {
  constructor(runner, options) {
    super(runner, options);
    const tests = [];
    const failures = [];
    runner.on('test end', test => tests.push(test));
    runner.on('fail', (test, error) => {
      failures.push({ title: test.fullTitle(), error: details(error) });
    });
    runner.once('end', () => {
      const directory = path.resolve(process.env.REPORT_DIR || 'reports/latest');
      fs.mkdirSync(directory, { recursive: true });
      const rows = tests.map(test => ({
        title: test.fullTitle(), status: test.state || 'unknown', duration: test.duration || 0,
        skipReason: test.skipReason || '', error: details(test.err), screenshot: test.screenshot || ''
      }));
      const result = {
        engine: 'Mocha + Selenium WebDriver', headed: process.env.HEADED === 'true',
        stats: this.stats, tests: rows, failures
      };
      fs.writeFileSync(path.join(directory, 'results.json'), JSON.stringify(result, null, 2));
      const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Selenium Login Report</title><style>body{font:16px system-ui;max-width:1100px;margin:40px auto;padding:0 20px;background:#f5f7fb;color:#172238}article{background:white;padding:20px;margin:16px 0;border-radius:10px;border-left:6px solid #64748b}.passed{border-color:#168552}.failed{border-color:#c53030}.pending{border-color:#b7791f}pre{white-space:pre-wrap;overflow-wrap:anywhere}img{max-width:100%}</style><h1>Selenium Login Report</h1><p>Mocha + Selenium WebDriver · ${result.headed ? 'Headed' : 'Headless'} Chrome</p><p>${this.stats.passes} passed · ${this.stats.failures} failed · ${this.stats.pending} skipped · ${this.stats.duration} ms</p>${rows.map(row => `<article class="${escape(row.status)}"><h2>${escape(row.title)}</h2><p>${escape(row.status)} · ${row.duration} ms</p>${row.skipReason ? `<p>${escape(row.skipReason)}</p>` : ''}${row.error ? `<pre>${escape(row.error)}</pre>` : ''}${row.screenshot ? `<a href="${escape(row.screenshot)}">Failure screenshot</a>` : ''}</article>`).join('')}${failures.length ? `<h2>Failure diagnostics</h2>${failures.map(failure => `<article class="failed"><h3>${escape(failure.title)}</h3><pre>${escape(failure.error)}</pre></article>`).join('')}` : ''}</html>`;
      fs.writeFileSync(path.join(directory, 'index.html'), html);
      console.log(`${this.stats.passes} passed, ${this.stats.failures} failed, ${this.stats.pending} skipped`);
      for (const failure of failures) console.error(`${redact(failure.title)}\n${failure.error}`);
      console.log(`Report: ${path.join(directory, 'index.html')}`);
    });
  }
};
