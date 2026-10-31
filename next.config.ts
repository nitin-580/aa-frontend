import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ace-awards",
        destination: "/ace-alumni-accolade",
        permanent: true,
      },
      {
        source: "/ace-awards/nominate",
        destination: "/ace-alumni-accolade/nominate",
        permanent: true,
      },
      {
        source: "/alumni-accolade",
        destination: "/ace-alumni-accolade",
        permanent: true,
      },
      {
        source: "/alumni-accolade/nominate",
        destination: "/ace-alumni-accolade/nominate",
        permanent: true,
      },
      {
        source: "/ace-alumnus-accolade",
        destination: "/ace-alumni-accolade",
        permanent: true,
      },
      {
        source: "/ace-alumnus-accolade/nominate",
        destination: "/ace-alumni-accolade/nominate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
