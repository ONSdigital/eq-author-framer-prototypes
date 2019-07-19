import * as React from "react";
import styled from "styled-components";

import { Chevron } from "./canvas";
import { colors } from "./theme";
import { addPropertyControls, ControlType } from "framer";

const ChevronIcon = styled(Chevron)`
  height: 32px;
  width: 32px;
  display: block;

  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

const StyledSelector = styled.button`
  height: 38px;
  flex: 1 1;
  appearance: none;
  padding: 1.8px 32px 1.8px 8px;
  border: 1px solid ${colors.borders};
  border-radius: 3px;
  background: white;
  font-size: 16px;
  font-family: "Lato";
  line-height: 1.1;
  width: 100%;
  display: flex;
  align-items: flex-start;
  text-align: left;
  flex-direction: row;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: ${colors.primary};
  }
`;

const Label = styled.div`
  line-height: 1.3;
  white-space: nowrap;
`;

const SubLabel = styled.div`
  line-height: 1.3;
  margin-left: 6px;
  opacity: 0.7;
  overflow: hidden;
  white-space: nowrap;
`;

interface Props {
  label: string;
  subLabel?: string;
  onClick: (e: object) => void;
  style?: object;
}

export const Selector: React.FC<Props> = ({
  label,
  subLabel,
  onClick,
  style
}) => {
  return (
    <StyledSelector onClick={onClick} {...style}>
      <Label>{label}</Label>
      {subLabel && <SubLabel>{subLabel}</SubLabel>}
      <ChevronIcon />
    </StyledSelector>
  );
};

export default Selector;

addPropertyControls(Selector, {
  label: {
    type: ControlType.String,
    defaultValue: "I am some text"
  },
  subLabel: {
    type: ControlType.String,
    defaultValue: "I am some more text"
  }
});
