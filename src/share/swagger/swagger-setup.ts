import { getConfig } from "src/configs";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from "@nestjs/common";

export const swaggerConfig = {
    ...getConfig().get<any>('swagger'),
};

export function initSwagger(app: INestApplication) {
    if (!swaggerConfig.isPublic) return;

    const configSwagger = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .setContact('Do Van Thien', '55556789', 'dothien2601ak39@gmail.com')
        .addServer(swaggerConfig.server, 'host')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
        )
        .build();
    
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('/docs', app, document);
}