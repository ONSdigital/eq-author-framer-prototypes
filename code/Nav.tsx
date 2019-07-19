import * as React from "react";
import styled, { css } from "styled-components";

import { NavSection, NavPage } from "./canvas";
import { questionnaire } from "./data.json";

const displayName = entity =>
  entity.alias || (entity.title && entity.title.replace(/<[^>]*>?/gm, ""));

const Section = styled.div`
  margin-bottom: 1em;
`;

export const Nav = () => {
  return (
    <div>
      {questionnaire &&
        questionnaire.sections.map(section => (
          <Section key={section.id}>
            <NavSection
              title={displayName(section)}
              position="relative"
              style={{ marginBottom: "0.2em" }}
            />
            <div>
              {section.pages &&
                section.pages.map(page => (
                  <NavPage
                    title={displayName(page)}
                    position="relative"
                    style={{ marginBottom: "0.2em" }}
                  />
                ))}
            </div>
          </Section>
        ))}
    </div>
  );
};
