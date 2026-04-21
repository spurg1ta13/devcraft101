import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarDays, Trash2, RefreshCw, Inbox, Mail, Phone } from "lucide-react";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  booking_date: string;
  booking_hour: number;
  language: string | null;
  created_at: string;
};

const BookingsSection = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_hour", { ascending: true });
    if (!error) setBookings((data as Booking[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const formatSlot = (date: string, hour: number) => {
    const d = new Date(date + "T00:00:00");
    return `${d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} • ${String(hour).padStart(2, "0")}:00 – ${String(hour + 1).padStart(2, "0")}:00`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = bookings.filter((b) => new Date(b.booking_date + "T00:00:00") >= today);

  return (
    <Card className="border-border/50">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Meeting Bookings <span className="text-muted-foreground text-sm font-normal">({upcoming.length} upcoming • {bookings.length} total)</span>
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={fetchBookings} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading...
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Inbox className="w-10 h-10 mb-2" />
            <p>No bookings yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Slot</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="max-w-[280px]">Notes</TableHead>
                <TableHead className="w-[60px]">Lang</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => {
                const isPast = new Date(b.booking_date + "T00:00:00") < today;
                return (
                  <TableRow key={b.id} className={`border-border/50 ${isPast ? "opacity-50" : ""}`}>
                    <TableCell className="font-mono text-sm whitespace-nowrap text-foreground">
                      {formatSlot(b.booking_date, b.booking_hour)}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <a href={`mailto:${b.email}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
                          <Mail className="w-3 h-3" /> {b.email}
                        </a>
                        {b.phone && (
                          <a href={`tel:${b.phone}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
                            <Phone className="w-3 h-3" /> {b.phone}
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[280px]">
                      {b.message && <p className="text-sm text-foreground/80 line-clamp-2">{b.message}</p>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground uppercase">{b.language || "—"}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete booking?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will free up the slot {formatSlot(b.booking_date, b.booking_hour)} from {b.name}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(b.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsSection;
