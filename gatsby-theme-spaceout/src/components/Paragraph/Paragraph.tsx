import styled from '@emotion/styled';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    fontSizeIncrease: state.fontSizeIncrease,
  };
};

const Paragraph = styled.p`
  line-height: 1.756;
  color: ${(p: any) => p.theme.colors.articleText};
  font-family: ${(p: any) => p.theme.fonts.sansSerif};
  transition: ${(p: any) => p.theme.colorModeTransition},
    0.25s var(--ease-in-out-quad);
  margin: 0 auto 35px;
  width: 100%;
  max-width: 1150px;
  font-size: ${(p: any) => 18 * p.fontSizeIncrease}px;

  b {
    font-weight: 800;
  }
`;

export default connect(mapStateToProps)(Paragraph);
