import { supabase } from "@/integrations/supabase/client";

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface DbMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export async function fetchConversations(): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createConversation(title: string): Promise<Conversation> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("conversations")
    .insert({ title, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteConversation(id: string): Promise<void> {
  const { error } = await supabase.from("conversations").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchMessages(conversationId: string): Promise<DbMessage[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as unknown as DbMessage[]) ?? [];
}

export async function saveMessage(conversationId: string, role: "user" | "assistant", content: string): Promise<void> {
  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role,
    content,
  });
  if (error) throw error;

  // Update conversation timestamp and title (use first user message)
  if (role === "user") {
    const title = content.length > 50 ? content.slice(0, 50) + "…" : content;
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString(), title })
      .eq("id", conversationId);
  }
}
