class MenuPage {
    get menuButton(): ChainablePromiseElement { return $('#react-burger-menu-btn') }
    get logOutButton(): ChainablePromiseElement { return $('#logout_sidebar_link') }
}
export default new MenuPage()