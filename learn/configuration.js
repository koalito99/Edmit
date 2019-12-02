const segmentKey = ""
const siteTitle = "Edmit"
const rootDir = __dirname

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const googleAnalyticsKey = process.env.GOOGLE_ANALYTICS_TOKEN
const siteUrl = process.env.URL
const graphCMSBaseUrl = process.env.GRAPHCMS_BASE_URL
const graphCMSToken = process.env.GRAPHCMS_TOKEN
const generateSitemaps = process.env.GENERATE_SITEMAPS === "true"
const cookieDomain = process.env.GOOGLE_ANALYTICS_COOKIE_DOMAIN
const hubSpotTrackingCode = process.env.HUBSPOT_TRACKING_CODE
const takeShapeApiKey = process.env.TAKESHAPE_API_KEY
const takeShapeApiUrl = process.env.TAKESHAPE_API_URL

module.exports = {
  rootDir,
  googleAnalyticsKey,
  segmentKey,
  siteTitle,
  siteUrl,
  graphCMSBaseUrl,
  graphCMSToken,
  generateSitemaps,
  cookieDomain,
  hubSpotTrackingCode,
  takeShapeApiKey,
  takeShapeApiUrl
};
