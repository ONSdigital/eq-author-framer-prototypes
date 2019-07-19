import { Override, Data } from "framer";

const ANSWER: string = "answer";
const METADATA: string = "metadata";
const VARIABLE: string = "variable";

const DATE_RANGE: string = "DateRange";
const RADIO: string = "Radio";
const TEXT: string = "Text";
const DATE: string = "Date";

import { merge } from "lodash";

const displayNameAnswer = answer => answer.label || `Untitled  answer`;

const ifOptions = {
  [ANSWER]: [
    {
      label: "Equals any of",
      key: "equals",
      disabled: false
    },
    {
      label: "Not answered",
      key: "not-answered",
      disabled: false
    }
  ],
  [METADATA]: [
    {
      label: "Equals any",
      key: "equals",
      disabled: false
    },
    {
      label: "Is defined",
      key: "defined",
      disabled: false
    },
    {
      label: "Is not defined",
      key: "undefined",
      disabled: false
    }
  ],
  [VARIABLE]: [
    {
      label: "Equals",
      key: "equals",
      disabled: false
    },
    {
      label: "Not equals",
      key: "not",
      disabled: false
    }
  ]
};

const answerPicker = Data({
  visible: false,
  allowedAnswerType: RADIO,
  selectedAnswer: null,
  ref: (answer: object): void => {}
});

const metadataPicker = Data({
  visible: false,
  allowedType: TEXT,
  selectedMetadata: null,
  index: 0,
  ref: (answer: object): void => {}
});

const conditions = Data({
  timestamp: Date.now(),
  if: [
    {
      type: ANSWER,
      properties: {
        ref: null,
        comparatorOptions: ifOptions[ANSWER],
        comparator: ifOptions[ANSWER][0]
      }
    }
  ]
});

const DATE_RANGE_PROPS = {
  from: {
    type: METADATA,
    properties: {
      ref: null
    }
  },
  to: {
    type: METADATA,
    properties: {
      ref: null
    }
  }
};

const ANSWER_PROPS = {
  type: DATE_RANGE,
  ref: null,
  ...DATE_RANGE_PROPS
};

const thenStatement = Data({
  type: ANSWER,
  properties: {
    ...ANSWER_PROPS
  }
});

const ifStatement = Data({
  conditions: conditions.if,
  then: thenStatement
});

const elseStatement = Data({
  timestamp: Date.now(),
  type: ANSWER,
  properties: {
    ...ANSWER_PROPS
  }
});

const variable = Data({
  visible: false,
  name: "",
  description: "",
  type: DATE_RANGE,
  if: ifStatement,
  else: elseStatement
});

export function Canvas(): Override {
  return {};
}

export function TextInput(): Override {
  return {
    onInputChange: (name: string, value: string): void => {
      variable[name] = value;
    }
  };
}

export function ThenElseValues(): Override {
  return {
    options: [
      {
        label: "Equals answer",
        key: "equals",
        disabled: false
      },
      {
        label: "Date range",
        key: "date-range",
        disabled: false
      }
    ]
  };
}

export function IfMetadataValues(): Override {
  return {
    options: [
      {
        label: "Equals",
        key: "equals",
        disabled: false
      }
    ]
  };
}

export function DateRangeOptions(): Override {
  return {
    options: [
      {
        label: "Answer",
        key: ANSWER,
        disabled: false
      },
      {
        label: "Metadata",
        key: METADATA,
        disabled: false
      },
      {
        label: "Variable",
        key: VARIABLE,
        disabled: true
      }
    ]
  };
}

export function ThenSelect(): Override {
  return {
    options: [
      {
        label: "From answer",
        key: ANSWER,
        disabled: false
      },
      {
        label: "From metadata",
        key: DATE_RANGE,
        disabled: false
      }
    ],
    onChange: (e: React.SyntheticEvent) => {
      e.persist();
      const target = e.target as HTMLInputElement;
      ifStatement.then.type = target.value;
    }
  };
}

export function ElseSelect(): Override {
  return {
    defaultValue: elseStatement.type,
    options: [
      {
        label: "From answer",
        key: ANSWER,
        disabled: false
      },
      {
        label: "From two dates",
        key: DATE_RANGE,
        disabled: false
      }
    ],
    onChange: (e: React.SyntheticEvent) => {
      e.persist();
      const target = e.target as HTMLInputElement;
      elseStatement.type = target.value;
    }
  };
}

const thenElseSelector = statement => {
  return {
    onClick: (e: React.SyntheticEvent): void => {
      answerPicker.allowedAnswerType = DATE_RANGE;
      answerPicker.visible = true;
      answerPicker.ref = answer => (statement.properties.ref = answer);
    },
    visible: statement.type !== DATE_RANGE,
    label: statement.properties.ref
      ? displayNameAnswer(statement.properties.ref)
      : "Select an answer",
    subLabel:
      statement.properties.ref && statement.properties.ref.questionTitle,
    statement
  };
};

export function ThenSelector(): Override {
  return thenElseSelector(thenStatement);
}

export function ElseSelector(): Override {
  return thenElseSelector(elseStatement);
}

const DateRangeThenElse = statement => ({
  visible: statement.type === DATE_RANGE,
  statement: statement.properties,
  allowedType: metadataPicker.allowedType,
  options: [
    {
      label: "Answer",
      key: ANSWER,
      disabled: true
    },
    {
      label: "Metadata",
      key: METADATA,
      disabled: false
    },
    {
      label: "Variable",
      key: VARIABLE,
      disabled: true
    }
  ],
  onOptionsChange: (key, type) => {
    statement.properties = merge(statement.properties, {
      [key]: { type }
    });
  },
  onPickerClick: key => {
    const { type } = statement.properties[key];

    if (type === ANSWER) {
      answerPicker.ref = answer => {
        statement.properties[key].properties.ref = answer;
      };
      answerPicker.visible = true;
    } else {
      metadataPicker.allowedType = DATE;
      metadataPicker.visible = true;
      metadataPicker.ref = metadata => {
        statement.properties[key].properties.ref = metadata;
      };
    }
  }
});

export function DateRangeThen(): Override {
  return DateRangeThenElse(thenStatement);
}

export function DateRangeElse(): Override {
  return DateRangeThenElse(elseStatement);
}

export function MetadataPicker(): Override {
  return {
    visible: metadataPicker.visible
  };
}

export function MetadataPickerSelect(): Override {
  return {
    onClick: (e: React.SyntheticEvent): void => {
      metadataPicker.visible = false;
      metadataPicker.ref(metadataPicker.selectedMetadata);
    }
  };
}

export function MetadataPickerCancel(): Override {
  return {
    onClick: (e: React.SyntheticEvent): void => {
      metadataPicker.visible = false;
    }
  };
}

export function MetadataPickerItem(): Override {
  return {
    onSelectMetadata: (metadata): void => {
      metadataPicker.selectedMetadata = metadata;
    },
    allowedType: metadataPicker.allowedType
  };
}

export function AnswerPicker(): Override {
  return {
    visible: answerPicker.visible
  };
}

export function AnswerPickerSelect(): Override {
  return {
    onClick: (e: React.SyntheticEvent): void => {
      answerPicker.visible = false;
      answerPicker.ref(answerPicker.selectedAnswer);
    }
  };
}

export function AnswerPickerCancel(): Override {
  return {
    onClick: (e: React.SyntheticEvent): void => {
      answerPicker.visible = false;
      answerPicker.selectedAnswer = null;
    }
  };
}

export function AnswerPickerItems(): Override {
  return {
    onSelectAnswer: (answer): void => {
      answerPicker.selectedAnswer = answer;
    },
    allowedType: answerPicker.allowedAnswerType
  };
}

export function MetadataPickerItems(): Override {
  return {
    onSelectMetadata: (metadata): void => {
      metadataPicker.selectedMetadata = metadata;
    }
  };
}

export function DateRangeCondition(): Override {
  return {
    height: "auto",
    onSelectAnswer: (index): void => {
      answerPicker.allowedAnswerType = RADIO;
      answerPicker.visible = true;
      answerPicker.ref = answer =>
        (conditions.if[index].properties.ref = answer);
    },
    onSelectConditionType: (index, type): void => {
      conditions.if[index] = merge({
        properties: {
          comparatorOptions: ifOptions[type],
          comparator: ifOptions[type][0],
          ref: null
        }
      });
    },
    conditions: conditions.if,
    options: [
      {
        label: "Answer",
        key: ANSWER,
        disabled: false
      },
      {
        label: "Metadata",
        key: METADATA,
        disabled: true
      },
      {
        label: "Variable",
        key: VARIABLE,
        disabled: true
      }
    ]
  };
}

export function Condition(): Override {
  return {
    label: "Choose an option"
  };
}

export function AddVariableBtn(): Override {
  return {
    onClick: () => {
      variable.visible = true;
    }
  };
}

export function AddVariableConfirm(): Override {
  return {
    onClick: () => {
      variable.visible = false;
    }
  };
}

export function AddVariableCancel(): Override {
  return {
    onClick: () => {
      variable.visible = false;
    }
  };
}

export function ModalAddVariable(): Override {
  return {
    visible: variable.visible
  };
}

export function Scroll(): Override {
  return {
    style: {
      overflowX: "scroll",
      pointerEvents: "auto"
    }
  };
}

export function DateRange(): Override {
  return {
    height: "auto"
  };
}

export function Stack(): Override {
  return {
    height: "auto"
  };
}
