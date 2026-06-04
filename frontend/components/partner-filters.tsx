"use client";

interface PartnerFiltersProps {
  analytics: boolean;
  location: boolean;
  adExchange: boolean;

  setAnalytics: (value: boolean) => void;
  setLocation: (value: boolean) => void;
  setAdExchange: (value: boolean) => void;
}

export default function PartnerFilters({
  analytics,
  location,
  adExchange,
  setAnalytics,
  setLocation,
  setAdExchange,
}: PartnerFiltersProps) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
      <h3 className="mb-4 font-semibold">
        Filters
      </h3>

      <div className="space-y-3">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) =>
              setAnalytics(e.target.checked)
            }
          />

          Analytics SDK
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={location}
            onChange={(e) =>
              setLocation(e.target.checked)
            }
          />

          Location Provider
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={adExchange}
            onChange={(e) =>
              setAdExchange(e.target.checked)
            }
          />

          Ad Exchange
        </label>

      </div>
    </div>
  );
}