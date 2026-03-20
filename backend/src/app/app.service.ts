import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getHealth() {
    const n = 30;
    const fib = this.fibonacci(n);
    return {
      status: 'ok',
      serverTime: new Date().toISOString(),
      uptime: process.uptime(),
      nodeVersion: process.version,
      calculation: {
        description: `Fibonacci(${n})`,
        result: fib,
      },
    };
  }

  private fibonacci(n: number): number {
    if (n <= 1) return n;
    let a = 0;
    let b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  }
}
