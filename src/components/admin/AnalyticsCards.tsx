import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, FileText, Users, Monitor, Globe, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

type PageStat = { page_path: string; count: number };
type NamedStat = { name: string; count: number };

const parseDevice = (ua: string | null): string => {
  if (!ua) return "Unknown";
  const lower = ua.toLowerCase();
  if (/tablet|ipad/.test(lower)) return "Tablet";
  if (/mobile|android|iphone|ipod/.test(lower)) return "Mobile";
  return "Desktop";
};

const parseSource = (referrer: string | null): string => {
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.replace("www.", "");
    if (/google\.|bing\.|yahoo\.|duckduckgo\.|baidu\./.test(host)) return "Search";
    if (/facebook\.|instagram\.|twitter\.|x\.com|linkedin\.|tiktok\.|youtube\./.test(host)) return "Social";
    return host;
  } catch {
    return "Other";
  }
};

// Convert ISO country code to flag emoji
const countryFlag = (code: string): string => {
  if (!code || code.length !== 2) return "🌐";
  const offset = 0x1f1e6;
  return String.fromCodePoint(
    code.charCodeAt(0) - 65 + offset,
    code.charCodeAt(1) - 65 + offset
  );
};

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

const countryName = (code: string): string => COUNTRY_NAMES[code] || code;

const StatBar = ({ items, total }: { items: NamedStat[]; total: number }) => (
  <div className="space-y-2">
    {items.map((item) => {
      const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
      return (
        <div key={item.name} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/80 flex items-center gap-1.5">{item.name}</span>
            <span className="font-medium text-foreground text-xs">{item.count} ({pct}%)</span>
          </div>
          <Progress value={pct} className="h-1.5" />
        </div>
      );
    })}
  </div>
);

type CountryStat = { code: string; visitors: number };

const CountryBar = ({ items, maxVisitors }: { items: CountryStat[]; maxVisitors: number }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-xs text-muted-foreground font-medium px-1 mb-2">
      <span>Country</span>
      <span>Visitors</span>
    </div>
    {items.map((item) => {
      const pct = maxVisitors > 0 ? (item.visitors / maxVisitors) * 100 : 0;
      return (
        <div key={item.code} className="relative flex items-center gap-3 rounded-md px-3 py-2">
          <div
            className="absolute inset-0 rounded-md bg-primary/15"
            style={{ width: `${pct}%` }}
          />
          <span className="relative text-base leading-none">{countryFlag(item.code)}</span>
          <span className="relative text-sm text-foreground/90 flex-1">{countryName(item.code)}</span>
          <span className="relative text-sm font-semibold text-foreground">{item.visitors}</span>
        </div>
      );
    })}
  </div>
);

const defaultRange = (): DateRange => {
  const to = new Date();
  to.setHours(23, 59, 59, 999);
  const from = new Date();
  from.setDate(from.getDate() - 6);
  from.setHours(0, 0, 0, 0);
  return { from, to };
};

export const AnalyticsCards = () => {
  const [range, setRange] = useState<DateRange>(defaultRange);
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [topPages, setTopPages] = useState<PageStat[]>([]);
  const [devices, setDevices] = useState<NamedStat[]>([]);
  const [sources, setSources] = useState<NamedStat[]>([]);
  const [countries, setCountries] = useState<CountryStat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async (r: DateRange) => {
    setLoading(true);

    const fromISO = r.from.toISOString();
    const toISO = r.to.toISOString();

    const { count: total } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", fromISO)
      .lte("created_at", toISO);

    // Today unique visitors
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { data: todayViews } = await supabase
      .from("page_views")
      .select("visitor_id" as any)
      .gte("created_at", todayStart.toISOString());
    const todayUniqueSet = new Set<string>();
    (todayViews as any[])?.forEach((v) => { if (v.visitor_id) todayUniqueSet.add(v.visitor_id); });

    const { data: allViews } = await supabase
      .from("page_views")
      .select("page_path, visitor_id, user_agent, referrer, created_at, country" as any)
      .gte("created_at", fromISO)
      .lte("created_at", toISO);

    const visitorSet = new Set<string>();
    // Track unique visitors per dimension
    const pageVisitors: Record<string, Set<string>> = {};
    const deviceVisitors: Record<string, Set<string>> = {};
    const sourceVisitors: Record<string, Set<string>> = {};
    const countryVisitors: Record<string, Set<string>> = {};

    (allViews as any[])?.forEach((v) => {
      const vid = v.visitor_id;
      if (vid) visitorSet.add(vid);

      if (!pageVisitors[v.page_path]) pageVisitors[v.page_path] = new Set();
      if (vid) pageVisitors[v.page_path].add(vid);

      const device = parseDevice(v.user_agent);
      if (!deviceVisitors[device]) deviceVisitors[device] = new Set();
      if (vid) deviceVisitors[device].add(vid);

      const source = parseSource(v.referrer);
      if (!sourceVisitors[source]) sourceVisitors[source] = new Set();
      if (vid) sourceVisitors[source].add(vid);

      const cc = v.country || "Unknown";
      if (!countryVisitors[cc]) countryVisitors[cc] = new Set();
      if (vid) countryVisitors[cc].add(vid);
    });

    const toSorted = (obj: Record<string, number>) =>
      Object.entries(obj)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    const countrySorted = Object.entries(countryVisitors)
      .map(([code, set]) => ({ code, visitors: set.size }))
      .sort((a, b) => b.visitors - a.visitors);

    setTotalViews(total || 0);
    setTodayViews(today || 0);
    setUniqueVisitors(visitorSet.size);
    setTopPages(toSorted(pageCounts).slice(0, 5).map(s => ({ page_path: s.name, count: s.count })));
    setDevices(toSorted(deviceCounts));
    setSources(toSorted(sourceCounts).slice(0, 6));
    setCountries(countrySorted);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnalytics(range);
  }, [range, fetchAnalytics]);

  const viewTotal = devices.reduce((s, d) => s + d.count, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
        <DateRangePicker range={range} onChange={setRange} />
      </div>

      {loading ? null : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Period Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{totalViews}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{todayViews}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Unique Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{uniqueVisitors}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <Monitor className="w-4 h-4" /> Devices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StatBar items={devices} total={viewTotal} />
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StatBar items={sources} total={viewTotal} />
              </CardContent>
            </Card>
          </div>

          {countries.length > 0 && (
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Visitors by Country
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CountryBar items={countries} maxVisitors={countries[0]?.visitors || 1} />
              </CardContent>
            </Card>
          )}

          {topPages.length > 0 && (
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topPages.map((p) => (
                  <div key={p.page_path} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/80 truncate max-w-[200px]">{p.page_path}</span>
                    <span className="font-medium text-foreground">{p.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
