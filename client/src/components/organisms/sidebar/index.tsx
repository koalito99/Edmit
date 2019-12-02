import * as React from "react";
import { MenuLinkStyle, MenuLocation } from "../../../graphql/generated";
import Icon, { EIconName } from "@edmit/component-library/src/components/atoms/icon";
import Button, { EButtonSize, EButtonType } from "@edmit/component-library/src/components/atoms/button";
import { NavLink } from "react-router-dom";
import { useFeaturesContext } from "../../../hooks/features";
import { NavbarPrefix } from "../../../testIds/ids";

export const Sidebar: React.FC<{}> = (props) => {
  return (
    <>
      <div>

      </div>
    </>
  )
}

interface ISidebarProps {
  sidebarMenu: IMenu
}

type SidebarProps = ISidebarProps

interface IMenuComponentProps {
  dividerComponent: React.FC<{ divider: IMenuDivider }>;
  linkComponent: React.FC<{ link: IMenuLink, shouldOpenLinksInParent: boolean }>;
  lockableLinkComponent: React.FC<{ lockableLink: ILockableMenuLink, shouldOpenLinksInParent: boolean }>;
}

type SidebarMenuComponentProps = IMenuComponentProps & {
  menuComponent: IMenuComponent;
  shouldOpenLinksInParent: boolean;
}

export const MenuComponentRenderer: React.FC<SidebarMenuComponentProps> = (props) => {
  const {
    menuComponent
  } = props;

  switch (menuComponent.type) {
    case "divider":
      return <props.dividerComponent divider={menuComponent as IMenuDivider}></props.dividerComponent>
    case "link":
      return <props.linkComponent link={menuComponent as IMenuLink} shouldOpenLinksInParent={props.shouldOpenLinksInParent} />
    case "lockableLink":
      return <props.lockableLinkComponent lockableLink={menuComponent as ILockableMenuLink} shouldOpenLinksInParent={props.shouldOpenLinksInParent}></props.lockableLinkComponent>
  }
}



const SidebarDividerComponent: React.FC<{ divider: IMenuDivider }> = (props) => {
  return <span className="sidebar-divider" />
}

const InternalOrExternalLink: React.FC<{ link: string, useNavLink: boolean, target?: string }> = (props) => {
  if (props.link.startsWith("https")) {
    return (<a className="menuLink"
      href={props.link} target="_blank">{props.children}</a>)
  } else {
    if (window.location.href.indexOf("app.edmit.me") > -1) {
      return (<a className="menuLink"
        href={"https://app.edmit.me" + props.link} target={props.target}>{props.children}</a>)
    } else {
      if (props.useNavLink) {
        return (
          <span data-testid={NavbarPrefix + props.link}>
            <NavLink className="menuLink"
              target={props.target}
              to={props.link}>
              {props.children}
            </NavLink>
          </span>
        )
      } else {
        return (
          <span data-testid={NavbarPrefix + props.link}>
            <a className="menuLink"
              href={props.link}
              target="_parent">
              {props.children}
            </a>
          </span>
        )
      }
    }
  }
}

const LinkComponent: React.FC<{ link: IMenuLink, useNavLink: boolean }> = (props) => {


  switch (props.link.style) {
    case MenuLinkStyle.Button:
      return (
        <Button
          className="menuLink"
          text={props.link.label || ""}
          size={EButtonSize.Large}
          type={EButtonType.Secondary}
          style={{ width: "100%" }}
          onClick={() => window.parent ? window.parent.location.href = props.link.link || "#" : window.location.href = props.link.link || "#"}
        />
      )
    case MenuLinkStyle.PrimaryButton:
      return (
        <Button
          className="menuLink white hover-bg-crimson-dark b--crimson bg-crimson"
          text={props.link.label || ""}
          size={EButtonSize.Large}
          type={EButtonType.Secondary}
          style={{ width: "100%" }}
          onClick={() => window.parent ? window.parent.location.href = props.link.link || "#" : window.location.href = props.link.link || "#"}
        />
      )
    case MenuLinkStyle.Icon:
      return <Icon name={EIconName.LinkExternal} />
    case MenuLinkStyle.Text:
      return (<span>
        <InternalOrExternalLink useNavLink={props.useNavLink} link={props.link.link || "#"}>
          {props.link.label}
        </InternalOrExternalLink>
      </span>)
    case MenuLinkStyle.TextIcon:
      const icon = props.link.icon ? iconNameFromString(props.link.icon) : null;

      return (<span>
        <InternalOrExternalLink useNavLink={props.useNavLink} link={props.link.link || "#"}>
          <div className="flex">
            <div>{icon && (<Icon className="menu-icon" name={icon} />)}</div>
            <div>{props.link.label}</div>
          </div>
        </InternalOrExternalLink>
      </span >
      )
    default:
      return <span />
  }
}

const iconNameFromString = (iconName: string): EIconName | null => {
  switch (iconName) {
    case "":
      return EIconName.Up;
    case "Home":
      return EIconName.Household;
    case "Building":
      return EIconName.Institution;
    case "Locked":
      return EIconName.Lock;
    case "Unlocked":
      return EIconName.Unlocked;
    case "Article":
      return EIconName.Article;
    case "Exclaimation":
      return EIconName.Exclaimation;
    case "Profile":
      return EIconName.Profile;
    case "MonetizationOn":
      return EIconName.MonetizationOn;
    case "Receipt":
      return EIconName.Receipt;
    case "Map":
      return EIconName.Map;
    case "Book":
      return EIconName.Book;
    default:
      return null;
  }
}

const SidebarLockableLinkComponent: React.FC<{ lockableLink: ILockableMenuLink, useNavLink: boolean }> = (props) => {
  const { get } = useFeaturesContext();

  return <span>
    <LinkComponent
      useNavLink={props.useNavLink}
      link={
        {
          ...props.lockableLink,
          type: "link",
          link: props.lockableLink.logicCheckKey ? (get[props.lockableLink.logicCheckKey] === 'Enabled' ?
            props.lockableLink.lockedLink :
            props.lockableLink.link
          ) : props.lockableLink.link,
          icon: props.lockableLink.logicCheckKey ? (get[props.lockableLink.logicCheckKey] === 'Enabled' ?
            "Locked" :
            props.lockableLink.icon || "Unlocked"
          ) : false
        } as IMenuLink
      }
    />
  </span>
}

interface ITopMenuProps {
  topMenu: IMenu;
  shouldOpenLinksInParent: boolean;
}

type TopMenuProps = ITopMenuProps;

const TopMenuLinkComponent: React.FC<{ link: IMenuLink, shouldOpenLinksInParent: boolean }> = (props) => {
  const icon = props.link.icon ? iconNameFromString(props.link.icon) : null;

  switch (props.link.style) {
    case MenuLinkStyle.Button:
      return <div>
        <Button
          text={props.link.label || ""}
          size={EButtonSize.Medium}
          type={EButtonType.Secondary}
          onClick={() => props.shouldOpenLinksInParent ? (window.parent.location.href = props.link.link || "#") : window.location.href = props.link.link || "#"}
        />
      </div>
    case MenuLinkStyle.PrimaryButton:
      return <div>
        <Button
          text={props.link.label || ""}
          size={EButtonSize.Medium}
          type={EButtonType.Primary}
          onClick={() => props.shouldOpenLinksInParent ? (window.parent.location.href = props.link.link || "#") : window.location.href = props.link.link || "#"}
        />
      </div>
    default:
      var target = ""
      if (props.shouldOpenLinksInParent) {
        target = "_parent"
      }
      return (
        <div>
          <InternalOrExternalLink target={target} useNavLink={true} link={props.link.link || "#"}>
            <div className="flex">
              <div>{icon && (<Icon className="menu-icon" name={icon} />)}</div>
              <div>{props.link.label}</div>
            </div>
          </InternalOrExternalLink>
        </div>
      )
  }
}

const topMenuComponents = {
  dividerComponent: (props: { divider: IMenuDivider }) => <span />,
  linkComponent: TopMenuLinkComponent,
  lockableLinkComponent: (props: { lockableLink: ILockableMenuLink }) => (
    <span>
      <InternalOrExternalLink useNavLink={true} link={props.lockableLink.link || "#"}>
        {props.lockableLink.label}
      </InternalOrExternalLink>
    </span>
  )
}

const sidebarMenuComponents = (useNavLink: boolean) => ({
  dividerComponent: SidebarDividerComponent,
  linkComponent: (props: any) => <LinkComponent {...props} useNavLink={useNavLink} />,
  lockableLinkComponent: (props: any) => <SidebarLockableLinkComponent {...props} useNavLink={useNavLink} />
});

export const TopMenuComponent: React.FC<TopMenuProps> = (props) => {
  return (
    <>
      <div>
        {props.topMenu.sections.map(
          (section) => {
            return (
              <>
                <ul className="top-menu">
                  {section.links.map(
                    (link) => {
                      return (
                        <>
                          <li className="top-menu-item"><MenuComponentRenderer {...topMenuComponents} menuComponent={link} shouldOpenLinksInParent={props.shouldOpenLinksInParent} /></li>
                        </>
                      )
                    }
                  )}
                </ul>
              </>
            )
          }
        )}
      </div>
    </>
  )
}


export const MobileDrawerMenuComponent: React.FC<{ menu: IMenu }> = (props) => {
  return (
    <>
      <div>
        {props.menu.sections.map(
          (section) => {
            return (
              <div className="mobile-menu-section">
                <div className="section-title">{section.title}</div>
                <ul className="mobile-menu">
                  {section.links.map(
                    (link) => {
                      return (
                        <>
                          <li className="mobile-menu-item">
                            <MenuComponentRenderer {...sidebarMenuComponents(false)} menuComponent={link} shouldOpenLinksInParent={false} />
                          </li>
                        </>
                      )
                    }
                  )}
                </ul>
              </div>
            )
          }
        )}
      </div>
    </>
  )
}

export const SidebarComponent: React.FC<SidebarProps> = (props) => {
  return (
    <>
      <div className="sidebar">
        {props.sidebarMenu.sections.map(
          (section) => {
            var sec = "sidebar-small-section"
            if (section.title && (section.title.length > 0)) {
              sec = "sidebar-section"
            }
            return (
              <div className={sec}>
                <div className="section-title">{section.title}</div>
                <ul className="sidebar-menu">
                  {section.links.map(
                    (link) => {
                      return (
                        <>
                          <li className="sidebar-menu-item" key={String(Math.random())}><MenuComponentRenderer {...sidebarMenuComponents(true)} menuComponent={link} shouldOpenLinksInParent={false} /></li>
                        </>
                      )
                    }
                  )}
                </ul>
              </div>
            )
          }
        )}
      </div>
    </>
  )
}

export interface IMenuComponent {
  type: MenuComponentType;
}

export interface IMenuSection {
  title?: string | null;
  links: IMenuComponent[]
}

export interface IMenu {
  location?: MenuLocation | null;
  sections: IMenuSection[]
}

export type MenuComponentType = "divider" | "link" | "lockableLink"

export interface IMenuDivider extends IMenuComponent {
  type: "divider";
  icon?: string | null;
}

export interface IMenuLink extends IMenuComponent {
  type: "link";
  icon?: string | null;
  label?: string | null;
  link?: string | null;
  style?: MenuLinkStyle | null;
  submenu?: IMenu | null;
}

export interface ILockableMenuLink extends IMenuComponent {
  type: "lockableLink";
  icon?: string | null;
  label?: string | null;
  link?: string | null;
  style?: MenuLinkStyle | null;
  submenu?: IMenu | null;
  locked: boolean | null;
  lockedLink?: string | null;
  logicCheckKey?: string | null;
}