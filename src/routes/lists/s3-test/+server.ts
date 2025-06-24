import { json } from '@sveltejs/kit';
import { getS3Client, S3_BUCKET_NAME } from '$lib/server/s3';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function GET() {
  const s3 = getS3Client();
  try {
    const result = await s3.send(new ListObjectsV2Command({
      Bucket: S3_BUCKET_NAME,
      MaxKeys: 3
    }));
    return json({ success: true, data: {
      bucket: S3_BUCKET_NAME,
      objects: result.Contents?.map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified
      })) || []
    }});
  } catch (error: any) {
    return json({ success: false, error: error.message || String(error) }, { status: 500 });
  }
} 