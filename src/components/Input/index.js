import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import TextArea from 'components/TextArea';
import { useId } from 'hooks';

function Input(props) {
  const { id, label, hasValue, multiline, className, ...restProps } = props;
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;

  return (
    <InputWrapper className={className}>
      <InputLabel
        id={`${inputId}-label`}
        hasValue={!!props.value}
        htmlFor={inputId}
        focused={focused}
      >
        {label}
      </InputLabel>
      <InputElement
        as={multiline ? TextArea : undefined}
        id={inputId}
        aria-labelledby={`${inputId}-label`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...restProps}
      />
      <InputUnderline focused={focused} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
`;

const AutoFillStyle = css`
  -webkit-text-fill-color:  rgb(var(--rgbText));
  box-shadow: 0 0 0px 1000px rgb(var(--rgbTitle) / 0.1) inset;
`;

const InputElement = styled.input`
  background: transparent;
  color: rgb(var(--rgbText));
  box-shadow: inset 0 -2px 0 0 rgb(var(--rgbTitle) / 0.2);
  transition: background-color 5000s linear 0s;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  margin: 0;
  border: 0;
  padding: 24px 0 16px;
  z-index: 16;
  appearance: none;
  border-radius: 0;
  line-height: 1.4;
  overflow-x: hidden;

  @media (prefers-reduced-motion: reduce) {
    #root & {
      transition: background-color 5000s linear 0s;
    }
  }

  &:-internal-autofill-selected {
    ${AutoFillStyle}
  }

  /* Needs to be a single selector to work in safari */
  &:-webkit-autofill {
    ${AutoFillStyle}
  }

  &:focus {
    outline: none;
  }

  &::-webkit-contacts-auto-fill-button:hover {
    background-color: rgb(var(--rgbPrimary));
  }
`;

const InputUnderline = styled.div`
  background: rgb(var(--rgbPrimary));
  transform: scale3d(${props => props.focused ? 1 : 0}, 1, 1);
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  transition: transform 0.4s var(--curveFastoutSlowin);
  transform-origin: left;
`;

const InputLabel = styled.label`
  color: rgb(var(--rgbTitle) / 0.8);
  position: absolute;
  top: 26px;
  left: 0;
  display: block;
  transform-origin: top left;
  transition: transform 0.4s var(--curveFastoutSlowin), color 0.4s ease;

  ${props => (props.hasValue || props.focused) && css`
    color: rgb(var(--rgbTitle) / 0.54);
    transform: scale(0.8) translateY(-28px);
  `}
`;

export default Input;
