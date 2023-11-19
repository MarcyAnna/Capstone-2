import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>Application created by MarcyAnna &copy; 2023</span>
            </p>
          </div>
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            <img
              className="page-footer-brand__logo"
              src="https://cdn.auth0.com/blog/hello-auth0/auth0-shield.svg"
              alt="Auth0"
              width="20"
              height="22.22"
            />
            <PageFooterHyperlink path="https://auth0.com/">
               Protected By Auth0 Inc
            </PageFooterHyperlink>
          </div>
        </div>
      
    </footer>
  );
};
