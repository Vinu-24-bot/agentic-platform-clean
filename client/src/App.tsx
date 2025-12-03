import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import AgentChat from "@/pages/AgentChat";
import KnowledgeBase from "@/pages/KnowledgeBase";
import Settings from "@/pages/Settings";
import LiveTerminal from "@/pages/LiveTerminal";
import Pipelines from "@/pages/Pipelines";
import AgentStudio from "@/pages/AgentStudio";

// ⭐ New Components
import SemanticSearch from "@/components/SemanticSearch";
import LiveCursors from "@/components/LiveCursors";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/chat" component={AgentChat} />
      <Route path="/agents" component={AgentStudio} />
      <Route path="/knowledge" component={KnowledgeBase} />
      <Route path="/settings" component={Settings} />
      <Route path="/pipelines" component={Pipelines} />
      <Route path="/audit" component={LiveTerminal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />

        {/* ⭐ Semantic Search Box (placed at top of dashboard area) */}
        <div className="w-full flex justify-center mt-6 px-6">
          <div className="w-full max-w-3xl">
            <SemanticSearch />
          </div>
        </div>

        {/* ⭐ Main Router */}
        <Router />

        {/* ⭐ Realtime cursors (displayed on top of the UI globally) */}
        <LiveCursors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
