import React, { useEffect, useContext, useMemo, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../app/App';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/Hooks';
import { LinkButton } from '../components/Button';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage, ProjectBackground, ProjectHeader,
  ProjectSectionHeading, ProjectSectionText, ProjectTextRow,
} from '../components/Project';
import { media } from '../utils/StyleUtils';
import Background from '../assets/placeholder.png';
import BackgroundLarge from '../assets/placeholder.png';
import BackgroundPlaceholder from '../assets/placeholder.png';
import MystGangPlaceholder from '../assets/MystGang/placeholder.png';
import { ReactComponent as MystLogo } from '../assets/MystGang/logo.svg';

const DisplacementSlider = lazy(() => import('../components/DisplacementSlider'));

const prerender = navigator.userAgent === 'ReactSnap';

const title = 'MystGang 2019 - WIP';
const description = 'Bringing an epic content creator\'s portfolio to life with ThreeJS.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  'Visual Design',
  'UI / UX Design',
  'Branding & Identity',
  'Creative Direction',
  '3D Animation',
];

function Project() {
  const { status, updateTheme, currentTheme } = useContext(AppContext);
  const currentThemeRef = useRef(currentTheme);
  useScrollToTop(status);

  useEffect(() => {
    currentThemeRef.current = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    if ((status === 'entered' || status === 'exiting')) {
      updateTheme({
        colorPrimary: currentTheme.id === 'dark'
          ? 'rgba(227, 203, 161, 1)'
          : 'rgba(181, 155, 105, 1)',
        colorAccent: 'rgba(227, 203, 161, 1)',
      });
    }

    return function cleanUp() {
      if (status !== 'entered') {
        updateTheme();
      }
    };
  }, [updateTheme, status, currentTheme.id]);

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${Background} 1000w, ${BackgroundLarge} 1600w`}
          placeholder={BackgroundPlaceholder}
          opacity={0.5}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="View Website"
          url="https://mystgang.ml"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${MystGangPlaceholder} 800w, ${MystGangPlaceholder} 1100w`}
                placeholder={MystGangPlaceholder}
                alt=""
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProgressiveImage
              srcSet={`${MystGangPlaceholder} 480w, ${MystGangPlaceholder} 960w`}
              placeholder={MystGangPlaceholder}
              alt=""
              sizes={`(max-width: ${media.mobile}) 90vw, (max-width: ${media.tablet}) 80vw, 70vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProgressiveImage
              srcSet={`${MystGangPlaceholder} 400w, ${MystGangPlaceholder} 800w`}
              placeholder={MystGangPlaceholder}
              alt="A 3D render of the full suit of armor."
              sizes={`(max-width: ${media.mobile}) 100vw, (max-width: ${media.tablet}) 100vw, 50vw`}
            />
            <TextSection>
              <ProjectSectionHeading>Title</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
            </TextSection>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <LogoContainer>
              <MystLogo />
            </LogoContainer>
            <ProjectTextRow center>
              <ProjectSectionHeading>Identity</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionSlider>
            <Suspense fallback={<React.Fragment />}>
              <DisplacementSlider
                placeholder={MystGangPlaceholder}
                images={useMemo(() => [
                  {
                    src: Slide1,
                    srcset: `${MystGangPlaceholder} 960w, ${MystGangPlaceholder} 1920w`,
                    alt: ''
                  },
                  {
                    src: Slide2,
                    srcset: `${MystGangPlaceholder} 960w, ${MystGangPlaceholder} 1920w`,
                    alt: '',
                  },
                  {
                    src: Slide3,
                    srcset: `${MystGangPlaceholder} 960w, ${MystGangPlaceholder} 1920w`,
                    alt: '',
                  },
                ], [])}
                width={useMemo(() => 1920, [])}
                height={useMemo(() => 1080, [])}
              />
            </Suspense>
          </ProjectSectionSlider>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Title</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
              <LinkButton
                secondary
                icon="chevronRight"
                href="#"
              >
                Link
              </LinkButton>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

const ProjectSectionSlider = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 70px;
  margin: 0;
`;

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 0;

  @media (max-width: ${media.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colorBackground};
  padding: ${props => props.theme.id === 'light' ? '60px' : 0} 80px;
  margin-bottom: 80px;
  width: 100%;

  @media (max-width: ${media.mobile}) {
    padding: ${props => props.theme.id === 'light' ? '30px' : 0} 40px;
    margin-bottom: 40px;
  }

  svg {
    max-width: 400px;
  }
`;

export default Project;