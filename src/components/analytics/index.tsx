"use client";
import React, { useEffect } from "react";
import { analytics } from "./analytics";

type Props = { children: React.ReactNode };

const Analytics = ({ children }: Props) => {
  useEffect(() => {
    analytics();
  }, []);
  return <>{children}</>;
};

export default Analytics;
