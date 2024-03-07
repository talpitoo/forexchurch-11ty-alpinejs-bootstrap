const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Copy the `img` and `css` folders to the output
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("css");
    // eleventyConfig.addPassthroughCopy('src/fonts') // NOTE: not used at the moment
    eleventyConfig.addPassthroughCopy('src/site.webmanifest');
    eleventyConfig.addPassthroughCopy('src/browserconfig.xml');
    eleventyConfig.addPassthroughCopy('src/robots.txt');
    // TODO/DEBUG copy the .json files with dummy data
    eleventyConfig.addPassthroughCopy({"src/_data/brokers": "data/brokers"});

    // Nunjucks for templating
    return {
        dir: {
            input: "src",
            output: "_site"
        },
        templateFormats: ["html", "njk"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
