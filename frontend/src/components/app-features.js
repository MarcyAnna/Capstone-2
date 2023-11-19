import React from "react";
import { AppFeature } from "./app-feature";

export const AppFeatures = () => {
  const featuresList = [
    {
      title: "Track Your Symptoms",
      description:
        "Keep a daily log of what health symptoms you are experiencing and their severity",
    },
    {
      title: "Get Information On Your Conditions",
      description:
        "Have access to facts and tips for dealing with your diagnosed health conditions",
    },
    {
      title: "Track Your Progess",
      description:
        "Look at graphs showing frequency and intensity of a particular symptom over a period of time.",
    },
    {
      title: "Take Back Control",
      description:
        "Resources to make lifestyle changes that will help to keep symptoms at bay!",
    },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">Explore Our Features</h2>
      <div className="auth0-features__grid">
        {featuresList.map((feature) => (
          <AppFeature
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
