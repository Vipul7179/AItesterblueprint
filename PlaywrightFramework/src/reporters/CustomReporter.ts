import { Reporter, FullConfig, Suite, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

export default class CustomReporter implements Reporter {
  private startTime: number = 0;
  private totalTests: number = 0;
  private passedTests: number = 0;
  private failedTests: number = 0;
  private skippedTests: number = 0;

  onBegin(config: FullConfig, suite: Suite): void {
    this.startTime = Date.now();
    this.totalTests = suite.allTests().length;
    console.log('\n============================================================');
    console.log('   ENTERPRISE AUTOMATION ENGINE - TEST EXECUTION STARTED   ');
    console.log('============================================================');
    console.log(`Total Scheduled Tests: ${this.totalTests}`);
    console.log(`Workers: ${config.workers}`);
    console.log('------------------------------------------------------------\n');
  }

  onTestBegin(test: TestCase): void {
    console.log(`[RUNNING] ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const duration = (result.duration / 1000).toFixed(2);
    if (result.status === 'passed') {
      this.passedTests++;
      console.log(`[PASSED]  ${test.title} (${duration}s)`);
    } else if (result.status === 'failed' || result.status === 'timedOut') {
      this.failedTests++;
      console.log(`[FAILED]  ${test.title} (${duration}s)`);
      if (result.error?.message) {
        console.log(`          Error: ${result.error.message.split('\n')[0]}`);
      }
    } else if (result.status === 'skipped') {
      this.skippedTests++;
      console.log(`[SKIPPED] ${test.title}`);
    }
  }

  onEnd(result: FullResult): void {
    const totalDuration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    console.log('\n============================================================');
    console.log('       ENTERPRISE AUTOMATION ENGINE - EXECUTION SUMMARY     ');
    console.log('============================================================');
    console.log(`Total Tests Executed : ${this.totalTests}`);
    console.log(`Passed               : ${this.passedTests}`);
    console.log(`Failed               : ${this.failedTests}`);
    console.log(`Skipped              : ${this.skippedTests}`);
    console.log(`Total Execution Time : ${totalDuration}s`);
    console.log(`Final Suite Status   : ${result.status.toUpperCase()}`);
    console.log('============================================================\n');
  }
}

