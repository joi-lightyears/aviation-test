'use client';

import { useState, useRef, useEffect } from 'react';
import Icons from '@/components/ui/icons';
import { locations } from '@/lib/data/locations';
import { cn } from '@/lib/utils';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  label: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  error,
  label,
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredLocations = locations.filter(
    (loc) =>
      loc.english_name.toLowerCase().includes(search.toLowerCase()) ||
      loc.short_code.toLowerCase().includes(search.toLowerCase()) ||
      loc.code_state.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (locationName: string) => {
    onChange(locationName);
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div className="relative min-w-0" ref={wrapperRef}>
      <label className="text-xs text-[#65686F] font-medium mb-1.5 block uppercase whitespace-nowrap">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icons.Bus className="w-4 h-4 text-black" />
        </div>
        <input
          type="text"
          value={value || search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (value) onChange('');
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            'w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all truncate text-sm placeholder:text-sm',
            error ? 'border-red-400' : 'border-gray-200'
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-[331px] mt-1 bg-white border-none rounded-2xl max-h-60 overflow-y-auto shadow-[0_3px_10px_rgba(17,24,39,0.06),0_-2px_8px_rgba(17,24,39,0.04),3px_0_8px_rgba(17,24,39,0.04),-3px_0_8px_rgba(17,24,39,0.04)]">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <button
                key={location.short_code}
                type="button"
                onClick={() => handleSelect(location.english_name)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-sm text-gray-900">
                  {location.short_code} - {location.english_name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {location.code_state}
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No locations found
            </div>
          )}
        </div>
      )}

      <p
        className={cn(
          'text-xs mt-1 h-4',
          error ? 'text-red-500' : 'text-transparent'
        )}
      >
        {error || ''}
      </p>
    </div>
  );
}
