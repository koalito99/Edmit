import { ISearchHighSchoolOption } from '../../search-high-schools'

export type SmartHighSchoolFieldProps = {
  onSearch?(newQuery: string): void;
  onSelected?(newValue: ISearchHighSchoolOption): void;
  onClear?: () => void;
};