import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Phone } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneClicks, setPhoneClicks] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.rpc("get_phone_click_count");
      if (!cancelled && !error && data !== null) {
        setPhoneClicks(Number(data));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <Card className="border-border/50">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Phone clicks (all-time)
              </p>
              <p className="text-2xl font-black text-foreground tabular-nums">
                {phoneClicks === null ? "—" : phoneClicks.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
