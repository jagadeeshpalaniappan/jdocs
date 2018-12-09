import PropTypes from 'prop-types';
import React from 'react';
import { cx } from 'emotion';

import style from '../styles/footer';

const Footer = props => {
  const { links, copyright, themeStyle = style, customStyle = '' } = props;

  return (
    <footer className={cx(themeStyle, customStyle)}>
      <div className="links" dangerouslySetInnerHTML={{ __html: links }} />
      <div
        className="copyright"
        dangerouslySetInnerHTML={{ __html: copyright }}
      />
    </footer>
  );
};

Footer.propTypes = {
  links: PropTypes.string,
  copyright: PropTypes.string,
  themeStyle: PropTypes.string,
  customStyle: PropTypes.string,
};

export default Footer;
