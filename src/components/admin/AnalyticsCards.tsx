import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, FileText, Users } from "lucide-react";

type PageStat = { page_path: string; count: number };

export const AnalyticsCards = () => {
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [topPages, setTopPages] = useState<PageStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);

    // Total views
    const { count: total } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });

    // Today's views
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: today } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    // Top pages — fetch all page_path values and aggregate client-side
    const { data: allViews } = await supabase
      .from("page_views")
      .select("page_path");

    const pageCounts: Record<string, number> = {};
    allViews?.forEach((v) => {
      const p = v.page_path;
      pageCounts[p] = (pageCounts[p] || 0) + 1;
    });

    const sorted = Object.entries(pageCounts)
      .map(([page_path, count]) => ({ page_path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTotalViews(total || 0);
    setTodayViews(today || 0);
    setTopPages(sorted);
    setLoading(false);
  };

  if (loading) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Page Views</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> Total Views
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
    </div>
  );
};
