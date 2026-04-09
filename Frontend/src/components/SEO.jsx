import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({
  title,
  description,
  url, // We will calculate a fallback below
  image = "/Amanpropertiesimage-removebg-preview.png",
  type = "website"
}) {
  const siteName = "Aman Properties";
  const phoneNumber = "+91 9255446593";
  const location = useLocation();

  // 1. Force the domain to be consistent (prevents the Bing "alternate version" error)
  const baseDomain = "https://amanproperties.me";
  
  // 2. Generate the full URL automatically if not provided, ensuring no double slashes
  const currentPath = location.pathname === "/" ? "" : location.pathname;
  const canonicalUrl = url || `${baseDomain}${currentPath}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Aman Properties, buy property Haryana, real estate agent Haryana, rent house India, property listings" />
      <meta name="robots" content="index, follow" />
      
      {/* THE FIX: The Canonical Link must exactly match the URL Bing is crawling */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": siteName,
          "image": `${baseDomain}${image}`,
          "url": canonicalUrl,
          "telephone": phoneNumber,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Haryana",
            "addressCountry": "IN"
          },
          "priceRange": "₹-₹₹₹",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "09:00",
            "closes": "21:00"
          }
        })}
      </script>
    </Helmet>
  );
}