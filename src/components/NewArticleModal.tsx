import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, List, ListOrdered, Heading2, ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { saveArticle } from "@/services/articleService";

interface NewArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArticleSaved?: () => void;
}

const NewArticleModal = ({ open, onOpenChange, onArticleSaved }: NewArticleModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorInstagram, setAuthorInstagram] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    bodyRef.current?.focus();
  };

  const handleBodyInput = () => {
    setBody(bodyRef.current?.innerText ?? "");
  };

  const addHashtag = () => {
    const tag = hashtagInput.replace(/^#/, "").trim().toLowerCase();
    if (tag && !hashtags.includes(tag)) {
      setHashtags((prev) => [...prev, tag]);
      setHashtagInput("");
    }
  };

  const handleSave = async () => {
    if (!title || !authorName) {
      toast.error("Preencha título e nome do autor.");
      return;
    }
    setIsSaving(true);
    try {
      const htmlContent = bodyRef.current?.innerHTML ?? "";

      const success = await saveArticle({
        title,
        body: htmlContent,
        image_url: imagePreview,
        image_source: imageSource || null,
        author_name: authorName,
        author_instagram: authorInstagram || null,
        hashtags: hashtags.length > 0 ? hashtags : null,
      });

      if (!success) {
        toast.error("Erro ao salvar artigo. Tente novamente.");
        return;
      }

      toast.success("Artigo salvo com sucesso!");
      setTitle("");
      setBody("");
      setImagePreview(null);
      setImageSource("");
      setAuthorName("");
      setAuthorInstagram("");
      setHashtags([]);
      setHashtagInput("");
      if (bodyRef.current) bodyRef.current.innerHTML = "";
      onOpenChange(false);
      onArticleSaved?.();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar artigo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Novo Artigo</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Imagem de capa (1920 × 1080)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {imagePreview ? (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full aspect-video object-cover rounded-lg border border-border"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white text-sm font-medium"
                >
                  Trocar imagem
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <ImagePlus className="h-8 w-8" />
                <span className="text-sm">Clique para adicionar imagem</span>
                <span className="text-xs">Recomendado: 1920 × 1080</span>
              </button>
            )}
            <Input
              placeholder="Fonte da imagem (ex: Unsplash / João Silva)"
              value={imageSource}
              onChange={(e) => setImageSource(e.target.value)}
            />
          </div>

          {/* Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome do Autor *</label>
              <Input
                placeholder="Ex: João Silva"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Instagram do Autor</label>
              <Input
                placeholder="Ex: @joaosilva"
                value={authorInstagram}
                onChange={(e) => setAuthorInstagram(e.target.value)}
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Título *</label>
            <Input
              placeholder="Título do artigo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          {/* Body Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Corpo do texto</label>
            <div className="flex items-center gap-1 border border-border rounded-t-lg p-2 bg-muted/50">
              <button onClick={() => execCommand("bold")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Negrito">
                <Bold className="h-4 w-4" />
              </button>
              <button onClick={() => execCommand("italic")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Itálico">
                <Italic className="h-4 w-4" />
              </button>
              <button onClick={() => execCommand("underline")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Sublinhado">
                <Underline className="h-4 w-4" />
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              <button onClick={() => execCommand("formatBlock", "h2")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Subtítulo">
                <Heading2 className="h-4 w-4" />
              </button>
              <button onClick={() => execCommand("insertUnorderedList")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Lista">
                <List className="h-4 w-4" />
              </button>
              <button onClick={() => execCommand("insertOrderedList")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Lista numerada">
                <ListOrdered className="h-4 w-4" />
              </button>
            </div>
            <div
              ref={bodyRef}
              contentEditable
              className="min-h-[300px] max-h-[500px] overflow-y-auto border border-t-0 border-border rounded-b-lg p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{ color: "#000000", caretColor: "#000000" }}
              onInput={handleBodyInput}
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", false, text);
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{body.length.toLocaleString("pt-BR")} caracteres</span>
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hashtags</label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: tecnologia"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addHashtag(); } }}
              />
              <Button variant="outline" onClick={addHashtag} type="button">Adicionar</Button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    #{tag}
                    <button onClick={() => setHashtags((prev) => prev.filter((_, idx) => idx !== i))}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar artigo"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewArticleModal;
