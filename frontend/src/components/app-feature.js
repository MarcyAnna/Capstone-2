import React from "react";

export const AppFeature = ({ title, description, resourceUrl, icon }) => (
  <div
    className="auth0-feature"
  >
    <h3 className="auth0-feature__headline">
      {title}
    </h3>
    <p className="auth0-feature__description">{description}</p>
  </div>
);
