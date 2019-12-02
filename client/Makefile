deploy-development:
	yarn build && aws s3 sync build s3://edmit-development-spa-bucket-db73swfregsg --profile edmit-prod && aws configure set preview.cloudfront true --profile edmit-prod && aws cloudfront create-invalidation --distribution-id E3DGFZJE4T4JZC --paths "/*" --profile edmit-prod

deploy-prod:
	yarn build && aws s3 sync build s3://edmit-production-spa-bucket-1uddbcg6eb3tb --profile edmit-prod && aws configure set preview.cloudfront true --profile edmit-prod && aws cloudfront create-invalidation --distribution-id E3LAVWP1OR41A4 --paths "/*" --profile edmit-prod
