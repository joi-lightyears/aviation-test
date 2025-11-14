import { Header } from '@/components/layout/header';
import { ServiceTabs } from '@/components/home/service-tabs';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(to_bottom,#F5F8FF_0%,#DBF5FF_46%,#ffffff_46%,#ffffff_100%)]">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 py-8 md:py-12 flex-1">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-gray-900 mb-2">
            Travel Smarter, Not Harder
          </h1>
          <p className="text-sm sm:text-base md:text-[18px] font-normal text-[#767689]">
            Make every trip effortless. Tripzy lets you book rides and plan journeys with ease
          </p>
        </div>
        <ServiceTabs />
      </main>

      <footer className="mx-auto mt-auto mb-5 max-w-[1200px] px-4 sm:px-6 md:px-8">
        <p className="text-center text-xs sm:text-sm text-[#767689]">
          made by
          {' '}
          <a
            href="https://www.linkedin.com/in/thanhdatnguyen-joitaro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black underline"
          >
            Thanh Dat Nguyen
          </a>
        </p>
      </footer>
    </div>
  );
}
