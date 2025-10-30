import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule); app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    app.enableCors({
        origin: process.env.FRONTEND_URL || "http://localhost:5000",
        credentials: true,
    }); app.setGlobalPrefix("api");

    const port = process.env.PORT || 5173;
    await app.listen(port, "0.0.0.0");

    console.log(`Application is running on: http://localhost:${port}/api`);
}

bootstrap();