import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

// import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prism-themes/themes/prism-vs.css';
import 'prism-themes/themes/prism-ghcolors.css';

import '../app/styles/variables';
import '../app/styles/global';

import '../templates/index.css';

import Article from '../app/components/Article';
import Branding from '../app/components/Branding';
import Bodytext from '../app/components/Bodytext';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';
import Heading from '../app/components/Heading';
import Layout from '../app/components/Layout';
import Menu from '../app/components/Menu';
import Seo from '../app/components/Seo';
import Sidebar from '../app/components/Sidebar';
import layoutSidebar from '../app/styles/layoutSidebar';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';
import categoryList from 'content/meta/categories';

const PageTemplate = props => {
  const {
    location: { pathname },
    data: {
      page: {
        html: pageHTML,
        frontmatter: { title },
        fields: { slug, source },
        excerpt,
      },
      pages: { edges: nodePages },
      footerLinks: { html: footerLinksHTML },
      copyright: { html: copyrightHTML },
    },
  } = props;

  const {
    headerTitle,
    headerSubTitle,
    siteUrl,
    siteLanguage,
    siteTitlePostfix,
  } = config;

  const pages = nodePages.map(item => item.node);
  const layoutStyle = source === 'docs' ? layoutSidebar : undefined;

  return (
    <React.Fragment>
      {layoutStyle && (
        <Sidebar
          title="Table of content"
          pages={pages}
          categoryList={categoryList}
          pathname={slug}
        />
      )}
      <Layout themeStyle={layoutStyle}>
        <Header>
          <Branding title={headerTitle} subTitle={headerSubTitle} />
          <Menu items={menuItems} />
        </Header>
        <Article>
          <Heading title={title} />
          <Bodytext html={pageHTML}/>
        </Article>
        <Footer links={footerLinksHTML} copyright={copyrightHTML} />
        <Seo
          url={`${siteUrl}${slug}`}
          language={siteLanguage}
          title={`${title}${siteTitlePostfix}`}
          description={excerpt}
        />
      </Layout>
    </React.Fragment>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fileAbsolutePath
      fields {
        slug
        prefix
        source
      }
      frontmatter {
        title
        categories
      }
    }
    pages: allMarkdownRemark(
      filter: { fields: { source: { eq: "docs" } } }
      sort: { fields: [fields___prefix] }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            shortTitle
            categories
          }
          headings {
            value
            depth
          }
          tableOfContents
        }
      }
    }
    footerLinks: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/footerLinks/" }
    ) {
      html
    }
    copyright: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/copyright/" }
    ) {
      html
    }
  }
`;
