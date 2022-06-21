import React from "react";

//  Footer
//  Defines a simple footer component
const Footer = () => {
    return (
        <div className="footer">
            <footer class="py-5 bg-light fixed-bottom border-top">
                <div class="container">
                    <div class="row">
                        <p class="col m-1 text-left text-black">
                            Copyright &copy; Your Website 2022
                        </p>
                        <p class="col m-1 text-right text-black">
                            Contact Me:
                            <a href="mailto:tschlund@gmial.com">tschlund@gmail.com</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;