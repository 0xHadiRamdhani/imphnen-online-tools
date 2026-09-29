export type Category = "developer" | "media" | "pdf" | "ai";
export type Tool = {
  slug: string;
  name: string;
  category: Category;
  description: string;
  icon: string;
  popular?: boolean;
  local?: boolean;
  tags?: string[];
};

type ToolEntry = Omit<Tool, "slug" | "tags">;

const entries: ToolEntry[] = [
  {
    category: "developer",
    name: "JSON Formatter",
    description: "Format, validate and minify JSON with a clean tree view.",
    icon: "{ }",
    popular: true,
    local: true,
  },
  {
    category: "developer",
    name: "JWT Decoder",
    description: "Inspect token headers and payloads. Signature is never verified.",
    icon: "◈",
    popular: true,
    local: true,
  },
  {
    category: "developer",
    name: "UUID Generator",
    description: "Generate secure UUID v4 identifiers in seconds.",
    icon: "⠿",
    popular: true,
    local: true,
  },
  {
    category: "developer",
    name: "Base64 Converter",
    description: "Encode text or decode Base64 right in your browser.",
    icon: "⇄",
    popular: true,
    local: true,
  },
  {
    category: "developer",
    name: "URL Encoder / Decoder",
    description: "Encode and decode URL components safely.",
    icon: "↗",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "Hash Generator",
    description: "Create MD5, SHA-1, SHA-256 and SHA-512 digests.",
    icon: "#",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "Regex Tester",
    description: "Test patterns, flags and capture groups interactively.",
    icon: ".*",
    popular: true,
    local: true,
  },
  {
    category: "developer",
    name: "Diff Checker",
    description: "Compare two texts and spot additions and removals.",
    icon: "±",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps and dates instantly.",
    icon: "◷",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "Cron Generator",
    description: "Build a cron expression from a readable schedule.",
    icon: "◷",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "SQL Formatter",
    description: "Make SQL queries easier to read and review.",
    icon: "▤",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "HTML Minifier",
    description: "Remove unnecessary whitespace from HTML.",
    icon: "‹›",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "CSS Minifier",
    description: "Compress CSS source for smaller files.",
    icon: "#",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "JavaScript Minifier",
    description: "Compact compatible JavaScript source code.",
    icon: "JS",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "Markdown Preview",
    description: "Write Markdown and preview the rendered result.",
    icon: "M↓",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "URL Parser",
    description: "Inspect URL parts and query parameters.",
    icon: "⌁",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "HTTP Status Checker",
    description: "Look up standard HTTP response status codes.",
    icon: "↔",
    popular: false,
    local: true,
  },
  {
    category: "media",
    name: "Image Compressor",
    description: "Reduce image size and compare the result before download.",
    icon: "▧",
    popular: true,
    local: true,
  },
  {
    category: "media",
    name: "Image Resizer",
    description: "Resize images with an optional locked aspect ratio.",
    icon: "⤢",
    popular: false,
    local: true,
  },
  {
    category: "media",
    name: "Image Converter",
    description: "Convert images between PNG, JPEG and WebP.",
    icon: "◫",
    popular: true,
    local: true,
  },
  {
    category: "media",
    name: "Color Picker",
    description: "Explore a color and copy HEX, RGB or HSL values.",
    icon: "◉",
    popular: false,
    local: true,
  },
  {
    category: "media",
    name: "QR Generator",
    description: "Create a QR code for links, text, WiFi and contacts.",
    icon: "▦",
    popular: true,
    local: false,
  },
  {
    category: "media",
    name: "Background Remover",
    description: "Remove image backgrounds with an AI provider.",
    icon: "✦",
    popular: false,
  },
  {
    category: "media",
    name: "GIF Maker",
    description: "Turn image frames into an animated GIF.",
    icon: "GIF",
    popular: false,
  },
  {
    category: "media",
    name: "Video Compressor",
    description: "Compress video with control over output quality.",
    icon: "▶",
    popular: false,
  },
  {
    category: "media",
    name: "Audio Converter",
    description: "Convert common audio formats.",
    icon: "♫",
    popular: false,
  },
  {
    category: "media",
    name: "Video to GIF",
    description: "Create a GIF from a video clip.",
    icon: "▣",
    popular: false,
  },
  {
    category: "media",
    name: "Screenshot to Image",
    description: "Capture a selected screen and save it as an image.",
    icon: "▧",
    popular: false,
    local: true,
  },
  {
    category: "pdf",
    name: "Merge PDF",
    description: "Combine PDF documents into one file.",
    icon: "▤",
    popular: true,
  },
  {
    category: "pdf",
    name: "Split PDF",
    description: "Extract selected pages into separate PDFs.",
    icon: "⊞",
    popular: false,
  },
  {
    category: "pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size while preserving readability.",
    icon: "⇣",
    popular: false,
  },
  {
    category: "pdf",
    name: "Rotate PDF",
    description: "Rotate pages by 90, 180 or 270 degrees.",
    icon: "⟳",
    popular: false,
  },
  {
    category: "pdf",
    name: "PDF to JPG",
    description: "Export PDF pages as image files.",
    icon: "▧",
    popular: false,
  },
  {
    category: "pdf",
    name: "JPG to PDF",
    description: "Arrange images and create a PDF document.",
    icon: "▤",
    popular: false,
  },
  {
    category: "pdf",
    name: "PDF to Word",
    description: "Convert PDF content to an editable DOCX document.",
    icon: "W",
    popular: false,
  },
  {
    category: "pdf",
    name: "Word to PDF",
    description: "Convert a Word document to PDF.",
    icon: "W",
    popular: false,
  },
  {
    category: "pdf",
    name: "PDF to Excel",
    description: "Extract PDF tables into an XLSX workbook.",
    icon: "▦",
    popular: false,
  },
  {
    category: "pdf",
    name: "Add Watermark",
    description: "Place a text watermark on PDF pages.",
    icon: "◈",
    popular: false,
  },
  {
    category: "pdf",
    name: "Remove Pages",
    description: "Choose pages to remove from a PDF.",
    icon: "⊟",
    popular: false,
  },
  {
    category: "ai",
    name: "AI Summarizer",
    description: "Turn long text into a concise summary and key points.",
    icon: "✦",
    popular: true,
  },
  {
    category: "ai",
    name: "Text Rewriter",
    description: "Rewrite text in a tone that fits your audience.",
    icon: "↻",
    popular: false,
  },
  {
    category: "ai",
    name: "Translator",
    description: "Translate text across supported languages.",
    icon: "文",
    popular: false,
  },
  {
    category: "ai",
    name: "OCR",
    description: "Extract readable text from an image or PDF.",
    icon: "⌕",
    popular: false,
  },
  {
    category: "ai",
    name: "Image Upscaler",
    description: "Upscale images with an AI image provider.",
    icon: "↗",
    popular: false,
  },
  {
    category: "ai",
    name: "AI Background Remover",
    description: "Remove image backgrounds with an AI provider.",
    icon: "✦",
    popular: false,
  },
  {
    category: "ai",
    name: "PDF Chat",
    description: "Ask questions grounded in an uploaded PDF.",
    icon: "◌",
    popular: false,
  },
  {
    category: "ai",
    name: "Document Analyzer",
    description: "Find topics, dates, entities and action items.",
    icon: "⌕",
    popular: false,
  },
  {
    category: "ai",
    name: "Text to Speech",
    description: "Turn written text into spoken audio.",
    icon: "♫",
    popular: false,
  },
  {
    category: "developer",
    name: "Password Generator",
    description: "Create a strong password with options you control.",
    icon: "⚿",
    popular: true,
    local: true,
  },
  {
    category: "developer",
    name: "Color Picker",
    description: "Convert and copy precise color values.",
    icon: "◉",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "Base64 Encoder / Decoder",
    description: "Convert between plain text and Base64.",
    icon: "⇄",
    popular: false,
    local: true,
  },
  {
    category: "developer",
    name: "URL Parser",
    description: "Break a URL into its component parts.",
    icon: "⌁",
    popular: false,
    local: true,
  },
];
const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const seenSlugs = new Set<string>();
export const tools: Tool[] = entries
  .map((entry) => ({
    ...entry,
    slug: slugify(entry.name),
    tags: [entry.name, entry.category],
  }))
  .filter((tool) => {
    if (seenSlugs.has(tool.slug)) return false;
    seenSlugs.add(tool.slug);
    return true;
  });
export const categories: { id: Category | "all"; label: string; icon: string; count: number }[] = [
  { id: "all", label: "All tools", icon: "⌘", count: tools.length },
  {
    id: "developer",
    label: "Developer",
    icon: "⌘",
    count: tools.filter((tool) => tool.category === "developer").length,
  },
  {
    id: "media",
    label: "Media",
    icon: "▧",
    count: tools.filter((tool) => tool.category === "media").length,
  },
  {
    id: "pdf",
    label: "PDF",
    icon: "▤",
    count: tools.filter((tool) => tool.category === "pdf").length,
  },
  {
    id: "ai",
    label: "AI tools",
    icon: "✦",
    count: tools.filter((tool) => tool.category === "ai").length,
  },
];

export const categoryLabels: Record<Category, string> = {
  developer: "Developer tools",
  media: "Media tools",
  pdf: "PDF tools",
  ai: "AI tools",
};

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
