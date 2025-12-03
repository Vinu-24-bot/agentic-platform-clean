import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Bot, Settings, Play, MoreHorizontal, BrainCircuit, ShieldCheck, Code } from "lucide-react";

const AGENTS = [
  {
    id: "1",
    name: "Legal Compliance Bot",
    role: "Risk Analyst",
    model: "GPT-4o",
    status: "active",
    capabilities: ["Contract Review", "Policy Check", "Risk Scoring"],
    lastActive: "2 mins ago",
    avatar: "LC"
  },
  {
    id: "2",
    name: "Finance Forecaster",
    role: "Data Scientist",
    model: "Claude 3.5 Sonnet",
    status: "active",
    capabilities: ["Revenue Projection", "Expense Audit", "Q-on-Q Analysis"],
    lastActive: "1 hour ago",
    avatar: "FF"
  },
  {
    id: "3",
    name: "Customer Support Lead",
    role: "Support Manager",
    model: "Llama 3 70B",
    status: "paused",
    capabilities: ["Ticket Triage", "Sentiment Analysis", "Auto-Reply"],
    lastActive: "1 day ago",
    avatar: "CS"
  },
  {
    id: "4",
    name: "SecOps Guardian",
    role: "Security Engineer",
    model: "Mistral Large",
    status: "maintenance",
    capabilities: ["Log Analysis", "Threat Detection", "Access Review"],
    lastActive: "Offline",
    avatar: "SG"
  }
];

export default function AgentStudio() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Agent Studio</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Design, configure, and deploy your autonomous workforce.
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" />
          Create New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENTS.map((agent) => (
          <Card key={agent.id} className="group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{agent.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-bold">{agent.name}</CardTitle>
                  <CardDescription className="text-xs">{agent.role}</CardDescription>
                </div>
              </div>
              <div className="flex gap-1">
                 <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="capitalize text-[10px] h-5">
                   {agent.status}
                 </Badge>
                 <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                   <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-muted/50 border border-border/50 flex flex-col gap-1">
                   <div className="flex items-center gap-1.5 text-muted-foreground">
                     <BrainCircuit className="h-3 w-3" />
                     <span>Model</span>
                   </div>
                   <span className="font-medium text-foreground">{agent.model}</span>
                </div>
                <div className="p-2 rounded bg-muted/50 border border-border/50 flex flex-col gap-1">
                   <div className="flex items-center gap-1.5 text-muted-foreground">
                     <ShieldCheck className="h-3 w-3" />
                     <span>Guardrails</span>
                   </div>
                   <span className="font-medium text-foreground">Strict</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Capabilities</span>
                <div className="flex flex-wrap gap-1.5">
                  {agent.capabilities.map((cap) => (
                    <Badge key={cap} variant="outline" className="text-[10px] bg-background/50">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4 px-6 flex gap-2">
              <Button className="w-full h-8 text-xs gap-2" variant="outline">
                <Settings className="h-3 w-3" />
                Configure
              </Button>
              <Button className="w-full h-8 text-xs gap-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20">
                <Play className="h-3 w-3" />
                Test
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add New Placeholder */}
        <button className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-muted/20 transition-all h-full min-h-[280px] group text-muted-foreground hover:text-primary">
          <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Plus className="h-8 w-8" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-medium text-lg text-foreground">Deploy New Agent</h3>
            <p className="text-sm max-w-[200px]">
              Instantiate a new autonomous agent from a template or custom prompt.
            </p>
          </div>
        </button>
      </div>
    </AppLayout>
  );
}
