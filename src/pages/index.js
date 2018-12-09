import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import '../app/styles/variables';
import '../app/styles/global';

import Branding from '../app/components/Branding';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';
import Hero from '../app/components/Hero';
import Layout from '../app/components/Layout';
import Menu from '../app/components/Menu';
import Seo from '../app/components/Seo';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';

const IndexPage = props => {
  const {
    data: {
      footerLinks: { html: footerLinksHTML },
      hero: { html: heroHTML },
      copyright: { html: copyrightHTML },
      logo: {
        childImageSharp: { fluid: logoFluid },
      },
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

  return (
    <Layout>
      <Header>
        <Branding title={headerTitle} subTitle={headerSubTitle} />
        <Menu items={menuItems} />
      </Header>
      <Hero>
        <Img fluid={logoFluid} className="image" />
        <div dangerouslySetInnerHTML={{ __html: heroHTML }} />
      </Hero>
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

export default IndexPage;

export const query = graphql`
  query {
    logo: file(relativePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
