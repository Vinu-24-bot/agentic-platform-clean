import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Shield, Cpu, Globe, Database } from "lucide-react";

export default function Settings() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight">System Configuration</h1>
        <p className="text-muted-foreground text-lg mt-1">
          Configure agent parameters, model hyperparameters, and security policies.
        </p>
      </div>

      <Tabs defaultValue="model" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="model">Model & AI</TabsTrigger>
          <TabsTrigger value="rag">RAG Pipeline</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="model" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                LLM Hyperparameters
              </CardTitle>
              <CardDescription>Fine-tune the cognitive behavior of your agents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Temperature (Creativity vs Precision)</Label>
                    <span className="text-sm text-muted-foreground font-mono">0.2</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={1} className="w-full" />
                  <p className="text-xs text-muted-foreground">Lower values are deterministic; higher values are more creative.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Max Context Window (Tokens)</Label>
                    <span className="text-sm text-muted-foreground font-mono">128k</span>
                  </div>
                  <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>Primary Model</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <option>GPT-4o (Enterprise)</option>
                      <option>Claude 3.5 Sonnet</option>
                      <option>Llama 3 70B (Local)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fallback Model</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <option>GPT-3.5 Turbo</option>
                      <option>Mixtral 8x7B</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rag" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Retrieval Settings
              </CardTitle>
              <CardDescription>Configure how the system ingests and retrieves knowledge.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Hybrid Search (Dense + Sparse)</Label>
                  <p className="text-sm text-muted-foreground">Combine semantic vector search with keyword matching.</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-Reindexing (Delta RAG)</Label>
                  <p className="text-sm text-muted-foreground">Automatically detect and index file changes.</p>
                </div>
                <Switch defaultChecked />
              </div>

               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Chunk Size (Characters)</Label>
                    <span className="text-sm text-muted-foreground font-mono">1024</span>
                  </div>
                  <Slider defaultValue={[40]} max={100} step={1} className="w-full" />
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
             <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Safety & Compliance
              </CardTitle>
              <CardDescription>Enterprise guardrails and PII protection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-red-500/5 border-red-500/20">
                <div className="space-y-0.5">
                  <Label className="text-base text-red-400">PII Redaction Layer</Label>
                  <p className="text-sm text-muted-foreground">Automatically mask emails, phone numbers, and SSNs before inference.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Record every agent decision and retrieval step to immutable ledger.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-6">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      </div>
    </AppLayout>
  );
}
