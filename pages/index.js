import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import the Globe component from the src/components folder
const Globe = dynamic(() => import('../components/GlobeComponent'), {
  ssr: false, // Disable server-side rendering for the 3D globe
});

export default function Home() {
  return (
    <div>
      <Head>
        <title key="title">Celestial Cartography - Offline Mode</title>
      </Head>
      <main>
        <h1>Celestial Cartography</h1>
        <p>A dynamic celestial map for luxury yachting.</p>
        <Globe /> {/* Placeholder for the 3D globe component */}        
      </main> 
      </div>
  );
}