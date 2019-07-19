import * as React from "react";
import styled, { css } from "styled-components";
import { addPropertyControls, ControlType } from "framer";
import { colors } from "./theme";
import { ChipBg, ChipBgSelected } from "./canvas";

interface Props {
  label: string;
  selected: boolean;
}
const selected = css`
  background: ${colors.primary};
  color: white;
`;

const StyledChip = styled.div`
  padding: 0 16px 0 0;
  flex: 0 1 auto;
  position: relative;
  display: flex;
  background: ${colors.lightMediumGrey};
  border-radius: 72px;
  display: flex;
  align-items: center;
  transition: all 100ms;
  ${props => props.selected && selected};
`;

const Label = styled.div`
  font-size: 16px;
  position: relative;
  z-index: 1;
  line-height: 2.2;
`;

export const Chip: React.FC<Props> = ({ selected, label }) => {
  const [selectedState, setSelected] = React.useState(selected);
  const Radio = selectedState ? ChipBgSelected : ChipBg;

  React.useEffect(() => setSelected(selected), [selected]);

  return (
    <StyledChip
      onClick={() => setSelected(!selectedState)}
      selected={selectedState}
    >
      <Radio style={{ position: "relative" }} />
      <Label>{label}</Label>
    </StyledChip>
  );
};

addPropertyControls(Chip, {
  selected: {
    type: ControlType.Boolean,
    title: "Selected",
    defaultValue: false
  },
  label: {
    type: ControlType.String,
    defaultValue: "Label"
  }
});
