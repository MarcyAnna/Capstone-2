import React from "react";
import { AppFeatures } from "../components/app-features";
import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";

export const HomePage = () => (
  <PageLayout>
    <HeroBanner />
    <AppFeatures />
  </PageLayout>
);
