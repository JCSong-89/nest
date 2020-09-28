import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: () => ({
        dialect: 'mysql',
        host: process.env.AZURE_DB_HOST,
        port: 3306,
        username: process.env.AZURE_DB_USERNAME,
        password: process.env.AZURE_DB_PASSWORD,
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
