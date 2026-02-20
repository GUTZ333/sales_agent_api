import { createClient } from "@supabase/supabase-js";
import "dotenv/config"

const SUPABASEURL = process.env.SUPABASEURL as string
const SUPABASEKEY = process.env.SUPABASEKEY as string

export const supabase = createClient(SUPABASEURL, SUPABASEKEY)