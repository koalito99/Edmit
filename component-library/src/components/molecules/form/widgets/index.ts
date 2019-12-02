// overrides
import CheckboxWidget from './CheckboxWidget';
import EmailWidget from './EmailWidget';
import PasswordWidget from './PasswordWidget';
import RadioWidget from './RadioWidget';
import TextWidget from './TextWidget';
import UpDownWidget from './UpDownWidget';
import SelectWidget from './SelectWidget';

// new widgets
import CurrencyWidget from './CurrencyWidget';
import ToggleWidget from './ToggleWidget';

export default {
  CheckboxWidget,
  EmailWidget,
  PasswordWidget,
  RadioWidget,
  SelectWidget,
  TextWidget,
  UpDownWidget,

  currency: CurrencyWidget,
  toggle: ToggleWidget
};
