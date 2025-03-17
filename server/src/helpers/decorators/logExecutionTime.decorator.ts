import { Logger } from '@nestjs/common';

export function LogExecutionTime() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const logger = new Logger(target.constructor.name);

        descriptor.value = async function (...args: any[]) {
            const startTime = Date.now();
            const result = await originalMethod.apply(this, args);
            const duration = Date.now() - startTime;

            // Log to console
            logger.log(`Execution time for ${propertyKey}: ${duration}ms`);

            // Return both the result and the duration
            return { result, duration };
        };

        return descriptor;
    };
}
