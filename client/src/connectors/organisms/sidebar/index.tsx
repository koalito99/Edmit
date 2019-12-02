import * as React from "react";
import { SidebarComponent, MenuComponentType, IMenu, TopMenuComponent, MobileDrawerMenuComponent } from "../../../components/organisms/sidebar";
import { useQuery } from "react-apollo-hooks";
import { Menus, MenuLocation } from "../../../graphql/generated";
import { MENUS } from "../../../graphql/queries";
import { usePaywall } from "../../../hooks/paywall";
import { FlexItem, FlexRowContainer } from "@edmit/component-library/src/components/layout";

type ConnectedSidebarProps = {
  linkStyle?: any | null;
  sectionTitleStyle?: any | null;
}

type ConnectedTopMenuProps = {

}

export const useMenus = () => {
  const query = useQuery<Menus>(MENUS)

  return query
}

export const useMenu = (location: MenuLocation) => {
  const [loading, setLoading] = React.useState(false)
  const [menu, setMenu] = React.useState<IMenu | null>(null);

  const query = useMenus()

  React.useEffect(
    () => {
      setLoading(query.loading)
    },
    [query.loading]
  )

  React.useEffect(
    () => {
      const menuSet = (query.data && query.data.session &&
        query.data.session.account.person &&
        query.data.session.account.person.student &&
        query.data.session.account.person.student.menus &&
        query.data.session.account.person.student.menus.menus
      )

      const sidebarMenus = menuSet && menuSet
        .filter(
          (menu) => menu.location === location
        )

      if (!sidebarMenus || sidebarMenus.length !== 1) return;

      const firstSidebarMenu = sidebarMenus[0]

      const theMenu = {
        ...firstSidebarMenu,
        sections: firstSidebarMenu.sections.map(
          (s) => ({
            ...s,
            links: s.links.map(
              (link) => {
                let type: MenuComponentType | null = null;

                switch (link.__typename) {
                  case "LockableMenuLink":
                    type = "lockableLink";
                    break;
                  case "MenuLink":
                    type = "link";
                    break;
                  case "MenuDivider":
                    type = "divider";
                    break;
                }

                if (!type) throw Error(`unexpected - menu item type is null - ${link}`)

                return {
                  ...link,
                  type
                }
              }
            )
          })
        )
      }

      setMenu(theMenu)
    },
    [query.data]
  )

  return {
    loading,
    menu
  }
}

export const ConnectedTopMenu: React.FC<ConnectedTopMenuProps> = (props) => {
  const topMenu = useMenu(MenuLocation.TopNav)

  if (topMenu.loading) return <span />
  if (!topMenu.menu) return <span />

  return (
    <>
      <TopMenuComponent
        topMenu={topMenu.menu}
        shouldOpenLinksInParent={false}
      />
    </>
  )
}

export const ConnectedMarketingMenu: React.FC<ConnectedTopMenuProps> = (props) => {
  const marketingMenu = useMenu(MenuLocation.MarketingNav)
  const paywall = usePaywall()

  if (marketingMenu.loading) return <span />
  if (!marketingMenu.menu) return <span />

  return (
    <FlexRowContainer className="justify-between">
      <FlexItem>
        {paywall.organizationLogoUrl && (
          <div className="pl3 mt3">
            <img style={{ height: 30 }} className="h-100" src={paywall.organizationLogoUrl} />
          </div>
        )}
      </FlexItem>
      <FlexItem>
        <TopMenuComponent
          topMenu={marketingMenu.menu}
          shouldOpenLinksInParent={true}
        />
      </FlexItem>
    </FlexRowContainer>
  )
}

type ConnectedNavDrawerMenuProps = {}

export const ConnectedNavDrawerMenu: React.FC<ConnectedNavDrawerMenuProps> = (props) => {
  const mobileDrawer = useMenu(MenuLocation.MobileDrawer)

  if (mobileDrawer.loading) return <span />
  if (!mobileDrawer.menu) return <span />

  return (
    <>
      <MobileDrawerMenuComponent
        menu={mobileDrawer.menu}
      />
    </>
  )
}

export const ConnectedSidebar: React.FC<ConnectedSidebarProps> = (props) => {
  const sidebarMenu = useMenu(MenuLocation.Sidebar)

  if (sidebarMenu.loading) return <span />
  if (!sidebarMenu.menu) return <span />

  return (
    <>
      <SidebarComponent

        sidebarMenu={sidebarMenu.menu}
      />
    </>
  )
}