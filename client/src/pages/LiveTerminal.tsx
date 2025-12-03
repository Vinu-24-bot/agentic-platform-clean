import { AppLayout } from "@/components/layout/AppLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState, useRef } from "react";
import { Terminal as TerminalIcon, Pause, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LogLine {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  module: string;
  message: string;
}

export default function LiveTerminal() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Simulate live log stream
  useEffect(() => {
    if (isPaused) return;

    const modules = ['Orchestrator', 'VectorDB', 'Planner', 'SafetyLayer', 'IngestWorker'];
    const messages = [
      'Heartbeat signal received from Worker-01',
      'Validating token usage quotas...',
      'Delta sync: No changes detected in /legal-docs',
      'Optimizing vector index shards...',
      'Garbage collection: freed 14MB memory',
      'Health check: ALL SYSTEMS GO',
      'Processing background job queue (0 pending)'
    ];

    const interval = setInterval(() => {
      const newLog: LogLine = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        level: Math.random() > 0.95 ? 'WARN' : 'INFO',
        module: modules[Math.floor(Math.random() * modules.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      };

      setLogs(prev => [...prev.slice(-99), newLog]);
    }, 800);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight flex items-center gap-3">
              <TerminalIcon className="h-8 w-8 text-primary" />
              Live Operations
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time system telemetry and debug stream.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-black rounded-lg border border-primary/20 shadow-2xl overflow-hidden font-mono text-sm relative">
          {/* Matrix-style scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
          
          <div className="absolute top-0 left-0 right-0 h-8 bg-muted/20 border-b border-primary/10 flex items-center px-4 gap-2">
             <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
             <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
             <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
             <span className="ml-2 text-xs text-primary/50">root@agentic-rag-platform:~# tail -f /var/log/syslog</span>
          </div>

          <ScrollArea className="h-full pt-10 pb-4 px-4">
            <div className="space-y-1">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-4 hover:bg-white/5 p-0.5 rounded">
                  <span className="text-muted-foreground shrink-0 w-48 opacity-50">{log.timestamp}</span>
                  <span className={`shrink-0 w-16 font-bold ${
                    log.level === 'INFO' ? 'text-blue-400' : 
                    log.level === 'WARN' ? 'text-yellow-400' : 
                    log.level === 'ERROR' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    [{log.level}]
                  </span>
                  <span className="text-primary/80 shrink-0 w-32">[{log.module}]</span>
                  <span className="text-foreground/90">{log.message}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </AppLayout>
  );
}
