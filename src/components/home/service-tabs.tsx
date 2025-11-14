'use client';

import { useState } from 'react';
import Icons from '@/components/ui/icons';
import { SearchForm } from '@/components/search/search-form';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'bus' | 'hotel' | 'flight';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'bus',
    label: 'Bus & Shuttle',
    icon: <Icons.Bus className="w-5 h-5" />,
  },
  {
    id: 'hotel',
    label: 'Hotel & Accommodation',
    icon: <Icons.Hotel className="w-5 h-5" />,
  },
  {
    id: 'flight',
    label: 'Flight',
    icon: <Icons.Plane className="w-5 h-5" />,
  },
];

export function ServiceTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('bus');

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl overflow-visible">
        <div className="">
          <div
            className="w-full md:h-[96px] h-auto bg-white rounded-[16px] shadow-lg ring-1 ring-gray-100 flex md:flex-row flex-col md:items-center items-stretch px-3 py-3 "
            role="tablist"
            aria-label="Services"
          >
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const IconComponent =
                tab.id === 'bus' ? Icons.Bus : tab.id === 'hotel' ? Icons.Hotel : Icons.Plane;
              const palette =
                tab.id === 'bus'
                  ? {
                      activeBg: 'bg-[#EBF9FF]',
                      iconBg: 'bg-[#D3F3FF]',
                      iconColor: 'text-[#19C0FF]',
                    }
                  : tab.id === 'hotel'
                  ? {
                      activeBg: 'bg-[#F4FFEB]',
                      iconBg: 'bg-[#E8FBCC]',
                      iconColor: 'text-[#447A11]',
                    }
                  : {
                      activeBg: 'bg-[#EBF4FF]',
                      iconBg: 'bg-[#E1EDFE]',
                      iconColor: 'text-[#5664E1]',
                    };

              return (
                <div key={tab.id} className="w-full md:flex md:flex-1 items-center gap-0 md:h-full">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tab-panel-${tab.id}`}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 md:px-5 py-2 md:py-3 rounded-[8px] transition-all md:h-full',
                      isActive
                        ? cn(palette.activeBg, 'text-gray-900')
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span
                      className={cn(
                        'flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full',
                        palette.iconBg
                      )}
                    >
                      <IconComponent
                        width={24}
                        height={24}
                        className={cn(
                          'w-6 h-6 md:w-7 md:h-7',
                          palette.iconColor
                        )}
                      />
                    </span>
                    <span className="text-sm md:text-lg font-medium">
                      {tab.label}
                    </span>
                  </button>

                  {((idx === 0 && activeTab !== 'bus' && activeTab !== 'hotel') ||
                    (idx === 1 && activeTab !== 'hotel' && activeTab !== 'flight')) && (
                    <span className="hidden md:block h-6 w-px bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-4 pt-4 pb-6 w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'bus' ? (
              <motion.div
                key="bus"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id="tab-panel-bus"
                aria-labelledby="bus"
              >
                <SearchForm />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[186px] w-full min-[1200px]:w-[1136px] mx-auto text-center flex items-center justify-center"
                role="tabpanel"
                id={`tab-panel-${activeTab}`}
                aria-labelledby={activeTab}
              >
                <p className="text-gray-500 text-lg">No data</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
