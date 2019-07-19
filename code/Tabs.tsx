import * as React from "react";
import styled from "styled-components";
import { Tab } from "./Tab";
import { Override, Data } from "framer";

import { addPropertyControls, ControlType } from "framer";

import {
  iconBoolean,
  iconDateRange,
  iconDate,
  iconList,
  iconNumber,
  iconText
} from "./TabIcons";

const tabs = [
  {
    icon: iconBoolean,
    title: "Boolean"
  },
  {
    icon: iconDateRange,
    title: "Date Range"
  },
  {
    icon: iconDate,
    title: "Date"
  },
  {
    icon: iconList,
    title: "List"
  },
  {
    icon: iconNumber,
    title: "Number"
  },
  {
    icon: iconText,
    title: "Text"
  }
];

const TabsContainer = styled.div`
  display: flex;
`;

export const Tabs = props => {
  const [active, setActiveTab] = React.useState(props.activeTab);

  React.useEffect(() => setActiveTab(props.activeTab), [props.activeTab]);

  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          active={parseInt(active, 10) === index}
          onClick={() => setActiveTab(index)}
          {...tab}
        />
      ))}
    </TabsContainer>
  );
};

addPropertyControls(Tabs, {
  activeTab: {
    type: ControlType.Enum,
    defaultValue: "0",
    options: [...Array(tabs.length).keys()].map(x => x.toString()),
    optionTitles: tabs.map(tab => tab.title)
  }
});
