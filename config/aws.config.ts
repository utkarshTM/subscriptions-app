// initiaze the AWS SDK V3
import AWS from '@aws-sdk/client-s3'
import env from '#start/env'
const S3 = new AWS.S3Client({
  region: env.get('AWS_DEFAULT_REGION') || '',
  credentials: {
    accessKeyId: env.get('AWS_ACCESS_KEY_ID') || '',
    secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY') || '',
  },
})

export default S3
