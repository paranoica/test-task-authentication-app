import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER } from "@nestjs/core";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST", "db"),
                port: configService.get("DB_PORT", 5432),
                username: configService.get("DB_USERNAME", "postgres"),
                password: configService.get("DB_PASSWORD", "postgres"),
                database: configService.get("DB_NAME", "authentication-app"),
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                synchronize: configService.get("NODE_ENV") !== "production",
                logging: configService.get("NODE_ENV") === "development",
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule { }