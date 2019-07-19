import * as React from "react";
import { Select } from "./Select";
import { Selector } from "./Selector";
import { Stack } from "framer";
import styled from "styled-components";
import { colors } from "./theme";

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.textLight};
  margin-bottom: 5px;
  display: block;
`;

interface Statement {
  type: string;
  properties: {
    ref?: {
      label?: string;
      questionTitle?: string;
      alias?: string;
      key?: string;
    };
  };
}

interface DateSelectorProps {
  statement: Statement;
  label: string;
  options: [{ label: string; key: string; disabled: boolean }];
  onOptionsChange: (key: string, type: string) => void;
  onPickerClick: (key: string) => void;
}

const Field = styled.div`
  width: 100%;
`;

const DateSelector: React.FC<DateSelectorProps> = ({
  label: key,
  onOptionsChange,
  onPickerClick,
  statement,
  options
}) => {
  let subLabel;
  let selectorLabel = `Choose ${statement.type}`;

  if (statement && statement.properties && statement.properties.ref) {
    if (statement.type === "answer") {
      selectorLabel = statement.properties.ref.label;
      subLabel = statement.properties.ref.questionTitle;
    } else {
      selectorLabel = statement.properties.ref.alias;
      subLabel = statement.properties.ref.key;
    }
  }

  return (
    <Field style={{ flex: "1 1 auto", width: "40%" }}>
      <Label>Date {key}</Label>
      <Selector
        label={selectorLabel}
        subLabel={subLabel}
        onClick={() => onPickerClick(key)}
      />
    </Field>
  );
};

interface DateRangeSelectorProps {
  options: [{ label: string; key: string; disabled: boolean }];
  onOptionsChange: (key, type) => void;
  onPickerClick: (key: string) => void;
  statement: {
    from: Statement;
    to: Statement;
  };
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  statement = { from: {}, to: {} },
  ...props
}) => {
  return (
    <Stack
      direction="horizontal"
      width="100%"
      height="auto"
      position="relative"
      style={{
        border: `1px solid ${colors.lightMediumGrey}`,
        borderTop: "none",
        padding: "16px",
        margin: "-26px 0 16px"
      }}
    >
      <DateSelector label="from" statement={statement.from} {...props} />
      <DateSelector label="to" statement={statement.to} {...props} />
    </Stack>
  );
};
