import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Monitor, Globe, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type NamedStat = { name: string; count: number };
type CountryStat = { code: string; visitors: number };

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", GB: "United Kingdom", GR: "Greece", DE: "Germany",
  FR: "France", ES: "Spain", IT: "Italy", NL: "Netherlands", BE: "Belgium",
  PT: "Portugal", AT: "Austria", CH: "Switzerland", SE: "Sweden", NO: "Norway",
  DK: "Denmark", FI: "Finland", PL: "Poland", CZ: "Czech Republic",
  RO: "Romania", BG: "Bulgaria", HR: "Croatia", HU: "Hungary", IE: "Ireland",
  CA: "Canada", AU: "Australia", NZ: "New Zealand", JP: "Japan", KR: "South Korea",
  CN: "China", IN: "India", BR: "Brazil", MX: "Mexico", AR: "Argentina",
  CL: "Chile", CO: "Colombia", ZA: "South Africa", NG: "Nigeria", EG: "Egypt",
  TR: "Turkey", RU: "Russia", UA: "Ukraine", IL: "Israel", AE: "UAE",
  SA: "Saudi Arabia", SG: "Singapore", MY: "Malaysia", TH: "Thailand",
  PH: "Philippines", ID: "Indonesia", VN: "Vietnam", TW: "Taiwan",
  CY: "Cyprus", LT: "Lithuania", LV: "Latvia", EE: "Estonia", SK: "Slovakia",
  SI: "Slovenia", LU: "Luxembourg", MT: "Malta",
};

const countryFlag = (code: string): string => {
  if (!code || code.length !== 2) return "🌐";
  const offset = 0x1f1e6;
  return String.fromCodePoint(
    code.charCodeAt(0) - 65 + offset,
    code.charCodeAt(1) - 65 + offset
  );
};

const countryName = (code: string): string => COUNTRY_NAMES[code] || code;

interface TodayDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalToday: number;
  devices: NamedStat[];
  sources: NamedStat[];
  countries: CountryStat[];
}

export const TodayDetailModal = ({
  open, onOpenChange, totalToday, devices, sources, countries,
}: TodayDetailModalProps) => {
  const total = devices.reduce((s, d) => s + d.count, 0) || 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Today's Visitors — {totalToday} unique
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Devices */}
          <div>
            <h3 className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mb-3">
              <Monitor className="w-4 h-4" /> Devices
            </h3>
            <div className="space-y-2">
              {devices.map((item) => {
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/80">{item.name}</span>
                      <span className="font-medium text-foreground text-xs">{item.count} ({pct}%)</span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                );
              })}
              {devices.length === 0 && <p className="text-sm text-muted-foreground">No data</p>}
            </div>
          </div>

          {/* Sources */}
          <div>
            <h3 className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mb-3">
              <Globe className="w-4 h-4" /> Traffic Sources
            </h3>
            <div className="space-y-2">
              {sources.map((item) => {
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/80">{item.name}</span>
                      <span className="font-medium text-foreground text-xs">{item.count} ({pct}%)</span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                );
              })}
              {sources.length === 0 && <p className="text-sm text-muted-foreground">No data</p>}
            </div>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mb-3">
              <MapPin className="w-4 h-4" /> Countries
            </h3>
            <div className="space-y-1.5">
              {countries.map((item) => {
                const pct = countries[0]?.visitors > 0 ? (item.visitors / countries[0].visitors) * 100 : 0;
                return (
                  <div key={item.code} className="relative flex items-center gap-3 rounded-md px-3 py-2">
                    <div className="absolute inset-0 rounded-md bg-primary/15" style={{ width: `${pct}%` }} />
                    <span className="relative text-base leading-none">{countryFlag(item.code)}</span>
                    <span className="relative text-sm text-foreground/90 flex-1">{countryName(item.code)}</span>
                    <span className="relative text-sm font-semibold text-foreground">{item.visitors}</span>
                  </div>
                );
              })}
              {countries.length === 0 && <p className="text-sm text-muted-foreground px-3">No data</p>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
