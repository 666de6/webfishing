module.exports = function(eleventyConfig) {
  // Define supported languages
  const languages = ['en', 'fr'];
  const defaultLanguage = 'en';

  // Create language-specific collections
  languages.forEach(lang => {
    eleventyConfig.addCollection(`all_${lang}`, function(collectionApi) {
      return collectionApi.getAll().filter(item => item.url.startsWith(`/${lang}/`));
    });
  });

  // Add filter to localize URLs
  eleventyConfig.addFilter("localizeUrl", function(url, lang) {
    // For English (default language), don't add language prefix
    if (lang === defaultLanguage) {
      return url;
    }
    // For other languages, add language prefix
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    return `/${lang}/${cleanUrl}`;
  });

  // Custom filter to remove trailing slashes
  eleventyConfig.addFilter("removeTrailingSlash", function(url) {
    if(url === '/') {
      return url;
    }
    return url.endsWith('/') ? url.slice(0, -1) : url;
  });

  // Copy static files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/01480384acd84e95b204de1360eb8d66.txt");

  // Add filter to check if URL starts with a string
  eleventyConfig.addFilter("startsWith", function(str, prefix) {
    return str.startsWith(prefix);
  });

  // Add filter for ternary operation
  eleventyConfig.addFilter("ternary", function(condition, trueValue, falseValue) {
    return condition ? trueValue : falseValue;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};