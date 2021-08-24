export default {
  title: "Wego Health React UI Kit",
  description: "Wego Heatlh React UI Kit",
  filterComponents: files => {
    return files.filter(filepath => /(js|jsx|ts|tsx)$/.test(filepath));
  },
  wrapper: "src/gatsby-theme-docz/wrapper.js",
  htmlContext: {
    head: {
      raw: [
        `
        <style>
          /* Proxima-Nova from TypeKit */
          @import url('https://use.typekit.net/hqb2olm.css');

          /* Roboto From Google */
          @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900');
        </style>
        `
      ]
    }
  }
};
