import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, GitCommit, CheckCircle2, Circle, Play, Database, Server, ArrowRight, RefreshCw } from "lucide-react";

export default function Pipelines() {
  return (
    <AppLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">System Pipelines</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Monitor CI/CD deployments and Data ETL workflows.
          </p>
        </div>
        <div className="flex gap-2">
             <Button variant="outline">
                <GitBranch className="mr-2 h-4 w-4" />
                View Repo
             </Button>
             <Button>
                <Play className="mr-2 h-4 w-4" />
                Run Pipeline Manual
             </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CI/CD Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            CI/CD & Deployment
          </h2>
          
          <Card className="relative overflow-hidden border-l-4 border-l-green-500">
            <div className="absolute top-0 right-0 p-4">
               <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Passing</Badge>
            </div>
            <CardHeader>
              <CardTitle>Production Deploy #1024</CardTitle>
              <CardDescription>Branch: main • Commit: 8a2f9c • 12 mins ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex flex-col gap-6">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-muted" />

                <PipelineStep 
                  status="success" 
                  title="Build" 
                  desc="Compiling Typescript & Assets" 
                  time="45s" 
                />
                <PipelineStep 
                  status="success" 
                  title="Test" 
                  desc="Running Unit & E2E Tests" 
                  time="1m 20s" 
                />
                <PipelineStep 
                  status="success" 
                  title="Dockerize" 
                  desc="Building Container Image" 
                  time="2m 10s" 
                />
                 <PipelineStep 
                  status="success" 
                  title="Deploy" 
                  desc="Pushing to Kubernetes Cluster" 
                  time="30s" 
                />
              </div>
            </CardContent>
          </Card>

           <Card className="opacity-70">
            <CardHeader>
              <CardTitle className="text-base">Recent History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Deploy #1023</span>
                    </div>
                    <span className="text-muted-foreground">2 hours ago</span>
                </div>
                 <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Deploy #1022</span>
                    </div>
                    <span className="text-muted-foreground">5 hours ago</span>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* ETL Section */}
         <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Database className="h-5 w-5 text-accent" />
            Data ETL Pipelines
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Ingestion Stream</CardTitle>
              <CardDescription>Active Sync • Next Run: 10 mins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <div className="text-2xl font-bold text-foreground">1.2GB</div>
                        <div className="text-xs text-muted-foreground">Processed</div>
                    </div>
                     <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <div className="text-2xl font-bold text-green-500">100%</div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                     <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <div className="text-2xl font-bold text-primary">42ms</div>
                        <div className="text-xs text-muted-foreground">Avg Latency</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Connectors</h3>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card/50">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-500">
                                <Database className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="font-medium text-sm">PostgreSQL CRM</div>
                                <div className="text-xs text-muted-foreground">Syncing Customer Records</div>
                            </div>
                        </div>
                        <RefreshCw className="h-4 w-4 text-green-500 animate-spin" />
                    </div>

                     <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card/50">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-500">
                                <Server className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="font-medium text-sm">S3 Document Lake</div>
                                <div className="text-xs text-muted-foreground">Indexing PDF Contracts</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-xs text-muted-foreground">Idle</span>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function PipelineStep({ status, title, desc, time }: any) {
  return (
    <div className="relative z-10 flex items-start gap-4">
      <div className="mt-0.5 bg-background rounded-full p-1 border border-border">
         {status === 'success' ? (
             <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10" />
         ) : (
             <Circle className="h-5 w-5 text-muted-foreground" />
         )}
      </div>
      <div className="flex-1 flex justify-between items-start">
         <div>
             <h4 className="font-medium text-sm text-foreground">{title}</h4>
             <p className="text-xs text-muted-foreground">{desc}</p>
         </div>
         <span className="text-xs font-mono text-muted-foreground">{time}</span>
      </div>
    </div>
  )
}
