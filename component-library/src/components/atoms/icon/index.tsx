import * as React from 'react';

export enum EIconName {
  Success = 'Success',
  Error = 'Error',
  Warn = 'Warn',
  Add = 'Add',
  Remove = 'Remove',
  Close = 'Close',
  Search = 'Search',
  Delete = 'Delete',
  Help = 'Help',
  Tip = 'Tip',
  Check = 'Check',
  MyColleges = 'MyColleges',
  Compare = 'Compare',
  Recommendations = 'Recommendations',
  FinancialPlanner = 'FinancialPlanner',
  Consult = 'Consult',
  Profile = 'Profile',
  Menu = 'Menu',
  MenuCompare = 'MenuCompare',
  Upgrade = 'Upgrade',
  Loading = 'Loading',
  Up = 'Up',
  Down = 'Down',
  ChevronUp = 'ChevronUp',
  ChevronRight = 'ChevronRight',
  ChevronDown = 'ChevronDown',
  ChevronLeft = 'ChevronLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowNeutral = 'ArrowNeutral',
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  LinkExternal = 'LinkExternal',
  Partner = 'Partner',
  Article = 'Article',
  College = 'College',
  EdmitPlus = 'EdmitPlus',
  Expand = 'Expand',
  Flip = 'Flip',
  Invite = 'Invite',
  Lock = 'Lock',
  Unlocked = 'Unlocked',
  Hotline = 'Hotline',
  Setting = 'Setting',
  School = 'School',
  People = 'People',
  Gift = 'Gift',
  Edit = 'Edit',
  HighSchool = 'HighSchool',
  Academic = 'Academic',
  Household = 'Household',
  Major = 'Major',
  Notifications = 'Notifications',
  Download = 'Download',
  Plus = 'Plus',
  ArrowDropDown = 'ArrowDropDown',
  Info = 'Info',
  Phone = 'Phone',
  Transportation = 'Transportation',
  Place = 'Place',
  Twitter = 'Twitter',
  Facebook = 'Facebook',
  LinkedIn = 'LinkedIn',
  Exclaimation = "Exclaimation",
  Institution = 'Institution',
  Cancel = "Cancel",
  UnfoldMore = "UnfoldMore",
  Map = "Map",
  Receipt = "Receipt",
  AttachMoney = "AttachMoney",
  Book = "Book",
  MonetizationOn = "MonetizationOn"
}

export interface IIconViewModel {
  name: EIconName;
  className?: string;
  disabled?: boolean;
  onClick?: any;
  style?: any;
}

export interface IIconActions {
  onClick?: () => void;
}

type IconProps = IIconViewModel & IIconActions;

const Icon: React.SFC<IconProps> = props => {
  let icon = null;
  let iconSource: 'fas' | 'fab' | 'material-icons' = 'material-icons';

  switch (props.name) {
    case EIconName.Institution:
      icon = 'account_balance';
      break;
    case EIconName.AttachMoney:
      icon = 'attach_money';
      break;
    case EIconName.Receipt:
      icon = 'receipt';
      break;
    case EIconName.Map:
      icon = 'map';
      break;
    case EIconName.Success:
      icon = 'check_circle';
      break;
    case EIconName.Error:
      icon = 'error';
      break;
    case EIconName.Warn:
      icon = 'warning';
      break;
    case EIconName.Add:
      icon = 'add_circle';
      break;
    case EIconName.Cancel:
      icon = 'cancel';
      break;
    case EIconName.UnfoldMore:
      icon = 'unfold_more';
      break;
    case EIconName.Exclaimation:
      icon = "new_releases";
      break;
    case EIconName.Remove:
      icon = 'remove_circle';
      break;
    case EIconName.Close:
      icon = 'close';
      break;
    case EIconName.Search:
      icon = 'search';
      break;
    case EIconName.Delete:
      icon = 'delete';
      break;
    case EIconName.Help:
      icon = 'help';
      break;
    case EIconName.Tip:
      icon = 'new_releases';
      break;
    case EIconName.Check:
      icon = 'check';
      break;
    case EIconName.MonetizationOn:
      icon = 'monetization_on';
      break;
    case EIconName.MyColleges:
      icon = 'home';
      break;
    case EIconName.Compare:
      icon = 'equalizer';
      break;
    case EIconName.Recommendations:
      icon = 'star ';
      break;
    case EIconName.FinancialPlanner:
      icon = 'calculator';
      iconSource = 'fas';
      break;
    case EIconName.Consult:
      icon = 'call ';
      break;
    case EIconName.Profile:
      icon = 'person';
      break;
    case EIconName.Menu:
      icon = 'menu';
      break;
    case EIconName.MenuCompare:
      icon = 'menu';
      break;
    case EIconName.Upgrade:
      icon = 'monetization_on';
      break;
    case EIconName.Loading:
      icon = 'refresh';
      break;
    case EIconName.Up:
      icon = 'arrow_drop_up';
      break;
    case EIconName.Down:
      icon = 'arrow_drop_down';
      break;
    case EIconName.ChevronUp:
      icon = 'expand_less';
      break;
    case EIconName.ChevronRight:
      icon = 'chevron_right';
      break;
    case EIconName.ChevronDown:
      icon = 'expand_more';
      break;
    case EIconName.ChevronLeft:
      icon = 'chevron_left';
      break;
    case EIconName.ArrowUp:
      icon = 'arrow_upward';
      break;
    case EIconName.ArrowDown:
      icon = 'arrow_downward';
      break;
    case EIconName.ArrowNeutral:
      icon = 'remove';
      break;
    case EIconName.ArrowRight:
      icon = 'arrow_forward';
      break;
    case EIconName.ArrowLeft:
      icon = 'arrow_back';
      break;
    case EIconName.LinkExternal:
      icon = 'call_made';
      break;
    case EIconName.Partner:
      icon = 'monetization_on';
      break;
    case EIconName.Article:
      icon = 'description';
      break;
    case EIconName.EdmitPlus:
      icon = 'verified_user';
      break;
    case EIconName.Expand:
      icon = 'zoom_out_map';
      break;
    case EIconName.Flip:
      icon = '360';
      break;
    case EIconName.Invite:
      icon = 'group';
      break;
    case EIconName.Lock:
      icon = 'lock';
      break;
    case EIconName.Unlocked:
      icon = 'lock_open';
      break;
    case EIconName.Hotline:
      icon = 'phone-volume';
      iconSource = 'fas';
      break;
    case EIconName.Setting:
      icon = 'location_city';
      break;
    case EIconName.School:
      icon = 'school';
      break;
    case EIconName.People:
      icon = 'people';
      break;
    case EIconName.Edit:
      icon = 'edit';
      break;
    case EIconName.HighSchool:
      icon = 'school';
      break;
    case EIconName.Academic:
      icon = 'book';
      break;
    case EIconName.Book:
      icon = 'book';
      break;
    case EIconName.Household:
      icon = 'home';
      break;
    case EIconName.Major:
      icon = 'work';
      break;
    case EIconName.Notifications:
      icon = 'notifications';
      break;
    case EIconName.Gift:
      icon = 'gift';
      iconSource = 'fas';
      break;
    case EIconName.Download:
      icon = 'cloud_download';
      break;
    case EIconName.Plus:
      icon = 'add';
      break;
    case EIconName.ArrowDropDown:
      icon = 'arrow_drop_down';
      break;
    case EIconName.Info:
      icon = 'info';
      break;
    case EIconName.Place:
      icon = 'place';
      break;
    case EIconName.Phone:
      icon = 'smartphone';
      break;
    case EIconName.Transportation:
      icon = 'train';
      break;
    case EIconName.Twitter:
      icon = 'twitter';
      iconSource = 'fab';
      break;
    case EIconName.Facebook:
      icon = 'facebook';
      iconSource = 'fab';
      break;
    case EIconName.LinkedIn:
      icon = 'linkedin';
      iconSource = 'fab';
      break;
    default:
      break;
  }

  return (
    <i
      aria-hidden={true}
      aria-label=""
      className={
        `${iconSource} ` +
        ((iconSource === 'fas' || iconSource === 'fab') ? `fa-${icon} fa-sm fa-fw ` : '') +
        (props.onClick && !props.disabled ? 'hover-crimson ' : '') +
        props.className
      }
      onClick={props.onClick}
      style={{
        cursor: props.onClick ? (!props.disabled ? 'pointer' : 'not-allowed') : '',
        ...props.style
      }}
    >
      {(iconSource !== 'fas' && iconSource !== 'fab') ? icon : null}
    </i>
  );
};

export default Icon;
