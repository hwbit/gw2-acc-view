
function NavBar() {
    return (
        <>
            <nav className="nav">
                <a href="/" className="site-title">GW2 Account Viewer</a>
                <ul>
                    <li>
                        <a href="/account">Account</a>
                    </li>
                    <li>
                        <a href="/api-keys">Api Key</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default NavBar;