'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export function SearchResults() {
  const searchParams = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const departureDate = searchParams.get('dep');
  const returnDate = searchParams.get('ret');
  const passengers = searchParams.get('pax');

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white w-full rounded-2xl shadow-xl p-12">

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-900 text-[24px] font-semibold"
          >
            From: {from || 'N/A'}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-900 text-[24px] font-semibold"
          >
            To: {to || 'N/A'}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-900 text-[24px] font-semibold"
          >
            Departure date: {formatDate(departureDate) || 'N/A'}
          </motion.div>

          {returnDate && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-900 text-[24px] font-semibold"
            >
              Return date: {formatDate(returnDate)}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-900 text-[24px] font-semibold"
          >
            No. of passenger: {passengers || 'N/A'}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
