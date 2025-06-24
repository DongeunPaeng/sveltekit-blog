import { S3Client } from '@aws-sdk/client-s3';
import { AWS_REGION, S3_BUCKET_NAME } from '$env/static/private';

if (!AWS_REGION) {
  throw new Error('Missing required environment variable: AWS_REGION');
}
if (!S3_BUCKET_NAME) {
  throw new Error('Missing required environment variable: S3_BUCKET_NAME');
}

const s3Client = new S3Client({
  region: AWS_REGION,
  // credentials omitted: will use EC2 IAM Role automatically
});

export const getS3Client = () => s3Client;
export { S3_BUCKET_NAME }; 