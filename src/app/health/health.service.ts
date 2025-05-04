import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { catchError, forkJoin, map, of, tap } from 'rxjs';

import { ProxyService } from '../proxy/request-proxy.service';

@Injectable()
export class HealthService implements OnApplicationBootstrap {
  public readonly KNOWNS_HOSTS: string[] = [];
  private readonly logger: Logger = new Logger(HealthService.name);

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.KNOWNS_HOSTS = [
      this.configService.getOrThrow<string>('USERS_MANAGEMENT_HOST'),
      this.configService.getOrThrow<string>('VENTURES_MANAGEMENT_HOST'),
    ];
  }

  public onApplicationBootstrap() {
    forkJoin(this.KNOWNS_HOSTS.map((host) => this.checkHealth(host))).subscribe(
      (results) => {
        this.logger.log('Health check completed');
        results.forEach(({ host, status }) => {
          this.logger.log(`Health check for ${host} returned status ${status}`);
        });
      },
    );
  }

  public checkHealth(host: string) {
    return this.proxyService.send('GET', `${host}/api/v1/health`).pipe(
      tap(({ status }) => {
        this.logger.log(`Health check for ${host} returned status ${status}`);
      }),
      map(({ status }) => ({ host, status })),
      catchError((err) => {
        this.logger.error(`Health check for ${host} failed`);
        return of({ host, status: err.cause?.code });
      }),
    );
  }
}
