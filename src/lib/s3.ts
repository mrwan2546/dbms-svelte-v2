import { S3Client } from '@aws-sdk/client-s3';
import { BUCKET_ACCESS_KEY, BUCKET_ENDPOINT, BUCKET_SECRET_KEY } from '$env/static/private';

export const s3 = new S3Client({
    region: 'auto',
    endpoint: BUCKET_ENDPOINT,
    credentials: {
        accessKeyId: BUCKET_ACCESS_KEY,
        secretAccessKey: BUCKET_SECRET_KEY
    }
});