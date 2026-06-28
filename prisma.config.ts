import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || "mongodb+srv://adarsh_db:Vicky%23250706@cluster0.bbpaq8k.mongodb.net/propertyhub?retryWrites=true&w=majority&appName=Cluster0",
  },
});