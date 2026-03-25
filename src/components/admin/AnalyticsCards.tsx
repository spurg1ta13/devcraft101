import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, FileText, Users, Monitor, Smartphone, Tablet, Globe } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DateRangePicker, type DateRange } from "./DateRangePicker";
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

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: today } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    const { data: allViews } = await supabase
      .from("page_views")
      .select("page_path, visitor_id, user_agent, referrer, created_at")
      .gte("created_at", fromISO)
      .lte("created_at", toISO);

    const pageCounts: Record<string, number> = {};
    const visitorSet = new Set<string>();
    const deviceCounts: Record<string, number> = {};
    const sourceCounts: Record<string, number> = {};

    allViews?.forEach((v) => {
      pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1;
      if (v.visitor_id) visitorSet.add(v.visitor_id);
      const device = parseDevice(v.user_agent);
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      const source = parseSource(v.referrer);
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    const toSorted = (obj: Record<string, number>) =>
      Object.entries(obj)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    setTotalViews(total || 0);
    setTodayViews(today || 0);
    setUniqueVisitors(visitorSet.size);
    setTopPages(toSorted(pageCounts).slice(0, 5).map(s => ({ page_path: s.name, count: s.count })));
    setDevices(toSorted(deviceCounts));
    setSources(toSorted(sourceCounts).slice(0, 6));
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

          <ViewsChart range={range} />

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
