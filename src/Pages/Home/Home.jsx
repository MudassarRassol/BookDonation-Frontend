import React, { Suspense, lazy } from 'react';

// Lazy load components
const Slider = lazy(() => import('../../Components/Slider'));
const SwiperAllbooks = lazy(() => import('../../Components/SwiperAllbooks'));
const Welcome = lazy(() => import('./Welcome'));
const HomeAboutUs = lazy(() => import('./Homeaboutus'));
const HomeContact = lazy(() => import('./Homecontect'));
import Loading from '../../Components/Loading';

const Home = () => {
  return (
    <Suspense fallback={<div className="text-center py-10 scroll-smooth">
      <Loading />
    </div>}>
      <Welcome />
      <Slider />
      <HomeAboutUs />
      <SwiperAllbooks />

      <HomeContact />
    </Suspense>
  );
};

export default Home;
