import * as React from "react";
import { ExpansionGroup } from "@edmit/component-library/src/components/atoms/expansion-group";
import { IReportCollege } from "./shared";

interface IAccordionCollege {
  college: IReportCollege;
  expanded: boolean;
  title: string;
  imageSrc: string | null;
  onOpen: () => void;
  abbreviation: string;
  key: string;
}

interface ICollegeAccordionProps {
  colleges: IReportCollege[]
  children: (accordionCollege: IAccordionCollege) => any;
}

export const CollegeAccordion: React.SFC<ICollegeAccordionProps> = ({ colleges, children }) => {
  return (
    <ExpansionGroup single>
      {({ expandedIds, setExpanded }) => (
        <div>
          {
            colleges.map(
              (college) => {
                const expanded = expandedIds.indexOf(college.id) > -1

                return children({
                  abbreviation: college.abbreviation,
                  college,
                  expanded,
                  imageSrc: college.logoSrc,
                  key: college.id,
                  onOpen: () => setExpanded(college.id, !expanded),
                  title: college.name
                })
              })
          }
        </div>
      )}
    </ExpansionGroup>
  )
}