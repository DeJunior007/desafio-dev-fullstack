import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 ADICIONE ESTA LINHA PARA O DOCKER FUNCIONAR
  output: "standalone", 

  /* Se você precisar de permissão para imagens externas, coloque aqui */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },

  // Adicione esta parte para o redirecionamento:
  async redirects() {
    return [
      {
        source: '/',           
        destination: '/simular',
        permanent: true,      
      },
    ];
  },
};

export default nextConfig;