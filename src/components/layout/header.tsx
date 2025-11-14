'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/icons';

export function Header() {
  return (
    <header className="py-6">
      <div className="mx-auto max-w-[1200px] px-4">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 w-fit"
          >
            <Icons.Tripzy className="w-[29px] h-[30px] text-[#19C0FF]" />
            <span className="text-2xl font-bold text-[#19C0FF]">Tripzy</span>
          </motion.div>
        </Link>
      </div>
    </header>
  );
}
