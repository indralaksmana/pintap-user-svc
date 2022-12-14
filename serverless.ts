import type { AWS } from '@serverless/typescript';

import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '@functions/user';
import { login, verifyToken } from '@functions/auth';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { 
    getAllUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser,
    login,
    verifyToken
  },
  package: { 
    individually: true,
    patterns: [
      "src/configs/database/prisma/schema.prisma"
    ]
  },
  custom:{
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
