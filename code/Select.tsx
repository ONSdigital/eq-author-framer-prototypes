import * as React from "react";
import styled, { css } from "styled-components";
import { addPropertyControls, ControlType } from "framer";
import { colors } from "./theme";

const iconA =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5pY29uLWRyb3Bkb3duPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9Imljb24tZHJvcGRvd24iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPHBhdGggZD0iTTE1LjgyLDIxLjY2IEwxOC40OCwxOSBMMTkuNjQsMjAuMTggTDE1LjgyLDI0IEwxMiwyMC4xOCBMMTMuMTYsMTkgTDE1LjgyLDIxLjY2IFogTTE1LjgyLDExLjM0IEwxMy4xNiwxNCBMMTIsMTIuODIgTDE1LjgyLDkgTDE5LjY0LDEyLjgyIEwxOC40OCwxNCBMMTUuODIsMTEuMzQgWiIgaWQ9InVuZm9sZF9tb3JlLS0tbWF0ZXJpYWwiIGZpbGw9IiM0QTRBNEEiPjwvcGF0aD4gICAgPC9nPjwvc3ZnPg==";

const iconB =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgdmlld0JveD0iMCAwIDEwIDUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTS44Mi4zMmg4LjM2TDUgNC41eiIgZmlsbD0iIzY2NiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+";

const select = css`
  appearance: none;
  font-size: 16px;
  font-family: "Lato";
  line-height: 1.3;
  cursor: pointer;
  height: 38px;
  width: 100%;
  flex: 0 1;
  padding: 7px 36px 7px 16px;
`;

const SelectA = styled.select`
  ${select};
  padding-left: 8px;
  background: #fff url(${iconA}) no-repeat right 0 center;
  border: 1px solid ${colors.borders};
  border-radius: 3px;
  line-height: 1;

  &:hover {
    border-color: ${colors.primary};
  }
`;

const SelectB = styled.select`
  ${select};

  background: #e4e8eb url(${iconB}) no-repeat right 1em center;
  border: none;
  border-radius: 72px;

  &:hover {
    background-color: ${colors.lightGrey};
  }
`;

interface Props {
  options: [{ label: string; key: string; disabled: boolean }];
  type: any;
  onChange: (e: object) => void;
  style?: object;
}

export const Select: React.FC<Props> = ({
  type,
  options,
  onChange,
  ...rest
}) => {
  const SelectType = type === "A" ? SelectA : SelectB;

  return (
    <SelectType onChange={onChange} {...rest}>
      {options ? (
        options.map(option => (
          <option
            value={option.key}
            key={option.key}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))
      ) : (
        <option value="" key="select">
          Select
        </option>
      )}
    </SelectType>
  );
};

addPropertyControls(Select, {
  type: {
    type: ControlType.SegmentedEnum,
    title: "Enum",
    options: ["A", "B"],
    optionTitles: ["Type A", "Type B"],
    defaultValue: "A"
  }
});
