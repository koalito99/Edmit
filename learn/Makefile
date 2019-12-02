deploy-learn-prod:
	rm -rf public && \
	yarn build && \
	aws s3 sync public \
		s3://edmit-learn-production-spa-bucket-13oeezai89m76 \
		--profile edmit-prod && \
	aws configure set preview.cloudfront true \
		--profile edmit-prod && \
	aws cloudfront create-invalidation \
		--distribution-id E21YG9RH2BFEI0 \
		--paths "/*" \
		--profile edmit-prod
