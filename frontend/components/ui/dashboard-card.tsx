import { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
}

export default function DashboardCard({
  title,
  children,
}: DashboardCardProps) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-800
      bg-[#07101A]
      p-5
      shadow-[0_0_25px_rgba(56,189,248,0.08)]
      transition-all
      hover:border-cyan-500/40
      "
    >
      {title && (
        <h3 className="mb-4 text-lg font-semibold">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}