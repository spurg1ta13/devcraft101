import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type DateRange = { from: Date; to: Date };

const presets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

interface Props {
  range: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangePicker = ({ range, onChange }: Props) => {
  const handlePreset = (days: number) => {
    const to = new Date();
    to.setHours(23, 59, 59, 999);
    const from = new Date();
    from.setDate(from.getDate() - (days - 1));
    from.setHours(0, 0, 0, 0);
    onChange({ from, to });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {presets.map((p) => (
        <Button
          key={p.days}
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => handlePreset(p.days)}
        >
          {p.label}
        </Button>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={cn("text-xs gap-1.5 min-w-[200px] justify-start")}>
            <CalendarIcon className="w-3.5 h-3.5" />
            {format(range.from, "MMM d")} – {format(range.to, "MMM d, yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            defaultMonth={range.from}
            selected={{ from: range.from, to: range.to }}
            onSelect={(sel) => {
              if (sel?.from) {
                const from = new Date(sel.from);
                from.setHours(0, 0, 0, 0);
                const to = sel.to ? new Date(sel.to) : new Date(sel.from);
                to.setHours(23, 59, 59, 999);
                onChange({ from, to });
              }
            }}
            disabled={(date) => date > new Date()}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
