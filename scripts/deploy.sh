#!/bin/bash

ENV=$1
CF_ID=$2

S3_BUCKET_NAME=$ENV.pyrypajunpaa.com

echo "Uploading files to $S3_BUCKET_NAME..."
aws s3 sync ../build s3://$S3_BUCKET_NAME/ \
  --acl public-read \
  --exclude service-worker.js \
  --exclude index.html

# # Purge the cloudfront cache
# echo "Purging the cache for CloudFront"
# aws cloudfront create-invalidation \
#   --distribution-id $CF_ID \
#   --paths /