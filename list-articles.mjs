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

const supabase = createClient(supabaseUrl, supabaseKey);

async function listArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, author_name, created_at");

  if (error) {
    console.error("Erro:", error.message);
    process.exit(1);
  }

  console.log(`\n📚 Total de artigos: ${data.length}\n`);

  if (data.length === 0) {
    console.log("Nenhum artigo encontrado");
  } else {
    data.forEach((article, idx) => {
      console.log(`${idx + 1}. ${article.title}`);
      console.log(`   Autor: ${article.author_name}`);
      console.log(`   Data: ${new Date(article.created_at).toLocaleDateString("pt-BR")}`);
      console.log(`   ID: ${article.id}\n`);
    });
  }

  process.exit(0);
}

listArticles();
