import * as React from "react";
import { ConditionAddRemoveBtns } from "./canvas";

import { AnswerOptions, Answer } from "./AnswerOptions";

import { Select } from "./Select";
import { Selector } from "./Selector";
import { Stack } from "framer";

import styled from "styled-components";
import { colors } from "./theme";

const Label = styled.div`
  margin: 0 20px 0 36px !important;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.textLight};
  letter-spacing: 1px;
`;

const displayNameAnswer = answer => answer.label || `Untitled answer`;

interface Props {
  options: [
    {
      label: string;
      key: string;
      disabled: boolean;
    }
  ];
  onSelectConditionType: (index: number, type: string) => void;
  onSelectAnswer: (index: number) => void;
  conditions: [
    {
      type: string;
      properties: {
        ref: Answer;
        comparator: string;
        comparatorOptions: [{ label: string; key: string; disabled: boolean }];
      };
    }
  ];
}

export const DateRangeCondition: React.FC<Props> = ({
  onSelectConditionType,
  onSelectAnswer,
  conditions,
  options
}) => {
  return (
    <div>
      {conditions &&
        conditions.map((condition, index) => {
          let selectorLabel = `Select ${condition.type}`;
          let subLabel;

          const { ref } = condition.properties;

          if (ref) {
            selectorLabel = displayNameAnswer(ref);
            subLabel = ref.questionTitle;
          }

          return (
            <div key={index}>
              <Stack
                position="relative"
                alignment="center"
                direction="horizontal"
                width="100%"
                height="auto"
              >
                <Label>IF</Label>
                <Select
                  type="B"
                  options={options}
                  onChange={(e: React.SyntheticEvent) => {
                    e.persist();
                    let target = e.target as HTMLInputElement;
                    onSelectConditionType(index, target.value);
                  }}
                  style={{ width: "auto" }}
                />
                <Selector
                  label={selectorLabel}
                  subLabel={subLabel}
                  onClick={() => onSelectAnswer(index)}
                  style={{ margin: "0 32px !important" }}
                />
                <ConditionAddRemoveBtns position="relative" />
              </Stack>
              {ref && <AnswerOptions answer={ref} />}
            </div>
          );
        })}
    </div>
  );
};
