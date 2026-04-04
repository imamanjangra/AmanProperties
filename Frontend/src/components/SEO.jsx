    import React from 'react';
    import { Helmet } from 'react-helmet-async';

    export default function SEO({
    title,
    description,
    url = "https://yourdomain.com",
    image = "https://yourdomain.com/preview.jpg",
    name = "Aman Properties",
    type = "website"
    }) {
    return (
        <Helmet>
        {/* Basic */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="buy property Haryana, rent house Haryana, real estate India" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Structured Data */}
        <script type="application/ld+json">
            {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Aman Properties",
            url: url,
            telephone: "+91XXXXXXXXXX",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Haryana",
                addressCountry: "India"
            }
            })}
        </script>
        </Helmet>
    );
    }