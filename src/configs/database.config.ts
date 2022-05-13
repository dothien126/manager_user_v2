
import { getConfig } from 'src/configs/index';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface DatabaseConfig {
  type: string,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  entities: string[],
  extra: {
    connectionLimit: 100
  };
}

export const defaultConfig = {
  ...getConfig().get<DatabaseConfig>('default'),
  autoLoadEntities: true,
};

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  useFactory: () => {
    return {
      ...defaultConfig,
      synchronize: true,
    } as TypeOrmModuleOptions;
  },
};
