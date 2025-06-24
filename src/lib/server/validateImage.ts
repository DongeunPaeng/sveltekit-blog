const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILENAME_LENGTH = 128;

function sanitizeFileName(fileName: string): string {
  // Remove path, keep only base name
  let name = fileName.split(/[\\/]/).pop() || '';
  // Remove dangerous chars, allow only safe ones
  name = name.replace(/[^a-zA-Z0-9._-]/g, '_');
  // Truncate if too long
  if (name.length > MAX_FILENAME_LENGTH) {
    const ext = name.includes('.') ? '.' + name.split('.').pop() : '';
    name = name.slice(0, MAX_FILENAME_LENGTH - ext.length) + ext;
  }
  return name;
}

export function validateImageInput({ fileName, fileType, fileSize }:{ fileName: string, fileType: string, fileSize: number }) {
  if (!ALLOWED_TYPES.includes(fileType)) {
    throw new Error('허용되지 않은 파일 타입입니다. (jpeg, png, gif, webp만 가능)');
  }
  if (fileSize > MAX_SIZE) {
    throw new Error('파일 크기가 5MB를 초과합니다.');
  }
  if (!fileName || typeof fileName !== 'string') {
    throw new Error('파일명이 올바르지 않습니다.');
  }
  const sanitized = sanitizeFileName(fileName);
  if (!sanitized) {
    throw new Error('파일명에 허용되지 않는 문자가 포함되어 있습니다.');
  }
  return sanitized;
} 