'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeftRight, ChevronUp, ChevronDown } from 'lucide-react';
import Icons from '@/components/ui/icons';
import { LocationAutocomplete } from './location-autocomplete';
import DateCustom from '@/components/ui/datecustom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface SearchFormProps {
  initialData?: {
    from?: string;
    to?: string;
    departureDate?: Date;
    returnDate?: Date;
    passengers?: number;
    roundTrip?: boolean;
  };
}

export function SearchForm({ initialData }: SearchFormProps) {
  const router = useRouter();
  const [from, setFrom] = useState(initialData?.from || '');
  const [to, setTo] = useState(initialData?.to || '');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    initialData?.departureDate
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    initialData?.returnDate
  );
  const [passengers, setPassengers] = useState(initialData?.passengers || 1);
  const [roundTrip, setRoundTrip] = useState(
    initialData?.roundTrip || false
  );

  const [errors, setErrors] = useState<{
    from?: string;
    to?: string;
    departureDate?: string;
    returnDate?: string;
    passengers?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!from.trim()) {
      newErrors.from = 'Please select a departure location';
    }

    if (!to.trim()) {
      newErrors.to = 'Please select a destination';
    }

    if (!departureDate) {
      newErrors.departureDate = 'Please select a departure date';
    } else if (departureDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      newErrors.departureDate = 'Departure date cannot be in the past';
    }

    if (roundTrip && returnDate && departureDate) {
      if (returnDate < departureDate) {
        newErrors.returnDate = 'Return date must be after departure date';
      }
    }

    if (passengers < 1) {
      newErrors.passengers = 'At least 1 passenger is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const params = new URLSearchParams({
      mode: 'bus',
      from: from,
      to: to,
      dep: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
      pax: passengers.toString(),
    });

    if (roundTrip && returnDate) {
      params.append('ret', format(returnDate, 'yyyy-MM-dd'));
    }

    router.push(`/search?${params.toString()}`);
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="pt-6 flex flex-col min-[1170px]:flex-row min-[1170px]:items-end w-full gap-3">
        {/* Group: FROM + SWAP + TO */}
        <div className="flex max-[1170px]:flex-col items-end max-[1170px]:items-stretch gap-2 w-full min-[1170px]:w-[462px]">
        {/* FROM */}
        <div className="min-w-0 w-full min-[1170px]:w-[207px]">
          <LocationAutocomplete
            label="FROM"
            value={from}
            onChange={setFrom}
            placeholder="Enter city, terminal..."
            error={errors.from}
          />
        </div>

        {/* SWAP */}
        <div className="flex min-[1170px]:flex-col max-[1170px]:flex-row items-center min-[1170px]:w-[48px] max-[1170px]:w-full max-[1170px]:justify-center">
          <div className="hidden min-[1170px]:block h-4 mb-1.5" />
          <motion.button
            type="button"
            onClick={swapLocations}
            aria-label="Swap locations"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="group w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-100 hover:bg-sky-50 hover:ring-sky-200 focus:outline-none focus-visible:outline-none cursor-pointer"
          >
            <ArrowLeftRight className="w-6 h-6 text-sky-400" />
          </motion.button>
          <div className="hidden min-[1170px]:block h-4 mt-1" />
        </div>

        {/* TO */}
        <div className="min-w-0 w-full min-[1170px]:w-[207px]">
          <LocationAutocomplete
            label="TO"
            value={to}
            onChange={setTo}
            placeholder="Enter city, terminal..."
            error={errors.to}
          />
        </div>
        </div>

        {/* Group: DEPARTURE DATE + RETURN DATE */}
        <div className="flex max-[1170px]:flex-col items-end max-[1170px]:items-stretch gap-2 w-full min-[1170px]:w-[470px] max-[1170px]:mt-3">

        {/* DEPARTURE DATE */}
        <div className="min-w-0 w-full min-[1170px]:w-[235px]">
          <label className="text-xs text-[#65686F] font-medium mb-1.5 block uppercase whitespace-nowrap">
            DEPARTURE DATE
          </label>
          <DateCustom
              id="departureDate"
              value={departureDate}
              onValueChange={setDepartureDate}
              placeholder="DD / MM / YYYY"
              formatPattern="dd / MM / yyyy"
              initialFocus
              numberOfMonths={2}
              dateDisabled={(date: Date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              buttonClassName={cn(
                'w-full h-12 justify-start text-left font-normal border-gray-200 hover:bg-gray-50 truncate text-sm',
                !departureDate && 'text-gray-400',
                errors.departureDate && 'border-red-400'
              )}
            />
          {errors.departureDate && (
            <p className="text-xs text-red-500 mt-1">{errors.departureDate}</p>
          )}
          {!errors.departureDate && (
            <p className="text-xs mt-1 h-4 text-transparent">&nbsp;</p>
          )}
        </div>

        {/* ROUND TRIP + RETURN DATE */}
        <div className="min-w-0 w-full min-[1170px]:w-[235px]">
          <div className="flex items-center gap-2 mb-1.5">
            <Checkbox
              id="roundTrip"
              checked={roundTrip}
              onCheckedChange={(checked) => setRoundTrip(checked === true)}
              className="border-gray-200 data-[state=checked]:bg-[#19C0FF] data-[state=checked]:border-[#19C0FF] data-[state=checked]:text-white"
            />
            <label
              htmlFor="roundTrip"
              className="text-xs text-[#65686F] font-medium uppercase cursor-pointer whitespace-nowrap"
            >
              ROUND TRIP?
            </label>
          </div>
          <DateCustom
             id="returnDate"
             value={returnDate}
             onValueChange={setReturnDate}
             disabled={!roundTrip}
             placeholder="DD / MM / YYYY"
             formatPattern="dd / MM / yyyy"
             initialFocus
             numberOfMonths={2}
             dateDisabled={(date: Date) =>
               date < (departureDate || new Date(new Date().setHours(0, 0, 0, 0)))
             }
              buttonClassName={cn(
               'w-full h-12 justify-start text-left font-normal border-gray-200 hover:bg-gray-50 truncate text-sm',
               !returnDate && 'text-gray-400',
               !roundTrip && 'cursor-not-allowed bg-[#2426281A] hover:bg-[#2426281A]',
               errors.returnDate && 'border-red-400'
             )}
           />
          {errors.returnDate && (
            <p className="text-xs text-red-500 mt-1">{errors.returnDate}</p>
          )}
          {!errors.returnDate && (
            <p className="text-xs mt-1 h-4 text-transparent">&nbsp;</p>
          )}
        </div>
        </div>

        {/* PASSENGERS */}
        <div className="min-w-0 w-full min-[1170px]:w-[149px] max-[1170px]:mt-3">
          <label className="text-xs text-[#65686F] font-medium mb-1.5 block uppercase whitespace-nowrap">
            NO. OF PASSENGER
          </label>
          <div className="w-full h-12 flex items-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent overflow-hidden">
            <div className="flex items-center gap-2 px-3 flex-1">
              <Icons.Person className="mr-1 h-5 w-5 text-black" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={passengers}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    const num = val === '' ? 1 : Math.max(1, parseInt(val, 10));
                    setPassengers(num);
                  }
                }}
                className="w-full bg-transparent outline-none text-sm text-black placeholder:text-sm"
                aria-label="Number of passengers"
              />
            </div>
            <div className="w-10 h-full border-l border-gray-200 flex flex-col divide-y divide-gray-200 rounded-r-lg overflow-hidden">
              <button
                type="button"
                aria-label="Increase passengers"
                onClick={() => setPassengers(passengers + 1)}
                className="flex-1 flex items-center justify-center hover:bg-gray-100 focus:outline-none focus-visible:outline-none"
              >
                <ChevronUp className="w-4 h-4 text-gray-600" />
              </button>
              <button
                type="button"
                aria-label="Decrease passengers"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                disabled={passengers <= 1}
                className="flex-1 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:outline-none"
              >
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          {errors.passengers && (
            <p className="text-xs text-red-500 mt-1">{errors.passengers}</p>
          )}
          {!errors.passengers && (
            <p className="text-xs mt-1 h-4 text-transparent">&nbsp;</p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            className="bg-[#19C0FF] hover:bg-[#19C0FF] text-white w-[266px] h-[56px] rounded-full text-base font-medium gap-1 cursor-pointer"
          >
            <Search className="mr-2 h-5 w-5" strokeWidth={2.5} />
            SEARCH
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
}
