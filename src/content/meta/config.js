const base = {
  name: `Jagadeesh Palaniappan`,
  url: 'https://github.com/greglobinski/gatsby-starter-kit'
};

const config = {
  /* meta tags */
  siteTitle: `${base.name}'s - Knowledge Store`,
  siteTitlePostfix: ` - ${base.name}`,
  siteDescription: `${base.name} knowledge sharing portal.`,
  siteImage: 'preview.jpg',
  siteLanguage: 'en',

  /* site header */
  headerTitle: `${base.name}'s`,
  headerSubTitle: 'Knowledge Store',

  /* url */
  siteUrl: base.url
  // pathPrefix: '',
};

module.exports = config;
