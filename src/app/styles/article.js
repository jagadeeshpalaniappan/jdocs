import { css } from 'emotion';
import facepaint from 'facepaint';

const breakpoints = [1024, 1280];

const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const article = css`
  margin: 0 auto 30px;

  ${mq({
    maxWidth: ['100%', '100%', '98%'],
  })};
`;

export default article;
