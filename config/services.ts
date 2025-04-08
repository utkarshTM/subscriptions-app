import env from '#start/env'

/**
 * This configuration file is used to define the custom services configuration.
 */

interface ServiceConfig {
  app: Record<string, any>
  dtm: Record<string, any>
  reviews: Record<string, any>
  frontend: Record<string, any>
  facebook: Record<string, any>
  google: Record<string, any>
  stripe: Record<string, any>
  activecampaign: Record<string, any>
  aws: Record<string, any>
  cdnscripts: Record<string, any>
  impact: Record<string, any>
  intercom: Record<string, any>
  twilio: Record<string, any>
  mail: Record<string, any>
  paypal: Record<string, any>
  firstPromoter: Record<string, any>
  redis: Record<string, any>
  shopify: Record<string, any>
  database: Record<string, any>
  strapi: Record<string, any>
  website: Record<string, any>
  places: Record<string, any>
  generativeAI: Record<string, any>
  additionalLicense: Record<string, any>
  additionalLicenseLimit: Record<string, any>
  additionalFreeLicenseLimit: Record<string, any>
}

const serviceConfig: ServiceConfig = {
  app: {
    name: env.get('APP_NAME', 'Debutify'),
    environment: env.get('NODE_ENV', 'development'),
    timezone: env.get('TZ', 'UTC'),
    port: env.get('PORT', 3333),
    host: env.get('HOST', 'localhost'),
    logLevel: env.get('LOG_LEVEL', 'info'),
    appKey: env.get('APP_KEY', 'EWRmDzata159snnbFj12fduHO69chzGO'),
    planVersion: env.get('PLAN_VERSION'),
    apiUrl: env.get('API_URL'),
    errorReportEmail: env.get('ERROR_REPORT_EMAIL'),
    limiterStore: env.get('LIMITER_STORE'),
    appEnv: env.get('APP_ENV'),
    annualDiscountCode: env.get('ANNUAL_DISCOUNT_CODE'),
  },
  database: {
    host: env.get('DB_HOST'),
    port: env.get('DB_PORT'),
    user: env.get('DB_USER'),
    password: env.get('DB_PASSWORD'),
    database: env.get('DB_DATABASE'),
  },

  redis: {
    host: env.get('REDIS_HOST', 'localhost'),
    port: Number(env.get('REDIS_PORT', '6379')),
    password: env.get('REDIS_PASSWORD', ''),
    queue: env.get('REDIS_QUEUE', 'default'),
  },
  mail: {
    fromName: env.get('SMTP_FROM_NAME'),
    from: env.get('SMTP_FROM_ADDRESS'),
    host: env.get('SMTP_HOST'),
    port: env.get('SMTP_PORT'),
    secure: env.get('MAIL_SECURE'),
    auth: {
      user: env.get('SMTP_USERNAME'),
      pass: env.get('SMTP_PASSWORD'),
    },
    replyTo: {
      address: env.get('SMTP_REPLY_TO_ADDRESS'),
      name: env.get('SMTP_REPLY_TO_NAME'),
    },
  },
  dtm: {
    url: env.get('DTM_API_URL'),
    prefix: env.get('DTM_API_PREFIX'),
    client_id: env.get('DTM_API_CLIENT_ID'),
    client_secret: env.get('DTM_API_CLIENT_SECRET'),
    frontendUrl: env.get('FRONTEND_DTM_URL'),
  },
  reviews: {
    frontendUrl: env.get('FRONTEND_REVIEW_URL'),
    api_url: env.get('REVIEWS_API_URL'),
  },
  facebook: {
    clientId: env.get('FACEBOOK_CLIENT_ID'),
    clientSecret: env.get('FACEBOOK_CLIENT_SECRET'),
    callbackUrl: env.get('FACEBOOK_REDIRECT_URI'),
  },
  google: {
    clientId: env.get('GOOGLE_CLIENT_ID'),
    clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: env.get('GOOGLE_REDIRECT_URI'),
  },
  frontend: {
    urls: {
      frontendUrl: env.get('FRONTEND_URL'),
      frontendPlatformUrl: env.get('FRONTEND_PLATFORM_URL'),
      verifyEmail: env.get('FRONTEND_URL') + '/verify-email?type=verify-email',
      updateEmail: env.get('FRONTEND_URL') + '/api/auth/verify?type=update-email',
      updatePhone: env.get('FRONTEND_URL') + '/api/auth/verify?type=update-phone',
      resetPassword: env.get('FRONTEND_URL') + '/verify-email?type=reset-password',
      platformUrl: env.get('FRONTEND_PLATFORM_URL') + '/verify-email?type=verify-email',
    },
  },
  shopify: {
    scopes: env.get('SHOPIFY_APP_SCOPES'),
    apiVersion: env.get('SHOPIFY_APP_API_VERSION'),
    webhookUrl: env.get('SHOPIFY_APP_WEBHOOK_URL'),
    SHOPIFY_SECURE_KEY: env.get('SHOPIFY_SECURE_KEY'),
  },
  stripe: {
    activeAccount: env.get('STRIPE_ACTIVE_ACCOUNT'),
    mode: env.get('STRIPE_MODE'),
    model: 'App/Models/User',
    key: env.get('STRIPE_PUBLISHABLE_KEY'),
    secret: env.get('STRIPE_SECRET_KEY'),
    couponId: env.get('DISCOUNT_COUPON_STRIPE'),
    couponIdMonthly: env.get('DISCOUNT_COUPON_STRIPE_MONTHLY'),
    ca: {
      key: env.get('STRIPE_CA_KEY'),
      secret: env.get('STRIPE_CA_SECRET'),
      mix: env.get('MIX_STRIPE_CA_KEY'),
    },
    us: {
      key: env.get('STRIPE_US_KEY'),
      secret: env.get('STRIPE_US_SECRET'),
      mix: env.get('MIX_STRIPE_US_KEY'),
    },
    stripe_active_account: env.get('PRIMARY_STRIPE_ACCOUNT', 'US'),
    webhook: {
      cancelSubscription: env.get('STRIPE_WEBHOOK_SECRET_CANCEL_SUBSCRIPTION'),
      paymentSuccess: env.get('STRIPE_WEBHOOK_SECRET_PAYMENT_SUCESS'),
      renewSubscription: env.get('STRIPE_WEBHOOK_SECRET_RENEW_SUBSCRIPTION'),
      paymentFailed: env.get('STRIPE_WEBHOOK_SECRET_PAYMENT_FAILED'),
      refund: env.get('STRIPE_WEBHOOK_SECRET_REFUND'),
      ca_cancelSubscription: env.get('STRIPE_CA_WEBHOOK_SECRET_CANCEL_SUBSCRIPTION'),
      ca_paymentSuccess: env.get('STRIPE_CA_WEBHOOK_SECRET_PAYMENT_SUCESS'),
      ca_refund: env.get('STRIPE_CA_WEBHOOK_SECRET_REFUND'),
      ca_paymentFailed: env.get('STRIPE_CA_WEBHOOK_SECRET_PAYMENT_FAILED'),
      ca_renewSubscription: env.get('STRIPE_CA_WEBHOOK_SECRET_RENEW_SUBSCRIPTION'),
    },
  },
  firstPromoter: {
    apiKey: env.get('FIRST_PROMOTER_API_KEY'),
  },
  activecampaign: {
    apiUrl: env.get('ACTIVECAMPAIGN_URL'),
    apiKey: env.get('ACTIVECAMPAIGN_API_KEY'),
  },
  aws: {
    region: env.get('AWS_DEFAULT_REGION'),
    accessKeyId: env.get('AWS_ACCESS_KEY_ID') || '',
    secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY') || '',
    bucketName: env.get('AWS_BUCKET'),
    url: env.get('AWS_URL'),
    usePathStyleEndpoint: env.get('AWS_USE_PATH_STYLE_ENDPOINT') || false,
    assetURL: env.get('AWS_ASSET_URL'),
    admin: {
      accessKeyId: env.get('AWS_ADMIN_ACCESS_KEY_ID') || '',
      secretAccessKey: env.get('AWS_ADMIN_SECRET_ACCESS_KEY') || '',
      region: env.get('AWS_ADMIN_DEFAULT_REGION'),
      bucket: env.get('AWS_ADMIN_BUCKET'),
      url: env.get('AWS_ADMIN_URL'),
      usePathStyleEndpoint: env.get('AWS_ADMIN_USE_PATH_STYLE_ENDPOINT') || false,
    },
  },
  cdnscripts: {
    bucket: env.get('AWS_CDN_BUCKET'),
    options: {
      CacheControl: 'max-age=0, no-cache, no-store, must-revalidate',
    },
  },
  impact: {
    username: env.get('IMPACT_USERNAME'),
    password: env.get('IMPACT_PASSWORD'),
    enabled: env.get('IMPACT_ENABLED') || true,
  },
  intercom: {
    url: env.get('INTERCOM_API_URL'),
    token: env.get('INTERCOM_ACCESS_TOKEN'),
    secretKey: env.get('INTERCOM_SECRET_KEY'),
  },
  twilio: {
    accountSid: env.get('TWILIO_ACCOUNT_SID'),
    authToken: env.get('TWILIO_AUTH_TOKEN'),
    from: env.get('TWILIO_PHONE_NUMBER'),
  },
  paypal: {
    mode: env.get('PAYPAL_MODE'),
    sandbox: {
      url: env.get('PAYPAL_SANDBOX_URL'),
      redirectUrl: env.get('PAYPAL_SANDBOX_REDIRECT_URL'),
      ca: {
        clientId: env.get('PAYPAL_CA_SANDBOX_CLIENT_ID'),
        clientSecret: env.get('PAYPAL_CA_SANDBOX_CLIENT_SECRET'),
        webhookId: env.get('PAYPAL_CA_SANDBOX_WEBHOOK_ID'),
      },
      us: {
        clientId: env.get('PAYPAL_US_SANDBOX_CLIENT_ID'),
        clientSecret: env.get('PAYPAL_US_SANDBOX_CLIENT_SECRET'),
        webhookId: env.get('PAYPAL_US_SANDBOX_WEBHOOK_ID'),
      },
      clientId: env.get('PAYPAL_SANDBOX_CLIENT_ID'),
      clientSecret: env.get('PAYPAL_SANDBOX_CLIENT_SECRET'),
    },
    // PayPal Live Variables
    live: {
      url: env.get('PAYPAL_LIVE_URL'),
      redirectUrl: env.get('PAYPAL_LIVE_REDIRECT_URL'),
      ca: {
        clientId: env.get('PAYPAL_CA_LIVE_CLIENT_ID'),
        clientSecret: env.get('PAYPAL_CA_LIVE_CLIENT_SECRET'),
        webhookId: env.get('PAYPAL_CA_LIVE_WEBHOOK_ID'),
      },
      us: {
        clientId: env.get('PAYPAL_US_LIVE_CLIENT_ID'),
        clientSecret: env.get('PAYPAL_US_LIVE_CLIENT_SECRET'),
        webhookId: env.get('PAYPAL_US_LIVE_WEBHOOK_ID'),
      },
      clientId: env.get('PAYPAL_LIVE_CLIENT_ID'),
    },
    verifyWebhookData: env.get('PAYPAL_VERIFY_WEBHOOK_DATA'),
  },
  strapi: {
    appUrl: env.get('STRAPI_ADMIN_APP_URL'),
    appToken: env.get('STRAPI_ADMIN_APP_TOKEN'),
    appVersionEndpoint: env.get('STRAPI_ADMIN_APP_VERSION_ENDPOINT'),
    storageTime: env.get('STRAPI_CACHE_STORAGE_TIME'),
  },
  website: {
    appUrl: env.get('WEBSITE_APP_URL'),
    webhook: env.get('WEBSITE_WEBHOOK'),
  },
  places: {
    placesKey: env.get('PLACES_API_KEY'),
  },
  generativeAI: {
    apiKey: env.get('GEMINI_API_KEY'),
  },
  additionalLicense: {
    growthAdditonalVersion: env.get('GROWTH_ADDITIONAL_LICENSE_VERSION'),
    professionalAdditionalVersion: env.get('PROFESSIONAL_ADDITIONAL_LICENSE_VERSION'),
    enterpriseAdditionalVersion: env.get('ENTERPRISE_ADDITIONAL_LICENSE_VERSION'),
  },
  additionalLicenseLimit: {
    growthAdditonalLimit: env.get('GROWTH_ADDITIONAL_LICENSE_LIMIT'),
    professionalAdditionalLimit: env.get('PROFESSIONAL_ADDITIONAL_LICENSE_LIMIT'),
    enterpriseAdditionalLimit: env.get('ENTERPRISE_ADDITIONAL_LICENSE_LIMIT'),
  },
  additionalFreeLicenseLimit: {
    growthFreeAdditonalLimit: env.get('GROWTH_ADDITIONAL_FREE_LICENSE_LIMIT'),
    professionalFreeAdditionalLimit: env.get('PROFESSIONAL_ADDITIONAL_FREE_LICENSE_LIMIT'),
    enterpriseFreeAdditionalLimit: env.get('ENTERPRISE_ADDITIONAL_FREE_LICENSE_LIMIT'),
    enterpriseMonthlyFreeAdditionalLimit: env.get(
      'ENTERPRISE_MONTHLY_ADDITIONAL_FREE_LICENSE_LIMIT'
    ),
  },
}
export default serviceConfig
