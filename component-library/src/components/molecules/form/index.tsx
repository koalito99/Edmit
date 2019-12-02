import * as React from 'react';
import JSONForm, { UiSchema } from 'react-jsonschema-form';
import { JSONSchema6 } from 'json-schema';

import widgets from './widgets';
import Text, { ETextType } from '../../atoms/typography/text';
import { hexOffwhite } from '../../atoms/colors';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';

// noinspection TsLint

// FIXME: handle enums
type BaseSchemaDataType<T extends JSONSchema6, A> =
  | (T['type'] extends 'string'
      ? string // NonNullable<T["enum"]>[number]
      : T['type'] extends 'number'
        ? number
        : T['type'] extends 'integer'
          ? number
          : T['type'] extends 'boolean'
            ? boolean
            : T['type'] extends 'object'
              ? {
                  [P in keyof T['properties']]: P extends (NonNullable<T['required']>[number])
                    ? NonNullable<SchemaDataType<T['properties'][P]>>
                    : SchemaDataType<T['properties'][P]>
                }
              : T['type'] extends 'array'
                ? Array<NonNullable<A>>
                : T['type'] extends 'null' ? null : T['type'] extends 'any' ? any : unknown)
  | null;

type InferredItemsSchemaDataType<T extends JSONSchema6> = T['items'] extends JSONSchema6
  ? BaseSchemaDataType<T, BaseSchemaDataType<T['items'], T['items']['items']>>
  : BaseSchemaDataType<T, unknown>;
// FIXME: handle deeply nested array item types

type SchemaDataType<T extends JSONSchema6> = InferredItemsSchemaDataType<T>;

export interface IFormViewModel<Schema extends JSONSchema6> {
  schema: Schema;
  uiSchema?: UiSchema;

  formData?: SchemaDataType<Schema>;

  hideSubmitButton?: boolean;

  style?: React.CSSProperties;
  className?: string;
}

export interface IFormActions<Schema extends JSONSchema6> {
  onSubmit: (values: NonNullable<SchemaDataType<Schema>>) => void;
}

export type FormProps<Schema extends JSONSchema6> = IFormViewModel<Schema> & IFormActions<Schema>;

class Form<Schema extends JSONSchema6 = JSONSchema6> extends React.Component<FormProps<Schema>> {
  private jsonForm: any;

  render() {
    // noinspection TsLint
    return (
      <div style={this.props.style} className={this.props.className}>
        <JSONForm
          ref={(el: any) => (this.jsonForm = el)}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          widgets={widgets as any} // FIXME: re-enable typing
          onSubmit={({ formData }) => this.props.onSubmit(formData as any)}
          liveValidate={true}
          noHtml5Validate={true}
          showErrorList={false}
          ObjectFieldTemplate={({ title, description, properties, required }) => (
            <fieldset
              className={'bw1 br2 ' + (!title ? 'bn ph0 pt3' : 'ba')}
              style={{ borderColor: hexOffwhite }}
            >
              {title && (
                <legend>
                  <Text type={ETextType.Label} className={'mh2'}>
                    {title}
                    {required ? '*' : null}
                  </Text>
                </legend>
              )}
              {description}
              {properties.map((element, i) => (
                <div key={i}>{element.content}</div>
              ))}
            </fieldset>
          )}
          ArrayFieldTemplate={({
            items,
            canAdd,
            disabled,
            readonly,
            required,
            title,
            onAddClick
          }) => (
            <div>
              <Text className="mv0 fw7 t-medium black">
                {title}
                {required && !disabled && <span className="crimson">*</span>}
              </Text>
              {items.map(element => element.children)}
              {canAdd && (
                <Button
                  type={EButtonType.Primary}
                  size={EButtonSize.Small}
                  onClick={onAddClick}
                  text={'Add'}
                />
              )}
            </div>
          )}
          FieldTemplate={({
            id,
            classNames,
            label,
            displayLabel,
            rawHelp,
            required,
            rawDescription,
            rawErrors,
            children
          }) => (
            <div className={classNames}>
              <div>{rawDescription}</div>
              <div>{children}</div>
              <div>
                <Text type={ETextType.Error}>{rawErrors}</Text>
              </div>
              <div>{rawHelp}</div>
            </div>
          )}
        >
          {!this.props.hideSubmitButton ? (
            <FormSubmit
              defaultText={'Submit'}
              submittedText={'Submitting'}
              succeededText={'Saved'}
              failedText={'Failed'}
              buttonSize={EButtonSize.Medium}
              submitState={ESubmitState.Default}
              onClick={() => this.jsonForm.submit()}
            />
          ) : (
            <span />
          )}
        </JSONForm>
      </div>
    );
  }

  public submit() {
    this.jsonForm.submit();
  }
}

export default Form;
