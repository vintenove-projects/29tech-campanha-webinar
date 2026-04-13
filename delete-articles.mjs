import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Ler o arquivo .env manualmente
const envPath = path.resolve(".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};

envContent.split("\n").forEach((line) => {
  const [key, ...valueParts] = line.split("=");
  if (key && valueParts.length > 0) {
    const value = valueParts.join("=").replace(/"/g, "").trim();
    envVars[key.trim()] = value;
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variáveis de ambiente não encontradas");
  console.error("VITE_SUPABASE_URL:", supabaseUrl ? "✓" : "✗");
  console.error("VITE_SUPABASE_PUBLISHABLE_KEY:", supabaseKey ? "✓" : "✗");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const articlesToDelete = [
  "Outsourcing de Desenvolvimento: Como Escolher a Melhor Agência",
  "Tendências de Tecnologia em 2026",
  "Segurança em Aplicações Web: Guia Completo",
];

async function deleteArticles() {
  console.log("🗑️  Deletando artigos de exemplo...\n");

  for (const title of articlesToDelete) {
    try {
      const { data, error: fetchError } = await supabase
        .from("articles")
        .select("id")
        .eq("title", title);

      if (fetchError) {
        console.error(`❌ Erro ao buscar "${title}":`, fetchError.message);
        continue;
      }

      if (data && data.length > 0) {
        const { error: deleteError } = await supabase
          .from("articles")
          .delete()
          .eq("title", title);

        if (deleteError) {
          console.error(`❌ Erro ao deletar "${title}":`, deleteError.message);
        } else {
          console.log(`✓ Deletado: ${title}`);
        }
      } else {
        console.log(`⚠️  Não encontrado: ${title}`);
      }
    } catch (err) {
      console.error(`❌ Erro ao processar "${title}":`, err.message);
    }
  }

  console.log("\n✓ Processo concluído!");
  process.exit(0);
}

deleteArticles().catch((err) => {
  console.error("❌ Erro fatal:", err);
  process.exit(1);
});
