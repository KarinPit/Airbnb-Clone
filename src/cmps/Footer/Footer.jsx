import { GlobeIcon, FacebookIcon, InstagramIcon, TwitterIcon } from '../SVG/FooterSvg'

export function Footer({ isSticky }) {
    return (
        <footer className={`${isSticky ? 'sticky' : ''}`}>
            <div className="footer-info">
                <p>&copy; 2024 Airbnb, Inc.</p>
            </div>

            <div className="footer-options">
                <div className="footer-language">
                    <GlobeIcon />
                    <p>English(US)</p>
                </div>

                <div className="footer-currency">
                    <p>$ USD</p>
                </div>

                <div className="footer-social-media">
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                </div>
            </div>
        </footer>
    )
}