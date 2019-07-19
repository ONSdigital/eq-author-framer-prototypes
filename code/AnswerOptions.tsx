import * as React from "react";
import { Stack } from "framer";
import { Chip } from "./Chip";

export interface Answer {
  description: string;
  guidance: string;
  id: number;
  label: string;
  questionTitle?: string;
  options: [
    {
      additionalAnswer?: any;
      description: string;
      id: number;
      label: string;
      qCode: string;
      value: string;
    }
  ];
}

interface Props {
  answer: Answer;
}

export const AnswerOptions: React.FC<Props> = ({ answer }) => {
  if (!answer || !answer.options) {
    return null;
  }

  return (
    <Stack
      direction="horizontal"
      height="100%"
      width="100%"
      position="relative"
      style={{ margin: "16px 0 0 75px" }}
    >
      {answer.options.map(option => (
        <Chip selected={false} label={option.label} key={option.id} />
      ))}
    </Stack>
  );
};
