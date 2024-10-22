module.exports = ({ env }) => {
  if (env("NODE_ENV") === "production" || env("NODE_ENV") === "test") {
    return {
      upload: {
        config: {
          // breakpoints: {
          //   xxlarge: 2500,
          //   xlarge: 1640,
          //   large: 1000,
          //   medium: 750,
          //   small: 500,
          //   xsmall: 250,
          //   xxsmall: 100
          // },
          provider: "aws-s3", // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
          providerOptions: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
            region: env("AWS_REGION"),
            params: {
              Bucket: env("AWS_BUCKET"),
            },
          },
        },
      },
      "vercel-deploy": {
        enabled: true,
        config: {
          deployHook: env("VERCEL_DEPLOY_PLUGIN_HOOK"),
          apiToken: env("VERCEL_DEPLOY_PLUGIN_API_TOKEN"),
          appFilter: env("VERCEL_DEPLOY_PLUGIN_APP_FILTER"),
          roles: [env("VERCEL_DEPLOY_PLUGIN_ROLES")],
        },
      },
    };
  }

  return {
    "vercel-deploy": {
      enabled: true,
      config: {
        deployHook: env("VERCEL_DEPLOY_PLUGIN_HOOK"),
        apiToken: env("VERCEL_DEPLOY_PLUGIN_API_TOKEN"),
        appFilter: env("VERCEL_DEPLOY_PLUGIN_APP_FILTER"),
        roles: [env("VERCEL_DEPLOY_PLUGIN_ROLES")],
      },
    },
  };
};
