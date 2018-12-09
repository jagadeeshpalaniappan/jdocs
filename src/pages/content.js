import React from 'react';
import { graphql } from 'gatsby';

import '../app/styles/variables';
import '../app/styles/global';

import Article from '../app/components/Article';
import Branding from '../app/components/Branding';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';
import Heading from '../app/components/Heading';
import Layout from '../app/components/Layout';
import List from '../app/components/List';
import Menu from '../app/components/Menu';
import Seo from '../app/components/Seo';


import config from 'content/meta/config';
import menuItems from 'content/meta/menu';
import categoryList from 'content/meta/categories';

const ContentPage = props => {
  const {
    data: {
      pages: { edges: rawPages },
      footerLinks: { html: footerLinksHTML },
      copyright: { html: copyrightHTML },
    },
  } = props;

  const {
    headerTitle,
    headerSubTitle,
    siteUrl,
    siteTitle,
    siteDescription,
    siteLanguage,
  } = config;

  const pages = rawPages.map(page => page.node);

  return (
    <Layout>
      <Header>
        <Branding title={headerTitle} subTitle={headerSubTitle} />
        <Menu items={menuItems} />
      </Header>
      <Article>
        <Heading title="Table of content" />
        <List pages={pages} categoryList={categoryList} />
      </Article>
      <Footer links={footerLinksHTML} copyright={copyrightHTML} />
      <Seo
        url={siteUrl}
        language={siteLanguage}
        title={siteTitle}
        description={siteDescription}
      />
    </Layout>
  );
};

export default ContentPage;

export const query = graphql`
  query {
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
        }
      }
    }
    hero: markdownRemark(fileAbsolutePath: { regex: "/content/parts/hero/" }) {
      html
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
