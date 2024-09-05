import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Node Loans",
      version: "1.0.0",
      description: "Loan managing app",
    },
    servers: [
      { url: "http://195.181.242.194:5001/" },
     
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            deviceID: {
              type: "string",
              description: "The phone ID of the user",
            },
            loans: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Loan"
                },
                description: "List of loans associated with the user"
              },
              hasLoans : {
                type: "boolean",
                description:  "Does User Have Loans"
              }
          },
        },
        Loan: {
          type: "object",
          properties: {
            deviceID: {
              type: "string",
              description: "The phone ID associated with the loan",
              example: "1234567890",
            },
            bankName: {
              type: "string",
              description: "Name of the bank providing the loan",
              example: "Ameriabank",
            },
            amount: {
              type: "number",
              description: "Amount of the loan",
              example: 10000,
            },
            dueDate: {
              type: "string",
              format: "date",
              description: "Due date for the loan repayment",
              example: "2024-09-30",
            },
            endDate: {
              type: "string",
              format: "date",
              description: "End date of the loan",
              example: "2025-09-30",
            },
            description: {
              type: "string",
              description: "Additional information about the loan",
              example: "Personal loan for car purchase",
            },
            amountValute: {
              type: "string",
              description: "Currency of the loan amount",
              example: "USD",
            },
            paidStatus: {
              type: "boolean",
              description: "Loan payment status",
              example: false,
            },
          },
        },
      },
    },
  },
  apis: ["./Route/*.js"], 
};

const specs = swaggerJSDoc(options);

export default specs;
