import * as React from "react";

import { questionnaire } from "./data.json";

import { MetadataPickerItem, MetadataPickerItemSelected } from "./canvas";

const { metadata } = questionnaire;

interface PickerItemProps {
  type: string;
  selected: boolean;
  dataKey: string;
  value: string;
  alias: string;
  position: string;
  style?: object;
  onClick: Function;
  disabled: boolean;
}

interface MetadataPickerItemsProps {
  onSelectMetadata: (e) => {};
  allowedType: string;
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
    <MetadataPickerItemSelected
      {...rest}
      {...newStyle}
      onClick={!disabled ? onClick : undefined}
    />
  ) : (
    <MetadataPickerItem
      {...rest}
      {...newStyle}
      onClick={!disabled ? onClick : undefined}
    />
  );
};

export const MetadataPickerItems = ({
  onSelectMetadata,
  allowedType = "Date"
}) => {
  const [selected, setSelected] = React.useState();

  if (!metadata) {
    return null;
  }

  return (
    <div>
      {metadata.map(data => {
        console.log(data.type, allowedType);

        return (
          <PickerItem
            onClick={() => {
              setSelected(data.id);
              onSelectMetadata(data);
            }}
            selected={selected === data.id}
            key={data.id}
            dataKey={data.key}
            alias={data.alias}
            type={data.type.toUpperCase()}
            value={data.textValue || data.dateValue}
            position="relative"
            disabled={allowedType !== data.type}
          />
        );
      })}
    </div>
  );
};
