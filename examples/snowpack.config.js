/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  plugins: ["@snowpack/plugin-typescript"],
  mount: {
    examples: "/examples",
    public: "/",
    src: "/src",
  },
  buildOptions: {
    baseUrl: "./",
  },
};
