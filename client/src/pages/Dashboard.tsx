import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight, Play, FileText, Activity, Clock, CheckCircle2, AlertCircle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { activeTask, tasks, systemLogs, documents, startTask } = useStore();

  const activeAgents = 3;
  const totalDocs = documents.length;
  const successRate = 98.5;

  return (
    <AppLayout>
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 space-y-2">
          <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">
            Mission Control
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor autonomous agents, manage RAG pipelines, and oversee enterprise workflows.
          </p>
        </div>
        <div className="flex items-end justify-end">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Operational
            <span className="mx-1">•</span>
            v2.4.0-beta
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Active Agents" 
          value={activeAgents.toString()} 
          change="+12%" 
          icon={Layers} 
          trend="up"
        />
        <StatCard 
          title="Knowledge Base" 
          value={totalDocs.toString()} 
          unit="Docs"
          change="+4 this week" 
          icon={FileText} 
          trend="neutral"
        />
        <StatCard 
          title="Task Success" 
          value={successRate.toString()} 
          unit="%"
          change="+0.2%" 
          icon={CheckCircle2} 
          trend="up"
        />
        <StatCard 
          title="Avg. Response" 
          value="1.2" 
          unit="s"
          change="-0.3s" 
          icon={Clock} 
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Main Activity Feed / Active Task */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Active Task Panel */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur shadow-lg shadow-primary/5">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Active Operation
                  </CardTitle>
                  <CardDescription>Real-time agent orchestration view</CardDescription>
                </div>
                {activeTask && (
                  <Badge variant={activeTask.status === 'completed' ? 'default' : 'secondary'} className="animate-pulse-subtle">
                    {activeTask.status.toUpperCase()}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 min-h-[250px] flex flex-col justify-center items-center">
              {activeTask ? (
                <div className="w-full space-y-6">
                   <div className="flex justify-between items-end mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{activeTask.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {activeTask.id}</p>
                    </div>
                    <span className="text-2xl font-mono text-primary">{activeTask.progress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${activeTask.progress}%` }}
                    />
                  </div>

                  {/* Live Logs */}
                  <div className="bg-black/40 rounded-md p-4 font-mono text-xs space-y-2 h-32 overflow-y-auto border border-border/50">
                    {activeTask.logs.map((log, i) => (
                      <div key={i} className="flex gap-2 text-muted-foreground animate-in fade-in slide-in-from-left-2">
                        <span className="text-primary/50">{">"}</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    {activeTask.status === 'planning' && (
                       <div className="flex gap-2 text-primary animate-pulse">
                        <span className="text-primary/50">{">"}</span>
                        <span>Thinking...</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">No Active Tasks</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto mt-1">
                      Agents are standing by. Initialize a new workflow to begin processing.
                    </p>
                  </div>
                  <Button onClick={() => startTask("Contract Risk Analysis - Vendor #402")} className="mt-4">
                    Start Demo Task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity Log */}
          <Card className="flex-1 overflow-hidden flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">System Event Log</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full max-h-[300px]">
                <div className="divide-y divide-border/50">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-4 hover:bg-muted/20 transition-colors text-sm">
                      <div className={cn(
                        "mt-0.5 h-2 w-2 rounded-full shrink-0",
                        log.status === 'success' ? "bg-green-500" :
                        log.status === 'error' ? "bg-red-500" :
                        log.status === 'warning' ? "bg-yellow-500" : "bg-blue-500"
                      )} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{log.action}</span>
                          <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-1">{log.details}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] px-1.5 h-5">{log.agent}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: RAG Status */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-accent" />
                Knowledge Sources
              </CardTitle>
              <CardDescription>RAG Pipeline Status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {documents.slice(0, 5).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                      <span className="text-xs font-bold text-muted-foreground group-hover:text-accent">
                        {doc.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size} • {doc.lastUpdated}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    doc.status === 'indexed' ? "bg-green-500" : "bg-yellow-500 animate-pulse"
                  )} />
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 text-xs h-8">
                Manage Knowledge Base
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
             <CardHeader>
              <CardTitle className="text-base">Agent Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Planner Agent</span>
                   <span className="text-green-500 font-mono">ONLINE</span>
                 </div>
                 <div className="h-1 bg-muted rounded-full overflow-hidden">
                   <div className="h-full w-full bg-green-500" />
                 </div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Retriever Agent</span>
                   <span className="text-green-500 font-mono">ONLINE</span>
                 </div>
                 <div className="h-1 bg-muted rounded-full overflow-hidden">
                   <div className="h-full w-[98%] bg-green-500" />
                 </div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Analyst Agent</span>
                   <span className="text-green-500 font-mono">IDLE</span>
                 </div>
                 <div className="h-1 bg-muted rounded-full overflow-hidden">
                   <div className="h-full w-full bg-green-500/50" />
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, unit, change, icon: Icon, trend }: any) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-sidebar-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline gap-1">
          <div className="text-2xl font-bold font-heading">{value}</div>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        <div className={cn(
          "text-xs flex items-center mt-1",
          trend === 'up' ? "text-green-500" : "text-muted-foreground"
        )}>
          {change}
          {trend === 'up' && <ArrowUpRight className="h-3 w-3 ml-0.5" />}
        </div>
      </CardContent>
    </Card>
  )
}
