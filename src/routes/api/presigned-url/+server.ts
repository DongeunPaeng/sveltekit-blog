import { json } from '@sveltejs/kit';
import { validateImageInput } from '$lib/server/validateImage';
import { getS3Client, S3_BUCKET_NAME } from '$lib/server/s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { AWS_REGION } from '$env/static/private';
import { verifyToken } from '$lib/server/auth';
import { v4 as uuidv4 } from 'uuid';

// CORS preflight (OPTIONS)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

export async function POST({ request, cookies }) {
  // 인증 미들웨어: JWT 토큰 검사
  const user = await verifyToken(cookies.get('user_token') || '');
  if (!user) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const { fileName, fileType, fileSize } = await request.json();
    const sanitizedFileName = validateImageInput({ fileName, fileType, fileSize });
    // 파일명 고유성 보장: userId, timestamp, uuid, 확장자 조합
    let userId = 'user';
    if (typeof user === 'object' && user !== null && 'sub' in user) {
      userId = String(user.sub);
    } else if (typeof user === 'object' && user !== null && 'id' in user) {
      userId = String(user.id);
    }
    const timestamp = Date.now();
    const ext = sanitizedFileName.includes('.') ? sanitizedFileName.split('.').pop() : '';
    const uniqueFileName = `${userId}_${timestamp}_${uuidv4()}${ext ? '.' + ext : ''}`;

    const s3 = getS3Client();
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: S3_BUCKET_NAME,
      Key: uniqueFileName,
      Conditions: [
        ['content-length-range', 0, fileSize],
        { 'Content-Type': fileType }
      ],
      Fields: {
        'Content-Type': fileType
      },
      Expires: 60 // 1분
    });

    const fileUrl = `https://s3.${AWS_REGION}.amazonaws.com/${S3_BUCKET_NAME}/${uniqueFileName}`;
    return new Response(JSON.stringify({ url, fields, fileUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    console.error('Presigned URL API error:', e);
    return new Response(JSON.stringify({ success: false, error: e.message || String(e) }), {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
} 