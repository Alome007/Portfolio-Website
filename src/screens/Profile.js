import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import Anchor from '../components/Anchor';
import { RouterButton } from '../components/Button';
import DecoderText from '../components/DecoderText';
import Divider from '../components/Divider';
import ProgressiveImage from '../components/ProgressiveImage';
import ProfileImg from '../assets/profile.jpg';
import ProfileImgLarge from '../assets/profile-large.jpg';
import ProfileImgPlaceholder from '../assets/profile-placeholder.jpg';
import { media, sectionPadding } from '../utils/StyleUtils';

const ProfileText = ({ status, titleId }) => (
  <React.Fragment>
    <ProfileTitle status={status} id={titleId}>
      <DecoderText
        text="Hi"
        start={status !== 'exited'}
        offset={140}
      />
    </ProfileTitle>
    <ProfileDescription status={status}>
      I’m Cody. I create compelling designs that I bring to life with the web's coolest technologies that look perfect on every screen.
    </ProfileDescription>
    <ProfileDescription status={status}>
      In my spare time, I like to create and play video games, play Magic: The Gathering, and <Anchor as={Link} to="/lab">experiment with new tech</Anchor>. I’m always interested in new projects, so feel free to drop me a line.
    </ProfileDescription>
  </React.Fragment>
);

function Profile(props) {
  const { id, visible, sectionRef } = props;
  const titleId = `${id}-title`;

  return (
    <ProfileSection
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition
        in={visible}
        timeout={0}
        onEnter={node => node && node.offsetHeight}
      >
        {status => (
          <ProfileContent>
            <ProfileColumn>
              <ProfileText status={status} titleId={titleId} />
              <ProfileButton
                secondary
                status={status}
                to="/contact"
                icon="send"
              >
                Send me a message
              </ProfileButton>
            </ProfileColumn>
            <ProfileColumn>
              <ProfileTag aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <ProfileTagText status={status}>About Me</ProfileTagText>
              </ProfileTag>
              <ProfileImage
                reveal
                delay={100}
                visible={visible}
                placeholder={ProfileImgPlaceholder}
                srcSet={`${ProfileImg} 480w, ${ProfileImgLarge} 960w`}
                sizes={`(max-width: ${media.mobile}) 100vw, 480px`}
                alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
              />
            </ProfileColumn>
          </ProfileContent>
        )}
      </Transition>
    </ProfileSection>
  );
};

const ProfileSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  margin-top: 60px;
  margin-bottom: 40px;
  padding-top: 60px;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 220px;
  display: flex;
  justify-content: center;
  ${sectionPadding}

  &:focus {
    outline: none;
  }

  @media (min-width: ${media.desktop}) {
    padding-left: 120px;
  }

  @media (max-width: ${media.tablet}) {
    padding-top: 50px;
    padding-right: 80px;
    padding-left: 160px;
    height: auto;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  @media (max-width: ${media.mobile}) {
    margin-top: 0;
    padding-top: 90px;
    padding-left: 25px;
    padding-right: 25px;
    overflow-x: hidden;
  }

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
    padding-right: ${props => props.theme.spacingOuter.mobile};
    padding-left: ${props => props.theme.spacingOuter.mobile};
  }

  @media ${media.mobileLS} {
    padding-right: 100px;
    padding-left: 100px;
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 44% 48%;
  grid-column-gap: 8%;
  max-width: ${props => props.theme.maxWidthLaptop}px;
  width: 100%;

  @media (min-width: ${media.desktop}) {
    max-width: ${props => props.theme.maxWidthDesktop}px;
  }

  @media (max-width: ${media.tablet}) {
    max-width: 600px;
  }

  @media (max-width: ${media.tablet}) {
    grid-template-columns: 100%;
  }
`;

const ProfileColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  transform: translate3d(0, 0, 0);
`;

const ProfileTitle = styled.h2`
  font-size: 42px;
  margin: 0;
  font-weight: 500;
  margin-bottom: 40px;
  white-space: nowrap;
  opacity: ${props => props.status === 'entered' ? 1 : 0};
  transition: opacity 0.8s ease 0.4s;
  color: ${props => props.theme.colorTitle};

  @media (max-width: 1245px) {
    font-size: 36px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const ProfileDescription = styled.p`
  font-size: 22px;
  line-height: 1.4;
  margin: 0;
  margin-bottom: 30px;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}

  @media (max-width: ${media.mobile}) {
    font-size: 18px;
  }
`;

const ProfileTag = styled.div`
  margin-top: 220px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 12px;
  align-items: center;

  @media (max-width: ${media.tablet}) {
    margin-top: 30px;
  }
`;

const ProfileTagText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colorPrimary};
  transform: translateX(-10px);
  opacity: 0;
  transition-property: opacity, transform;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.4s;
  transition-delay: 1.3s;

  ${props => props.status === 'entered' && css`
    transform: translateX(0);
    opacity: 1;
  `}
`;

const ProfileImage = styled(ProgressiveImage)`
  max-width: 100%;
  width: 960px;
  height: auto;
`;

const ProfileButton = styled(RouterButton)`
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}
`;

export default React.memo(Profile);
