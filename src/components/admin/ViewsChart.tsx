import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DateRange } from "./DateRangePicker";

type DayStat = { date: string; views: number; visitors: number };

interface Props {
  range: DateRange;
}

export const ViewsChart = ({ range }: Props) => {
  const [data, setData] = useState<DayStat[]>([]);

  useEffect(() => {
    fetchData();
  }, [range]);

  const fetchData = async () => {
    const { data: views } = await supabase
      .from("page_views")
      .select("created_at, visitor_id")
      .gte("created_at", range.from.toISOString())
      .lte("created_at", range.to.toISOString());

    // Build day map for the full range
    const dayMap: Record<string, { views: number; visitors: Set<string> }> = {};
    const current = new Date(range.from);
    while (current <= range.to) {
      const key = current.toISOString().split("T")[0];
      dayMap[key] = { views: 0, visitors: new Set() };
      current.setDate(current.getDate() + 1);
    }

    views?.forEach((v) => {
      const key = v.created_at.split("T")[0];
      if (dayMap[key]) {
        dayMap[key].views++;
        if (v.visitor_id) dayMap[key].visitors.add(v.visitor_id);
      }
    });

    const days = Object.keys(dayMap).length;
    const fmt: Intl.DateTimeFormatOptions =
      days <= 14
        ? { weekday: "short", month: "short", day: "numeric" }
        : { month: "short", day: "numeric" };

    const result: DayStat[] = Object.entries(dayMap).map(([date, val]) => ({
      date: new Date(date).toLocaleDateString("en-US", fmt),
      views: val.views,
      visitors: val.visitors.size,
    }));

    setData(result);
  };

  if (data.length === 0) return null;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4" /> Views Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              interval={data.length > 14 ? Math.floor(data.length / 7) : 0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="hsl(var(--primary))"
              fill="url(#viewsGrad)"
              strokeWidth={2}
              name="Views"
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--accent))"
              fill="url(#visitorsGrad)"
              strokeWidth={2}
              name="Visitors"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
