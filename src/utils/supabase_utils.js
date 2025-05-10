// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jjazxisotidfcmfrgqsw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYXp4aXNvdGlkZmNtZnJncXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTYzMDksImV4cCI6MjA2MjM5MjMwOX0.o-HCtTBaYisUcDP-WZmsiJ4ZXLtUJ3CqyAoo9EraTOM";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const sbaseUploadService = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("kredo")
    .upload(`uploads/${fileName}`, file);

  if (error) {
    console.error(error);
    return false;
  }

  return data.fullPath;
};
