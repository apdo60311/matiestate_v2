import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Matiestate API",
            version: "1.0.0",
            description: "Api documentation for the Matiestate API",
        },
        servers: [
            {
                url: "http://localhost:4000/api/v1/", 
                description: "API version 1",
            },
        ],
    },
    apis: [
        path.join(process.cwd(), "dist/routes/*.routes.js"),
        path.join(process.cwd(), "dist/entities/*.entity.js")
    ], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;