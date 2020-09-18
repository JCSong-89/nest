import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        dialect: 'mysql',
        host: '',
        port: 3306,
        username: 'root',
        password: '',
        database: 'musicdb',
        dialectOptions: {
          decimalNumbers: true,
        },
        define: {
          charset: 'utf8mb4',
          collate: 'utf8mb4_unicode_ci',
        },
        autoLoadModels: true,
        synchronize: true,
        // logging: console.log,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
