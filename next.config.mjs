/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp3|wav)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/sounds/",
            outputPath: "static/sounds/",
            name: "[name].[hash].[ext]",
          },
        },
      });
  
      return config;
    },
  };
  
export default nextConfig;