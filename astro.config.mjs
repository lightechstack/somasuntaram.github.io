import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://REPLACE_WITH_DOMAIN.com',
  output: 'static',
  build: {
    format: 'file', // produces /work/eks-migration.html not /work/eks-migration/index.html — matches the 404 handling in terraform/cloudfront.tf
  },
});
