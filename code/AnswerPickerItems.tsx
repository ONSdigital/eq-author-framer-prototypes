import * as React from "react";

import {
  PickerItemUnselected,
  PickerItemSelected,
  PickerAnswerSection
} from "./canvas";

import { questionnaire } from "./data.json";

interface PickerItemProps {
  type: string;
  selected: boolean;
  answer: string;
  question: string;
  position: string;
  style: object;
  onClick: Function;
  disabled: boolean;
}

const PickerItem: React.FC<PickerItemProps> = ({
  selected,
  style,
  disabled,
  onClick,
  ...rest
}) => {
  const newStyle = {
    ...style,
    opacity: disabled ? "0.5" : "1"
  };
  return selected ? (
    <PickerItemSelected
      {...rest}
      {...newStyle}
      onClick={!disabled ? onClick : undefined}
    />
  ) : (
    <PickerItemUnselected
      {...rest}
      {...newStyle}
      onClick={!disabled ? onClick : undefined}
    />
  );
};

const displayName = entity =>
  entity.alias || (entity.title && entity.title.replace(/<[^>]*>?/gm, ""));

const displayNameAnswer = answer => answer.label || `Untitled answer`;

interface AnswerPickerItemsProps {
  onSelectAnswer: Function;
  allowedType: string;
}

export const AnswerPickerItems = ({ onSelectAnswer, allowedType }) => {
  const [selected, setSelected] = React.useState();

  if (!questionnaire) {
    return null;
  }

  return (
    <div>
      {questionnaire.sections.map(section => (
        <div key={section.id}>
          <PickerAnswerSection
            title={displayName(section).toUpperCase()}
            position="relative"
          />
          <div>
            {section.pages &&
              section.pages.map(page => {
                return (
                  page.answers &&
                  page.answers.map(answer => {
                    return (
                      <PickerItem
                        disabled={answer.type !== allowedType}
                        type={answer.type.toUpperCase()}
                        position="relative"
                        answer={displayNameAnswer(answer)}
                        question={displayName(page)}
                        style={{ marginBottom: "-1px" }}
                        selected={selected === answer.id}
                        key={answer.id}
                        onClick={() => {
                          setSelected(answer.id);
                          onSelectAnswer({
                            ...answer,
                            questionTitle: displayName(page)
                          });
                        }}
                      />
                    );
                  })
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};
