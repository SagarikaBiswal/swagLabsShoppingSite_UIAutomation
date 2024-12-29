class MenuPage {
    /**
     *  page containing specific selectors and methods for a Menu Scroller
     */

    get menuButton(): ChainablePromiseElement { return $('#react-burger-menu-btn') }

    get logOutButton(): ChainablePromiseElement { return $('#logout_sidebar_link') }
}
export default new MenuPage()