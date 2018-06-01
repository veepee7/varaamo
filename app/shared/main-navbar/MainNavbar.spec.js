import { expect } from 'chai';
import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import { getSearchPageUrl } from 'utils/searchUtils';
import { shallowWithIntl } from 'utils/testUtils';
import MainNavbar from './MainNavbar';

describe('shared/main-navbar/MainNavbar', () => {
  const pathname = 'somepath';
  function getWrapper(props) {
    const defaults = {
      activeLink: pathname,
      changeLocale: () => null,
      clearSearchResults: () => null,
      isAdmin: false,
      isLoggedIn: false,
      userName: 'Luke Skywalker',
    };
    return shallowWithIntl(<MainNavbar {...defaults} {...props} />);
  }

  it('renders nav with correct activeKey', () => {
    const nav = getWrapper().find(Nav);
    expect(nav).to.have.length(1);
    expect(nav.at(0).prop('activeKey')).to.equal(pathname);
  });

  it('renders a link to search page', () => {
    const searchLink = getWrapper().find(NavItem).filter({ href: getSearchPageUrl() });
    expect(searchLink).to.have.length(1);
  });

  it('contains a link to about page', () => {
    const link = getWrapper().find(NavItem).filter({ href: '/about' });
    expect(link).to.have.length(1);
  });

  describe('if user is logged in but is not an admin', () => {
    const props = {
      isAdmin: false,
      isLoggedIn: true,
      userName: 'Luke',
    };
    function getLoggedInNotAdminWrapper(extraProps) {
      return getWrapper({ ...props, ...extraProps });
    }

    it('renders a link to my reservations page', () => {
      const myReservationsLink = getLoggedInNotAdminWrapper()
        .find(NavItem).filter({ href: '/my-reservations' });
      expect(myReservationsLink).to.have.length(1);
    });

    it('does not render a link to admin resources page', () => {
      const myReservationsLink = getLoggedInNotAdminWrapper()
        .find(NavItem).filter({ href: '/admin-resources' });
      expect(myReservationsLink).to.have.length(0);
    });
  });

  describe('if user is logged in and is an admin', () => {
    const props = {
      isAdmin: true,
      isLoggedIn: true,
    };
    function getLoggedInAdminWrapper(extraProps) {
      return getWrapper({ ...props, ...extraProps });
    }

    it('renders a link to admin resources page', () => {
      const myReservationsLink = getLoggedInAdminWrapper()
        .find(NavItem).filter({ href: '/admin-resources' });
      expect(myReservationsLink).to.have.length(1);
    });
  });

  describe('if user is not logged in', () => {
    const props = {
      isAdmin: false,
      isLoggedIn: false,
    };
    function getNotLoggedInWrapper(extraProps) {
      return getWrapper({ ...props, ...extraProps });
    }

    it('does not render a link to my reservations page', () => {
      const myReservationsLink = getNotLoggedInWrapper()
        .find(NavItem).filter({ href: '/my-reservations' });
      expect(myReservationsLink).to.have.length(0);
    });

    it('does not render a link to admin resources page', () => {
      const myReservationsLink = getNotLoggedInWrapper()
        .find(NavItem).filter({ href: '/admin-resources' });
      expect(myReservationsLink).to.have.length(0);
    });
  });
});