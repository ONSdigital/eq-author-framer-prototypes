import * as React from "react";

import styled, { css } from "styled-components";

import { addPropertyControls, ControlType } from "framer";
import { colors } from "./theme";

const TabBackground = styled.div`
  background: #f5f5f5;
  border: 1px solid #d3d3d3;
  font-size: 14px;
  color: #4c4c4c;
  padding: 8px 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lato";
  flex: 1 0;
  position: relative;
  cursor: pointer;

  &:not(:last-of-type) {
    border-right: none;
  }

  &:hover {
    &:before {
      position: absolute;
      content: " ";
      top: -1px;
      left: -1px;
      right: -1px;
      height: 5px;
      background: ${colors.primary};
    }
  }

  ${props =>
    props.active &&
    css`
      background: white;
      border-bottom: none;
      &:before {
        position: absolute;
        content: " ";
        top: -1px;
        left: -1px;
        right: -1px;
        height: 5px;
        background: ${colors.primary};
        z-index: 2;
      }
    `}
`;

const Icon = styled.div`
  font-weight: bold;
`;

const Title = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: -8px;
`;

interface Props {
  title: string;
  icon: any;
  onClick: any;
  active: boolean;
}

export const Tab: React.FC<Props> = ({ icon, title, onClick, active }) => (
  <TabBackground onClick={onClick} active={active}>
    <Icon>{icon && icon()}</Icon>
    <Title>{title}</Title>
  </TabBackground>
);

addPropertyControls(Tab, {
  title: {
    type: ControlType.String,
    title: "Title"
  },
  active: { type: ControlType.Boolean, title: "active" }
});
