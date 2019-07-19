import * as React from "react";
import styled from "styled-components";

import { addPropertyControls, ControlType } from "framer";

import { colors } from "./theme";

const Input = styled.input`
  font-weight: bold;
  border: 1px solid grey;
  padding: 16px;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid ${colors.borders};
  padding: 8px;
  color: ${colors.black};
  display: block;
  width: 100%;
  font-family: "Lato";
  transition: outline-color 100ms ease-in, border-color 100ms ease-in;
  outline: 1px solid transparent;

  &:hover {
    border-color: ${colors.blue};
    outline-color: ${colors.blue};
  }

  &::placeholder {
    color: #a3a3a3;
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;

interface Props {
  value: string;
  placeHolder: string;
  name: string;
  onInputChange: (name: string, value: string) => void;
}

export const TextInput: React.FC<Props> = ({
  value,
  placeHolder,
  name,
  onInputChange
}) => {
  return (
    <Input
      defaultValue={value}
      placeholder={placeHolder}
      onChange={(e: React.SyntheticEvent) => {
        e.persist();
        const target = e.target as HTMLInputElement;
        onInputChange(name, target.value);
      }}
    />
  );
};

addPropertyControls(TextInput, {
  value: {
    type: ControlType.String,
    defaultValue: ""
  },
  placeHolder: {
    type: ControlType.String,
    defaultValue: "Enter text"
  },
  name: {
    type: ControlType.String
  }
});
