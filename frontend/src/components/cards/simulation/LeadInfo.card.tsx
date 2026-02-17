import { LeadDetails } from "../../../lib/interfaces/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { User, Mail, Phone } from "lucide-react";

interface Props {
  lead: LeadDetails;
}

export function LeadInfoCard({ lead }: Props) {
  return (
    <GlassCard className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
          {lead.nomeCompleto?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">
            Lead
          </p>
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {lead.nomeCompleto}
          </h2>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-6" />

      {/* Info grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Info icon={<User size={13} />} label="Nome" value={lead.nomeCompleto} />
        <Info icon={<Mail size={13} />} label="E-mail" value={lead.email} />
        <Info icon={<Phone size={13} />} label="Telefone" value={lead.telefone} />
      </div>
    </GlassCard>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon && (
          <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
            {icon}
          </span>
        )}
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          {label}
        </p>
      </div>
      <p className="text-sm text-gray-800 font-medium">{value}</p>
    </div>
  );
}