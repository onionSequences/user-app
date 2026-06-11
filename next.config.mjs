/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    // @import is deprecated in Dart Sass 3; silence until migrated to @use
    silenceDeprecations: ['import'],
  },
};

export default nextConfig;
