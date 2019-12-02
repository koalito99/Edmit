import * as React from "react";

interface IExpansionGroupViewModel {
  single?: boolean;
  initialExpandedIds?: string[];
  children: (
    opts: { expandedIds: string[]; setExpanded: (id: string, show: boolean) => void }
  ) => React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}

type ExpansionGroupProps = IExpansionGroupViewModel;

interface IExpansionGroupState {
  expandedIds: string[];
}

export class ExpansionGroup extends React.Component<
  ExpansionGroupProps,
  IExpansionGroupState
  > {
  readonly state = {
    expandedIds: this.props.initialExpandedIds || []
  };

  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        {this.props.children({
          expandedIds: this.state.expandedIds,
          setExpanded: (id, show) => {
            this.setState(oldState => {
              let expandedIds = oldState.expandedIds;
              const index = expandedIds.indexOf(id);

              if (!show) {
                if (index > -1) {
                  expandedIds.splice(index, 1);
                }
              } else {
                if (index === -1) {
                  if (id === "0" || id === "1" || id === "2" || id === "3") {
                    if (typeof window != "undefined") {
                      window.analytics.track('Ask Edmit opened', {
                        questionNumber: id
                      });
                    }
                  }
                  else {
                    if (typeof window != "undefined") {
                      window.analytics.track('College accordion opened', {
                        collegeId: id
                      });
                    }
                  }

                  expandedIds = !this.props.single ? expandedIds.concat([id]) : [id];
                }
              }

              return ({
                expandedIds
              });
            });
          }
        })}
      </div>
    );
  }
}