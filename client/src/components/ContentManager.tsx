import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Loader2, Plus, PencilLine, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { getQueryFn, queryClient, apiRequest } from "@/lib/queryClient";

// Define types for each content type
type Command = {
  id: number;
  name: string;
  description: string;
  usage: string;
  categoryId: number;
};

type CommandCategory = {
  id: number;
  name: string;
  description: string;
  slug: string;
};

type TextStyle = {
  id: number;
  name: string;
  fontFamily: string;
  gradient: string;
  fontSize: string;
  fontWeight: string;
};

type BotInfo = {
  id: number;
  name: string;
  version: string;
  description: string;
  prefix: string;
};

type BotStat = {
  id: number;
  servers: number;
  users: number;
  commands: number;
  uptime: number;
};

export default function ContentManager() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("commands");
  
  // Commands Tab State
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [currentCommand, setCurrentCommand] = useState<Command | null>(null);
  const [commandFormData, setCommandFormData] = useState<Partial<Command>>({
    name: "",
    description: "",
    usage: "",
    categoryId: 0
  });

  // Command Categories Tab State
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CommandCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<Partial<CommandCategory>>({
    name: "",
    description: "",
    slug: ""
  });

  // Text Styles Tab State
  const [styleDialogOpen, setStyleDialogOpen] = useState(false);
  const [currentStyle, setCurrentStyle] = useState<TextStyle | null>(null);
  const [styleFormData, setStyleFormData] = useState<Partial<TextStyle>>({
    name: "",
    fontFamily: "",
    gradient: "",
    fontSize: "",
    fontWeight: ""
  });

  // Bot Info Tab State
  const [botInfoFormData, setBotInfoFormData] = useState<Partial<BotInfo>>({
    name: "essence",
    version: "1.0.0",
    description: "A powerful Discord bot",
    prefix: "/"
  });

  // Bot Stats Tab State
  const [botStatsFormData, setBotStatsFormData] = useState<Partial<BotStat>>({
    servers: 0,
    users: 0,
    commands: 0,
    uptime: 0
  });

  // Fetch Commands Data
  const { 
    data: commands, 
    isLoading: isLoadingCommands
  } = useQuery<Command[]>({
    queryKey: ["/api/commands"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Fetch Command Categories Data
  const { 
    data: categories, 
    isLoading: isLoadingCategories
  } = useQuery<CommandCategory[]>({
    queryKey: ["/api/command-categories"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Fetch Text Styles Data
  const { 
    data: textStyles, 
    isLoading: isLoadingStyles
  } = useQuery<TextStyle[]>({
    queryKey: ["/api/text-styles"],
    queryFn: getQueryFn({ on401: "throw" }),
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load text styles. This feature might not be set up yet.",
        variant: "destructive",
      });
    }
  });

  // Fetch Bot Info Data
  const {
    data: botInfo,
    isLoading: isLoadingBotInfo
  } = useQuery<BotInfo>({
    queryKey: ["/api/bot-info"],
    queryFn: getQueryFn({ on401: "throw" }),
    onSuccess: (data) => {
      if (data) {
        setBotInfoFormData(data);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load bot info. This feature might not be set up yet.",
        variant: "destructive",
      });
    }
  });

  // Fetch Bot Stats Data
  const {
    data: botStats,
    isLoading: isLoadingBotStats
  } = useQuery<BotStat>({
    queryKey: ["/api/statistics"],
    queryFn: getQueryFn({ on401: "throw" }),
    onSuccess: (data) => {
      if (data) {
        setBotStatsFormData(data);
      }
    }
  });

  // Command Mutations
  const createCommandMutation = useMutation({
    mutationFn: async (command: Partial<Command>) => {
      const res = await apiRequest("POST", "/api/commands", command);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/commands"] });
      toast({
        title: "Success",
        description: "Command created successfully",
      });
      setCommandDialogOpen(false);
      resetCommandForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create command",
        variant: "destructive",
      });
    }
  });

  const updateCommandMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Command> }) => {
      const res = await apiRequest("PATCH", `/api/commands/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/commands"] });
      toast({
        title: "Success",
        description: "Command updated successfully",
      });
      setCommandDialogOpen(false);
      resetCommandForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update command",
        variant: "destructive",
      });
    }
  });

  const deleteCommandMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/commands/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/commands"] });
      toast({
        title: "Success",
        description: "Command deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete command",
        variant: "destructive",
      });
    }
  });

  // Category Mutations
  const createCategoryMutation = useMutation({
    mutationFn: async (category: Partial<CommandCategory>) => {
      const res = await apiRequest("POST", "/api/command-categories", category);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/command-categories"] });
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      setCategoryDialogOpen(false);
      resetCategoryForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create category",
        variant: "destructive",
      });
    }
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CommandCategory> }) => {
      const res = await apiRequest("PATCH", `/api/command-categories/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/command-categories"] });
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
      setCategoryDialogOpen(false);
      resetCategoryForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update category",
        variant: "destructive",
      });
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/command-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/command-categories"] });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      });
    }
  });

  // Text Style Mutations
  const createStyleMutation = useMutation({
    mutationFn: async (style: Partial<TextStyle>) => {
      const res = await apiRequest("POST", "/api/text-styles", style);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/text-styles"] });
      toast({
        title: "Success",
        description: "Text style created successfully",
      });
      setStyleDialogOpen(false);
      resetStyleForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create text style",
        variant: "destructive",
      });
    }
  });

  const updateStyleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<TextStyle> }) => {
      const res = await apiRequest("PATCH", `/api/text-styles/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/text-styles"] });
      toast({
        title: "Success",
        description: "Text style updated successfully",
      });
      setStyleDialogOpen(false);
      resetStyleForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update text style",
        variant: "destructive",
      });
    }
  });

  const deleteStyleMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/text-styles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/text-styles"] });
      toast({
        title: "Success",
        description: "Text style deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete text style",
        variant: "destructive",
      });
    }
  });

  // Bot Info Mutation
  const updateBotInfoMutation = useMutation({
    mutationFn: async (data: Partial<BotInfo>) => {
      const res = await apiRequest("PATCH", `/api/bot-info/${botInfo?.id || 1}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bot-info"] });
      toast({
        title: "Success",
        description: "Bot info updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update bot info",
        variant: "destructive",
      });
    }
  });

  // Bot Stats Mutation
  const updateBotStatsMutation = useMutation({
    mutationFn: async (data: Partial<BotStat>) => {
      const res = await apiRequest("PATCH", `/api/statistics/${botStats?.id || 1}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
      toast({
        title: "Success",
        description: "Bot statistics updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update bot statistics",
        variant: "destructive",
      });
    }
  });

  // Form Reset Functions
  const resetCommandForm = () => {
    setCommandFormData({
      name: "",
      description: "",
      usage: "",
      categoryId: 0
    });
    setCurrentCommand(null);
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: "",
      description: "",
      slug: ""
    });
    setCurrentCategory(null);
  };

  const resetStyleForm = () => {
    setStyleFormData({
      name: "",
      fontFamily: "",
      gradient: "",
      fontSize: "",
      fontWeight: ""
    });
    setCurrentStyle(null);
  };

  // Command Form Handlers
  const handleCommandEdit = (command: Command) => {
    setCurrentCommand(command);
    setCommandFormData({
      name: command.name,
      description: command.description,
      usage: command.usage,
      categoryId: command.categoryId
    });
    setCommandDialogOpen(true);
  };

  const handleCommandDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this command?")) {
      deleteCommandMutation.mutate(id);
    }
  };

  const handleCommandSubmit = () => {
    if (!commandFormData.name || !commandFormData.description || !commandFormData.categoryId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (currentCommand) {
      updateCommandMutation.mutate({ 
        id: currentCommand.id, 
        data: commandFormData 
      });
    } else {
      createCommandMutation.mutate(commandFormData);
    }
  };

  // Category Form Handlers
  const handleCategoryEdit = (category: CommandCategory) => {
    setCurrentCategory(category);
    setCategoryFormData({
      name: category.name,
      description: category.description,
      slug: category.slug
    });
    setCategoryDialogOpen(true);
  };

  const handleCategoryDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category? This will also delete all commands in this category.")) {
      deleteCategoryMutation.mutate(id);
    }
  };

  const handleCategorySubmit = () => {
    if (!categoryFormData.name || !categoryFormData.description || !categoryFormData.slug) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (currentCategory) {
      updateCategoryMutation.mutate({ 
        id: currentCategory.id, 
        data: categoryFormData 
      });
    } else {
      createCategoryMutation.mutate(categoryFormData);
    }
  };

  // Style Form Handlers
  const handleStyleEdit = (style: TextStyle) => {
    setCurrentStyle(style);
    setStyleFormData({
      name: style.name,
      fontFamily: style.fontFamily,
      gradient: style.gradient,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight
    });
    setStyleDialogOpen(true);
  };

  const handleStyleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this text style?")) {
      deleteStyleMutation.mutate(id);
    }
  };

  const handleStyleSubmit = () => {
    if (!styleFormData.name || !styleFormData.fontFamily) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (currentStyle) {
      updateStyleMutation.mutate({ 
        id: currentStyle.id, 
        data: styleFormData 
      });
    } else {
      createStyleMutation.mutate(styleFormData);
    }
  };

  // Bot Info Form Handler
  const handleBotInfoSubmit = () => {
    if (!botInfoFormData.name) {
      toast({
        title: "Error",
        description: "Bot name is required",
        variant: "destructive",
      });
      return;
    }
    
    updateBotInfoMutation.mutate(botInfoFormData);
  };

  // Bot Stats Form Handler
  const handleBotStatsSubmit = () => {
    updateBotStatsMutation.mutate(botStatsFormData);
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Global Content Manager</h2>
      <p className="mb-6 text-muted-foreground">
        Manage and edit content that appears across the website for all users.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="commands">Commands</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="styles">Text Styles</TabsTrigger>
          <TabsTrigger value="info">Bot Info</TabsTrigger>
          <TabsTrigger value="stats">Bot Stats</TabsTrigger>
        </TabsList>

        {/* Commands Tab */}
        <TabsContent value="commands">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Discord Bot Commands</span>
                <Button onClick={() => {
                  resetCommandForm();
                  setCommandDialogOpen(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" /> Add Command
                </Button>
              </CardTitle>
              <CardDescription>
                Manage the commands shown on the website and their descriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingCommands ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commands && commands.length > 0 ? (
                      commands.map((command) => (
                        <TableRow key={command.id}>
                          <TableCell className="font-medium">{command.name}</TableCell>
                          <TableCell>{command.description}</TableCell>
                          <TableCell><code>{command.usage}</code></TableCell>
                          <TableCell>
                            {categories?.find(c => c.id === command.categoryId)?.name || 'Unknown'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCommandEdit(command)}
                            >
                              <PencilLine className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCommandDelete(command.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No commands found. Add your first command.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Command Dialog */}
          <Dialog open={commandDialogOpen} onOpenChange={setCommandDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentCommand ? 'Edit Command' : 'Add New Command'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details for this command. All fields are required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="command-name">Command Name</Label>
                  <Input
                    id="command-name"
                    value={commandFormData.name}
                    onChange={(e) => setCommandFormData({...commandFormData, name: e.target.value})}
                    placeholder="help"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="command-description">Description</Label>
                  <Textarea
                    id="command-description"
                    value={commandFormData.description}
                    onChange={(e) => setCommandFormData({...commandFormData, description: e.target.value})}
                    placeholder="Displays a help message with available commands"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="command-usage">Usage</Label>
                  <Input
                    id="command-usage"
                    value={commandFormData.usage}
                    onChange={(e) => setCommandFormData({...commandFormData, usage: e.target.value})}
                    placeholder="/help [command]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="command-category">Category</Label>
                  <Select
                    value={commandFormData.categoryId?.toString()}
                    onValueChange={(value) => setCommandFormData({...commandFormData, categoryId: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCommandDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCommandSubmit}
                  disabled={createCommandMutation.isPending || updateCommandMutation.isPending}
                >
                  {(createCommandMutation.isPending || updateCommandMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentCommand ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Command Categories</span>
                <Button onClick={() => {
                  resetCategoryForm();
                  setCategoryDialogOpen(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </CardTitle>
              <CardDescription>
                Manage command categories which group similar commands together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingCategories ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.description}</TableCell>
                          <TableCell><code>{category.slug}</code></TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCategoryEdit(category)}
                            >
                              <PencilLine className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCategoryDelete(category.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No categories found. Add your first category.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Category Dialog */}
          <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentCategory ? 'Edit Category' : 'Add New Category'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details for this command category. All fields are required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({...categoryFormData, name: e.target.value})}
                    placeholder="Moderation"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category-description">Description</Label>
                  <Textarea
                    id="category-description"
                    value={categoryFormData.description}
                    onChange={(e) => setCategoryFormData({...categoryFormData, description: e.target.value})}
                    placeholder="Commands for server moderation and management"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category-slug">Slug</Label>
                  <Input
                    id="category-slug"
                    value={categoryFormData.slug}
                    onChange={(e) => setCategoryFormData({...categoryFormData, slug: e.target.value})}
                    placeholder="moderation"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used in URLs. Use lowercase letters, numbers, and hyphens only.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCategorySubmit}
                  disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                >
                  {(createCategoryMutation.isPending || updateCategoryMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentCategory ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Text Styles Tab */}
        <TabsContent value="styles">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Text Styles</span>
                <Button onClick={() => {
                  resetStyleForm();
                  setStyleDialogOpen(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" /> Add Style
                </Button>
              </CardTitle>
              <CardDescription>
                Manage text styles, fonts, and gradients used throughout the website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingStyles ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-6">
                  {textStyles && textStyles.length > 0 ? (
                    textStyles.map((style) => (
                      <div key={style.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{style.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Font: {style.fontFamily}, Weight: {style.fontWeight}, Size: {style.fontSize}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleStyleEdit(style)}
                            >
                              <PencilLine className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleStyleDelete(style.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <div 
                          className="p-4 rounded-md border"
                          style={{
                            fontFamily: style.fontFamily,
                            fontSize: style.fontSize,
                            fontWeight: style.fontWeight,
                            background: style.gradient ? style.gradient : 'transparent',
                            WebkitBackgroundClip: style.gradient ? 'text' : 'unset',
                            WebkitTextFillColor: style.gradient ? 'transparent' : 'currentColor',
                          }}
                        >
                          Sample text with this style
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No text styles found. Add your first style.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Text Style Dialog */}
          <Dialog open={styleDialogOpen} onOpenChange={setStyleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentStyle ? 'Edit Text Style' : 'Add New Text Style'}
                </DialogTitle>
                <DialogDescription>
                  Customize the font style and gradient. Preview updates in real-time below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="style-name">Style Name</Label>
                  <Input
                    id="style-name"
                    value={styleFormData.name}
                    onChange={(e) => setStyleFormData({...styleFormData, name: e.target.value})}
                    placeholder="Heading Style"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select
                    value={styleFormData.fontFamily}
                    onValueChange={(value) => setStyleFormData({...styleFormData, fontFamily: value})}
                  >
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select a font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="system-ui">System UI</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Input
                    id="font-size"
                    value={styleFormData.fontSize}
                    onChange={(e) => setStyleFormData({...styleFormData, fontSize: e.target.value})}
                    placeholder="16px"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="font-weight">Font Weight</Label>
                  <Select
                    value={styleFormData.fontWeight}
                    onValueChange={(value) => setStyleFormData({...styleFormData, fontWeight: value})}
                  >
                    <SelectTrigger id="font-weight">
                      <SelectValue placeholder="Select a font weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">Light (300)</SelectItem>
                      <SelectItem value="400">Regular (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">SemiBold (600)</SelectItem>
                      <SelectItem value="700">Bold (700)</SelectItem>
                      <SelectItem value="800">ExtraBold (800)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gradient">Gradient (CSS)</Label>
                  <Input
                    id="gradient"
                    value={styleFormData.gradient}
                    onChange={(e) => setStyleFormData({...styleFormData, gradient: e.target.value})}
                    placeholder="linear-gradient(to right, #6366f1, #8b5cf6)"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter a valid CSS gradient. Leave empty for no gradient.
                  </p>
                </div>
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div 
                    className="p-4 mt-2 rounded-md border"
                    style={{
                      fontFamily: styleFormData.fontFamily || 'inherit',
                      fontSize: styleFormData.fontSize || 'inherit',
                      fontWeight: styleFormData.fontWeight || 'inherit',
                      background: styleFormData.gradient || 'transparent',
                      WebkitBackgroundClip: styleFormData.gradient ? 'text' : 'unset',
                      WebkitTextFillColor: styleFormData.gradient ? 'transparent' : 'currentColor',
                    }}
                  >
                    Sample text with this style
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setStyleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleStyleSubmit}
                  disabled={createStyleMutation.isPending || updateStyleMutation.isPending}
                >
                  {(createStyleMutation.isPending || updateStyleMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentStyle ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Bot Info Tab */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Bot Information</CardTitle>
              <CardDescription>
                Update the basic information about your Discord bot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBotInfo ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input
                      id="bot-name"
                      value={botInfoFormData.name}
                      onChange={(e) => setBotInfoFormData({...botInfoFormData, name: e.target.value})}
                      placeholder="essence"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bot-version">Version</Label>
                    <Input
                      id="bot-version"
                      value={botInfoFormData.version}
                      onChange={(e) => setBotInfoFormData({...botInfoFormData, version: e.target.value})}
                      placeholder="1.0.0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bot-description">Description</Label>
                    <Textarea
                      id="bot-description"
                      value={botInfoFormData.description}
                      onChange={(e) => setBotInfoFormData({...botInfoFormData, description: e.target.value})}
                      placeholder="A powerful Discord bot for server management"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bot-prefix">Command Prefix</Label>
                    <Input
                      id="bot-prefix"
                      value={botInfoFormData.prefix}
                      onChange={(e) => setBotInfoFormData({...botInfoFormData, prefix: e.target.value})}
                      placeholder="/"
                    />
                  </div>
                  <Button 
                    onClick={handleBotInfoSubmit}
                    disabled={updateBotInfoMutation.isPending}
                    className="mt-4"
                  >
                    {updateBotInfoMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bot Stats Tab */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Bot Statistics</CardTitle>
              <CardDescription>
                Update the statistics displayed on the website. These will be shown to all users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBotStats ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stats-servers">Servers</Label>
                    <Input
                      id="stats-servers"
                      type="number"
                      value={botStatsFormData.servers}
                      onChange={(e) => setBotStatsFormData({...botStatsFormData, servers: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of Discord servers the bot is in.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stats-users">Users</Label>
                    <Input
                      id="stats-users"
                      type="number"
                      value={botStatsFormData.users}
                      onChange={(e) => setBotStatsFormData({...botStatsFormData, users: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Total number of users across all servers.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stats-commands">Commands</Label>
                    <Input
                      id="stats-commands"
                      type="number"
                      value={botStatsFormData.commands}
                      onChange={(e) => setBotStatsFormData({...botStatsFormData, commands: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Total number of available commands.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stats-uptime">Uptime (hours)</Label>
                    <Input
                      id="stats-uptime"
                      type="number"
                      value={botStatsFormData.uptime}
                      onChange={(e) => setBotStatsFormData({...botStatsFormData, uptime: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Bot uptime in hours.
                    </p>
                  </div>
                  <Button 
                    onClick={handleBotStatsSubmit}
                    disabled={updateBotStatsMutation.isPending}
                    className="mt-4"
                  >
                    {updateBotStatsMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}