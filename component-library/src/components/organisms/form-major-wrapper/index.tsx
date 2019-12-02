import * as React from 'react';
import Card from '../../atoms/card';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import FormFieldSelect from '../../atoms/form/form-field-select';

export interface IMajorFormWrapperViewModel {
  values: {
    majorId: string | null;
  };

  majors: Array<{
    id: string;
    name: string;
  }>;

  children: (form: JSX.Element, values: { majorId: string | null }) => JSX.Element;

  loading: boolean;
}

export interface IMajorFormWrapperActions {
  updateProfile: (
    values: {
      majorId: string | null;
    }
  ) => Promise<void>;
}

type MajorFormWrapperProps = IMajorFormWrapperViewModel & IMajorFormWrapperActions;

const MajorFormWrapper: React.SFC<MajorFormWrapperProps> = props => (
  <div>
    {props.loading ? (
      <>
        {props.children(
          <div className="dn db-l nt3 nb3" style={{ width: 300 }}>
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>,
          { majorId: null }
        )}
      </>
    ) : (
      <>
        {props.children(
          <Card className="pa3 dib mb4">
            <FormFieldSelect
              name={'major-id'}
              label={'Major or Field of Study:'}
              value={props.values.majorId || undefined}
              required={false}
              onSelect={async majorId => {
                await props.updateProfile({
                  majorId
                });
              }}
              errorInTooltip
            >
              <option>All majors</option>
              {props.majors.map(major => (
                <option
                  selected={major.id === props.values.majorId}
                  key={major.id}
                  value={major.id}
                >
                  {major.name}
                </option>
              ))}
            </FormFieldSelect>
          </Card>,
          { majorId: props.values.majorId }
        )}
      </>
    )}
  </div>
);

export default MajorFormWrapper;
