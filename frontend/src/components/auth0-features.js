import React from "react";
import { Auth0Feature } from "./auth0-feature";

export const Auth0Features = () => {
  const featuresList = [
    {
      title: "Track Your Symptoms",
      description:
        "Keep a daily log of what health symptoms you are experiencing and their severity",
      resourceUrl: "https://auth0.com/docs/connections",
      icon: "https://cdn.auth0.com/blog/hello-auth0/identity-providers-logo.svg",
    },
    {
      title: "Get Information On Your Conditions",
      description:
        "Have access to facts and tips for dealing with your diagnosed health conditions",
      resourceUrl: "https://auth0.com/docs/multifactor-authentication",
      icon: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
    },
    {
      title: "Track Your Progess",
      description:
        "Look at graphs showing frequency and intensity of a particular symptom over a period of time.",
      resourceUrl: "https://auth0.com/docs/attack-protection",
      icon: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
    },
    // {
    //   title: "Serverless Extensibility",
    //   description:
    //     "Actions are functions that allow you to customize the behavior of Auth0. Each action is bound to a specific triggering event on the Auth0 platform. Auth0 invokes the custom code of these Actions when the corresponding triggering event is produced at runtime.",
    //   resourceUrl: "https://auth0.com/docs/actions",
    //   icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    // },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">Explore Our Features</h2>
      <div className="auth0-features__grid">
        {featuresList.map((feature) => (
          <Auth0Feature
            key={feature.resourceUrl}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
