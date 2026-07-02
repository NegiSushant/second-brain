import { createClient } from "@supabase/supabase-js";
import { STORAGE_KEY, STORAGE_URL } from "../config";

export const supabase = createClient(STORAGE_URL, STORAGE_KEY);
