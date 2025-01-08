import {IGatsbyImageData} from 'gatsby-plugin-image';

export type FileNodeType = {
  base: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
};
