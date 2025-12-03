import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, Paperclip, Mic, StopCircle, Sparkles, Database, FileSearch, Activity, FileText, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  artifacts?: { type: 'plan' | 'code' | 'doc', title: string }[];
  reasoning?: string[];
}

// Mock LLM Response Logic
function generateMockResponse(input: string): { content: string, reasoning: string[], artifacts: any[] } {
  const lowerInput = input.toLowerCase();

  // 1. Greetings
  if (lowerInput.match(/^(hi|hello|hey|greetings|good morning|good afternoon)/)) {
    return {
      content: "Hello! I am your Enterprise Agent Orchestrator. I'm connected to your organization's Knowledge Base and ready to assist.\n\nYou can ask me to:\n- Analyze risk in contracts\n- Generate financial reports\n- Search internal compliance policies\n- Or just chat about your data.\n\nHow can I help you today?",
      reasoning: [
        "Detected greeting intent",
        "Loading user profile: Vinay Kumar (Admin)",
        "Checking system status: All systems nominal"
      ],
      artifacts: []
    };
  }

  // 2. Identity / Capabilities
  if (lowerInput.includes("who are you") || lowerInput.includes("what can you do")) {
    return {
      content: "I am a next-generation Agentic RAG system designed for enterprise automation. Unlike standard chatbots, I can:\n\n1. **Plan**: Decompose complex goals into steps.\n2. **Act**: Retrieve live data from your connected pipelines (SQL, S3, VectorDB).\n3. **Verify**: Cross-reference my findings against your compliance guardrails.\n\nTry asking me to 'Analyze the latest vendor agreement' to see me in action.",
      reasoning: [
        "Retrieving system capabilities manifest",
        "Summarizing core functions: Planning, Retrieval, Verification"
      ],
      artifacts: []
    };
  }

  // 3. Demo Scenario: Risk Analysis
  if (lowerInput.includes("risk") || lowerInput.includes("contract") || lowerInput.includes("agreement")) {
    return {
      content: "I've analyzed the **TechCorp Vendor Agreement** as requested.\n\n**CRITICAL FINDING:** Clause 4.2 contains a non-standard indemnity limit that exposes us to unlimited liability. This violates our Global Compliance Policy v2.\n\nI recommend flagging this for Legal Review immediately.",
      reasoning: [
        "Retrieving 'Standard_Indemnity_Policy_2025.pdf' from Knowledge Base",
        "Vector Search: 'Indemnity Limit' AND 'Liability Cap'",
        "Comparing Clause 4.2 vs Policy Section 9.1",
        "Delta detected: Unlimited vs Cap at 2x Contract Value",
        "Risk Score: HIGH (9/10)"
      ],
      artifacts: [
        { type: 'doc', title: 'Risk_Assessment_Report_v1.pdf' },
        { type: 'code', title: 'Generated_Amendment_Clause.txt' }
      ]
    };
  }

  // 4. Demo Scenario: Finance
  if (lowerInput.includes("finance") || lowerInput.includes("report") || lowerInput.includes("quarter") || lowerInput.includes("revenue")) {
    return {
      content: "I've generated the **Q3 Financial Summary**. Here are the key highlights:\n\n- **Revenue:** $4.2M (+12% YoY)\n- **OpEx:** $1.8M (+8% due to R&D expansion)\n- **Net Margin:** 22% (Stable)\n\nI have attached the full breakdown below.",
      reasoning: [
        "Connecting to PostgreSQL CRM...",
        "Executing Query: SELECT * FROM financials_q3_2025",
        "Aggregating revenue across North America & EMEA regions",
        "Calculating YoY growth vs Q3 2024",
        "Generating visualization artifacts"
      ],
      artifacts: [
        { type: 'doc', title: 'Q3_Financial_Summary.xlsx' },
        { type: 'doc', title: 'Revenue_Chart_Q3.png' }
      ]
    };
  }

  // 5. General / Fallback
  return {
    content: "I understand your request. I will retrieve the relevant documents from the Knowledge Base to provide an accurate answer.\n\nSearching for context related to your query...",
    reasoning: [
      "Decomposing query into search terms",
      "Querying Vector DB (Index: Main)",
      "Found 12 relevant chunks (Confidence: 0.85)",
      "Synthesizing answer..."
    ],
    artifacts: []
  };
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'I am ready to assist. You can ask me to analyze documents, generate reports, or perform complex multi-step reasoning tasks using the RAG pipeline.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const msgContent = text || input;
    if (!msgContent.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msgContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsProcessing(true);

    // Simulate agent thinking and response
    setTimeout(() => {
      const response = generateMockResponse(msgContent);
      
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        reasoning: response.reasoning,
        artifacts: response.artifacts
      };
      
      setMessages(prev => [...prev, responseMsg]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col h-full rounded-xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden shadow-xl">
          
          {/* Chat Header */}
          <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-card/50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Agent Orchestrator</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Online • Model: GPT-4o
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <div className="hidden md:flex gap-2 mr-4">
                 <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleSend("Analyze the risk in the TechCorp Vendor Agreement")}>
                   Demo: Risk Analysis
                 </Button>
                 <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleSend("Generate Q3 Financial Report summary")}>
                   Demo: Finance Report
                 </Button>
               </div>
               <Badge variant="outline" className="text-xs font-mono text-muted-foreground bg-background/50">
                 Session ID: #8X29-L
               </Badge>
               <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted cursor-pointer">
                 <Settings className="h-4 w-4 text-muted-foreground" />
               </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex gap-4 max-w-3xl",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}>
                {/* Avatar */}
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                  msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted border border-border"
                )}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-primary" />}
                </div>

                {/* Bubble */}
                <div className={cn(
                  "space-y-2",
                  msg.role === 'user' ? "items-end flex flex-col" : "w-full"
                )}>
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-card border border-border rounded-tl-sm"
                  )}>
                    {msg.content}
                  </div>

                  {/* Reasoning / Artifacts (Assistant Only) */}
                  {msg.role === 'assistant' && (
                    <div className="space-y-2 w-full max-w-xl animate-in fade-in slide-in-from-top-2">
                      
                      {/* Reasoning Chain */}
                      {msg.reasoning && msg.reasoning.length > 0 && (
                        <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-xs font-mono space-y-1.5">
                          <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
                            <Activity className="h-3 w-3" />
                            <span className="font-semibold">Thought Process</span>
                          </div>
                          {msg.reasoning.map((step, i) => (
                            <div key={i} className="flex gap-2 text-muted-foreground/80">
                              <span className="text-primary/40">{i + 1}.</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Artifacts */}
                      {msg.artifacts && msg.artifacts.map((artifact, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors cursor-pointer group">
                          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{artifact.title}</p>
                            <p className="text-xs text-muted-foreground">Click to view generated artifact</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <span className="text-[10px] text-muted-foreground px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex gap-4 max-w-3xl">
                 <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                 </div>
                 <div className="flex items-center gap-1 h-10 px-4 bg-card border border-border rounded-2xl rounded-tl-sm">
                   <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                   <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                   <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-card/50 border-t border-border">
            <div className="relative flex items-end gap-2 bg-muted/30 border border-border/50 rounded-xl p-2 focus-within:border-primary/30 focus-within:bg-muted/50 transition-all ring-offset-background focus-within:ring-1 focus-within:ring-ring">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground shrink-0 mb-0.5">
                <Paperclip className="h-4 w-4" />
              </Button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Message Agent Orchestrator..."
                className="flex-1 min-h-[40px] max-h-[200px] bg-transparent border-none resize-none py-2.5 text-sm focus:outline-none placeholder:text-muted-foreground"
                rows={1}
              />
              <div className="flex items-center gap-1 mb-0.5 shrink-0">
                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => handleSend()} 
                  disabled={!input.trim() || isProcessing}
                  size="icon" 
                  className={cn(
                    "h-9 w-9 rounded-lg transition-all duration-200",
                    input.trim() ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              AI can make mistakes. Please verify sensitive information.
            </p>
          </div>
        </div>

        {/* Sidebar: Context / Tools */}
        <div className="hidden lg:flex flex-col gap-6">
           <Card className="flex-1 bg-card/30 backdrop-blur-sm border-border/50 flex flex-col overflow-hidden">
             <Tabs defaultValue="context" className="w-full flex-1 flex flex-col">
                <div className="px-4 pt-4">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="context">Context</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="context" className="flex-1 p-4 space-y-4 overflow-y-auto">
                   <div className="space-y-3">
                     <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Documents</h4>
                     <div className="space-y-2">
                       <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border/50 text-xs">
                         <FileSearch className="h-3 w-3 text-primary" />
                         <span className="truncate">Global_Compliance_Policy_v2.pdf</span>
                       </div>
                       <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border/50 text-xs">
                         <FileSearch className="h-3 w-3 text-primary" />
                         <span className="truncate">Vendor_Agreement_TechCorp.pdf</span>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-3 pt-4 border-t border-border/50">
                     <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Memory</h4>
                     <div className="text-xs text-muted-foreground space-y-2">
                       <p>• User is asking about risk analysis</p>
                       <p>• Focus on "Liability" and "Indemnity" clauses</p>
                       <p>• Preference: Concise bullet points</p>
                     </div>
                   </div>
                </TabsContent>

                <TabsContent value="tools" className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <ToolItem icon={Database} name="Vector Search" status="ready" />
                    <ToolItem icon={Sparkles} name="GPT-4o Reasoner" status="active" />
                    <ToolItem icon={FileText} name="PDF Parser" status="ready" />
                    <ToolItem icon={Activity} name="Risk Calculator" status="ready" />
                  </div>
                </TabsContent>
             </Tabs>
           </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function ToolItem({ icon: Icon, name, status }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-3 w-3" />
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <Badge variant={status === 'active' ? 'default' : 'outline'} className="text-[10px] h-5">
        {status.toUpperCase()}
      </Badge>
    </div>
  )
}
