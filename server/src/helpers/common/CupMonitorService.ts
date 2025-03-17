import { Injectable, Logger } from '@nestjs/common';
import * as os from 'os';
import { LoggerService } from '../logger/logger.service';
import { CPU_MONITOR } from './constants';
import * as moment from 'moment';

@Injectable()
export class CpuMonitorService {
  private readonly logger = new Logger(CpuMonitorService.name);

  constructor(
    private readonly loggerService: LoggerService
  ) {
    this.startCpuMonitoring();
  }

  private startCpuMonitoring() {
    setInterval(async () => {
      const cpuDetails = await this.getCpuDetails();
      this.logger.log(`Time: ${new Date().toISOString()} - CPU Details: ${JSON.stringify(cpuDetails)}`);
      
    }, 60000);
  }

  private async getCpuDetails() {
    const startCpuTimes = os.cpus();
    const totalCpus = startCpuTimes.length;

    // Wait for 100ms to get the difference
    await new Promise(resolve => setTimeout(resolve, 100));

    const endCpuTimes = os.cpus();

    // Initialize variables for total system usage
    let totalIdleTimeStart = 0;
    let totalActiveTimeStart = 0;
    let totalIdleTimeEnd = 0;
    let totalActiveTimeEnd = 0;

    // Track individual CPU usage
    const cpuUsages = startCpuTimes.map((startCpu, index) => {
      const endCpu = endCpuTimes[index];

      const idleStart = startCpu.times.idle;
      const activeStart = Object.values(startCpu.times).reduce((a, b) => a + b, 0);

      const idleEnd = endCpu.times.idle;
      const activeEnd = Object.values(endCpu.times).reduce((a, b) => a + b, 0);

      const idleDiff = idleEnd - idleStart;
      const activeDiff = activeEnd - activeStart;

      totalIdleTimeStart += idleStart;
      totalActiveTimeStart += activeStart;
      totalIdleTimeEnd += idleEnd;
      totalActiveTimeEnd += activeEnd;

      const usage = (activeDiff / (activeDiff + idleDiff)) * 100;

      return {
        cpu: index,
        usage: usage.toFixed(2),
        isActive: usage > 5,
      };
    });

    // Overall CPU usage
    const idleDifference = totalIdleTimeEnd - totalIdleTimeStart;
    const activeDifference = totalActiveTimeEnd - totalActiveTimeStart;

    const overallCpuUsage = (activeDifference / (activeDifference + idleDifference)) * 100;

    const payload = {
      totalCpus,
      overallCpuUsage: overallCpuUsage.toFixed(2),
      activeCpus: cpuUsages.filter(cpu => cpu.isActive).length, // Number of active CPUs
      cpuDetails: cpuUsages, // Detailed usage per CPU
    };

    await this.loggerService.log(
      CPU_MONITOR,
      `Date: ${moment(Date.now()).format('YYYY-MM-DD')} Time :${moment(Date.now()).format('HH:mm:ss')} - CPU Details during request: ${JSON.stringify(payload)}`
    );

    return;
  }

}

