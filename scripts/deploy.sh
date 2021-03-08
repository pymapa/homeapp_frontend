#!/bin/bash

ENV=$1
CF_ID=$2

S3_BUCKET_NAME=$ENV.pyrypajunpaa.com

echo "Uploading files to $S3_BUCKET_NAME..."
aws s3 sync ../build s3://$S3_BUCKET_NAME/ \
  --acl public-read \
  --exclude service-worker.js \
  --exclude index.html

echo "Uploading service-worker.js"
aws s3 cp ../build/service-worker.js s3://$S3_BUCKET_NAME/service-worker.js \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type application/javascript \
  --acl public-read

# Upload index.html
echo "Uploading index.html"
aws s3 cp ../build/index.html s3://$S3_BUCKET_NAME/index.html \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type text/html \
  --acl public-read

# # Purge the cloudfront cache
# echo "Purging the cache for CloudFront"
# aws cloudfront create-invalidation \
#   --distribution-id $CF_ID \
#   --paths /