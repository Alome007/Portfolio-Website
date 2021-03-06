import React, { useRef, useState, memo } from 'react';
import styled, { css } from 'styled-components/macro';
import { NavLink, Link } from 'components/Link';
import { Transition } from 'react-transition-group';
import Monogram from 'components/Monogram';
import Icon from 'components/Icon';
import NavToggle from './NavToggle';
import ThemeToggle from './ThemeToggle';
import { media } from 'utils/style';
import { useWindowSize, useAppContext } from 'hooks';
import { navLinks, socialLinks } from './navData';
import { reflow } from 'utils/transition';

const HeaderIcons = () => (
  <HeaderNavIcons>
    {socialLinks.map(({ label, to, url, icon }) => (
      <HeaderNavIconLink as={to && Link} key={label} aria-label={label} to={to} href={url}>
        <HeaderNavIcon icon={icon} />
      </HeaderNavIconLink>
    ))}
  </HeaderNavIcons>
);

function Header(props) {
  const { menuOpen, dispatch } = useAppContext();
  const { location } = props;
  const [hashKey, setHashKey] = useState();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;

  const handleNavClick = () => {
    setHashKey(Math.random().toString(32).substr(2, 8));
  };

  const handleMobileNavClick = () => {
    handleNavClick();
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  const isMatch = ({ match, hash = '' }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <HeaderWrapper role="banner" ref={headerRef}>
      <HeaderLogo
        to={{ pathname: '/', hash: '#intro', state: hashKey }}
        aria-label="Cody Bennett, Designer & Developer"
        onClick={handleMobileNavClick}
      >
        <Monogram highlight />
      </HeaderLogo>
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} />
      <HeaderNav role="navigation">
        <HeaderNavList>
          {navLinks.map(({ label, pathname, hash }) => (
            <HeaderNavLink
              exact
              isActive={match => isMatch({ match, hash })}
              onClick={handleNavClick}
              key={label}
              to={{ pathname, hash, state: hashKey }}
            >
              {label}
            </HeaderNavLink>
          ))}
        </HeaderNavList>
        <HeaderIcons />
      </HeaderNav>
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 0, exit: 500 }}
        onEnter={reflow}
      >
        {status => (
          <HeaderMobileNav status={status}>
            {navLinks.map(({ label, pathname, hash }, index) => (
              <HeaderMobileNavLink
                key={label}
                delay={300 + index * 50}
                status={status}
                onClick={handleMobileNavClick}
                to={{ pathname, hash, state: hashKey }}
              >
                {label}
              </HeaderMobileNavLink>
            ))}
            <HeaderIcons />
            <ThemeToggle isMobile />
          </HeaderMobileNav>
        )}
      </Transition>
      {!isMobile &&
        <ThemeToggle />
      }
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  padding: 0;
  width: 45px;
  z-index: 1024;
  top: var(--spacingOuter);
  left: var(--spacingOuter);
  bottom: var(--spacingOuter);

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    bottom: auto;
  }
`;

const HeaderLogo = styled(Link)`
  display: flex;
  position: relative;
  padding: 10px;
  z-index: 16;
`;

const HeaderNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  max-width: 45px;
  position: relative;
  top: -10px;

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    display: none;
  }
`;

const HeaderNavList = styled.div`
  transform: rotate(-90deg) translate3d(-50%, 0, 0);
  display: flex;
  flex-direction: row-reverse;
`;

const HeaderNavLink = styled(NavLink)`
  padding: 20px;
  color: rgb(var(--rgbTitle) / 0.8);
  text-decoration: none;
  font-weight: var(--fontWeightMedium);
  position: relative;
  transition: color 0.3s ease 0.1s;
  line-height: 1;

  &:hover,
  &:active,
  &:focus,
  &.active {
    color: rgb(var(--rgbText));
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    left: 10px;
    height: 4px;
    background: rgb(var(--rgbAccent));
    transform: scaleX(0) translateY(-2px);
    transition: transform 0.4s var(--curveFastoutSlowin);
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after,
  &.active:after {
    transform: scaleX(1) translateY(-2px);
    transform-origin: left;
  }
`;

const HeaderNavIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 16;

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    flex-direction: row;
    position: absolute;
    bottom: 30px;
    left: 30px;
  }

  @media ${media.mobileLS} {
    left: 20px;
    transform: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderNavIconLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: flex;
  padding: 10px;
`;

const HeaderNavIcon = styled(Icon)`
  fill: rgb(var(--rgbTitle) / 0.6);
  transition: fill 0.4s ease;

  ${/* sc-selector */HeaderNavIconLink}:hover &,
  ${/* sc-selector */HeaderNavIconLink}:focus &,
  ${/* sc-selector */HeaderNavIconLink}:active & {
    fill: rgb(var(--rgbAccent));
  }
`;

const HeaderMobileNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(var(--rgbBackground) / 0.9);
  transform: translate3d(0, ${props => props.status === 'entered' ? 0 : '-100%'}, 0);
  transition-property: transform, background;
  transition-duration: 0.5s;
  transition-timing-function: var(--curveFastoutSlowin);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    display: flex;
  }
`;

const HeaderMobileNavLink = styled(NavLink).attrs({
  active: 'active',
})`
  width: 100%;
  font-size: 22px;
  text-align: center;
  text-decoration: none;
  color: rgb(var(--rgbText));
  padding: 20px;
  transform: translate3d(0, -30px, 0);
  opacity: 0;
  transition: all 0.3s var(--curveFastoutSlowin);
  transition-delay: ${props => props.delay}ms;
  position: relative;
  top: -15px;

  @media ${media.mobileLS} {
    top: auto;
  }

  @media (max-width: 400px) {
    font-size: 18px;
  }

  @media (max-height: 360px) {
    font-size: 18px;
  }

  ${props => props.status === 'entered' && css`
    opacity: 1;
    transform: translate3d(0, 0, 0);
  `}

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 60px;
    left: 60px;
    height: 4px;
    background: rgb(var(--rgbAccent));
    transform: scaleX(0) translateY(-1px);
    transition: transform 0.4s var(--curveFastoutSlowin);
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after {
    transform: scaleX(1) translateY(-1px);
    transform-origin: left;
  }
`;

export default memo(Header);
