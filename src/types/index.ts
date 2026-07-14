export interface ToolDefinition {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  icon: string;
  keywords: string[];
  features: string[];
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
}
