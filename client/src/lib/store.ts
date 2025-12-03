import { create } from "zustand";

// Mock Types
export interface LogEntry {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  status: "success" | "warning" | "error" | "info";
  details: string;
}

export interface AgentTask {
  id: string;
  name: string;
  status: "idle" | "planning" | "executing" | "verifying" | "completed" | "failed";
  progress: number;
  logs: string[];
  result?: string;
}

export interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "txt" | "url";
  status: "indexed" | "processing" | "error";
  size: string;
  lastUpdated: string;
}

interface AppState {
  activeTask: AgentTask | null;
  tasks: AgentTask[];
  documents: Document[];
  systemLogs: LogEntry[];
  
  // Actions
  addLog: (log: Omit<LogEntry, "id" | "timestamp">) => void;
  startTask: (name: string) => void;
  updateTaskStatus: (id: string, status: AgentTask["status"], progress: number, log?: string) => void;
  addDocument: (doc: Omit<Document, "id" | "status" | "lastUpdated">) => void;
}

// Initial Mock Data
const INITIAL_DOCS: Document[] = [
  { id: "1", name: "Global_Compliance_Policy_v2.pdf", type: "pdf", status: "indexed", size: "2.4MB", lastUpdated: "2h ago" },
  { id: "2", name: "Q3_Financial_Report_2025.xlsx", type: "docx", status: "indexed", size: "1.1MB", lastUpdated: "5h ago" },
  { id: "3", name: "Vendor_Agreement_TechCorp.pdf", type: "pdf", status: "indexed", size: "850KB", lastUpdated: "1d ago" },
  { id: "4", name: "https://sec.gov/regulations/crypto", type: "url", status: "processing", size: "N/A", lastUpdated: "Just now" },
];

const INITIAL_LOGS: LogEntry[] = [
  { id: "1", timestamp: "10:42:15", agent: "System", action: "Startup", status: "info", details: "Agentic RAG Platform initialized." },
  { id: "2", timestamp: "10:42:18", agent: "Delta-RAG", action: "Index Check", status: "success", details: "3 documents verified. No changes detected." },
];

export const useStore = create<AppState>((set, get) => ({
  activeTask: null,
  tasks: [],
  documents: INITIAL_DOCS,
  systemLogs: INITIAL_LOGS,

  addLog: (log) => set((state) => ({
    systemLogs: [
      { 
        id: Math.random().toString(36).substr(2, 9), 
        timestamp: new Date().toLocaleTimeString(), 
        ...log 
      }, 
      ...state.systemLogs
    ].slice(0, 100) // Keep last 100
  })),

  addDocument: (doc) => set((state) => ({
    documents: [
      {
        id: Math.random().toString(36).substr(2, 9),
        status: "processing",
        lastUpdated: "Just now",
        ...doc
      },
      ...state.documents
    ]
  })),

  startTask: (name) => {
    const newTask: AgentTask = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      status: "planning",
      progress: 0,
      logs: ["Receiving user intent...", "Initializing Planner Agent..."],
    };
    
    set((state) => ({
      activeTask: newTask,
      tasks: [newTask, ...state.tasks]
    }));

    // Simulate Agent Loop
    const store = get();
    store.addLog({ agent: "Orchestrator", action: "Task Created", status: "info", details: `Started task: ${name}` });

    // Simulation Steps
    setTimeout(() => {
      get().updateTaskStatus(newTask.id, "planning", 20, "Decomposing goal into 4 sub-tasks...");
      get().addLog({ agent: "Planner", action: "Decomposition", status: "success", details: "Goal broken down successfully." });
    }, 1500);

    setTimeout(() => {
      get().updateTaskStatus(newTask.id, "executing", 40, "Retrieving context from VectorDB (Indices: Compliance, Finance)...");
      get().addLog({ agent: "Retriever", action: "Vector Search", status: "info", details: "Found 12 relevant chunks (Score > 0.85)." });
    }, 3500);

    setTimeout(() => {
      get().updateTaskStatus(newTask.id, "executing", 60, "Analyzing documents for risk factors...");
      get().addLog({ agent: "Analyst", action: "Reasoning", status: "info", details: "Identified 2 potential compliance risks in section 4.2." });
    }, 5500);

    setTimeout(() => {
      get().updateTaskStatus(newTask.id, "verifying", 80, "Cross-referencing with latest SEC guidelines...");
      get().addLog({ agent: "Verifier", action: "Fact Check", status: "warning", details: "One risk flagged for manual review." });
    }, 7500);

    setTimeout(() => {
      get().updateTaskStatus(newTask.id, "completed", 100, "Task complete. Report generated.");
      get().addLog({ agent: "Orchestrator", action: "Completion", status: "success", details: "Task finished successfully." });
    }, 9000);
  },

  updateTaskStatus: (id, status, progress, log) => set((state) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return {};
    
    const updatedTask = {
      ...task,
      status,
      progress,
      logs: log ? [...task.logs, log] : task.logs
    };

    return {
      activeTask: state.activeTask?.id === id ? updatedTask : state.activeTask,
      tasks: state.tasks.map(t => t.id === id ? updatedTask : t)
    };
  })
}));
