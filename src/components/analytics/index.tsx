"use client";
import React from "react";
import Script from "next/script";

type Props = { GA_MEASUREMENT_ID: string };

const Analytics = ({ GA_MEASUREMENT_ID }: Props) => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
};

export default Analytics;
