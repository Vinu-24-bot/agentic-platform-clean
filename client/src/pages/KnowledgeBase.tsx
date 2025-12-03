import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useStore } from "@/lib/store";
import { Upload, FileText, Link as LinkIcon, Search, RefreshCw, Trash2, Filter } from "lucide-react";

export default function KnowledgeBase() {
  const { documents, addDocument } = useStore();

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Manage documents, websites, and data sources for the RAG pipeline.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            Add URL
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg shadow-primary/20">
            <Upload className="h-4 w-4" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-card/30 border border-border rounded-lg backdrop-blur-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search knowledge base..." 
            className="pl-9 bg-background/50 border-border/50 focus:bg-background transition-all"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Index
          </Button>
        </div>
      </div>

      {/* Documents Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-muted/30 transition-colors group">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded bg-primary/10 flex items-center justify-center text-primary">
                      {doc.type === 'url' ? <LinkIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="group-hover:text-primary transition-colors cursor-pointer">
                        {doc.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">ID: {doc.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="uppercase text-[10px] tracking-wider">
                    {doc.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm font-mono">
                  {doc.size}
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                     <div className={cn(
                       "h-2 w-2 rounded-full",
                       doc.status === 'indexed' ? "bg-green-500" : 
                       doc.status === 'processing' ? "bg-yellow-500 animate-pulse" : "bg-red-500"
                     )} />
                     <span className="capitalize text-sm">{doc.status}</span>
                   </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {doc.lastUpdated}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AppLayout>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
