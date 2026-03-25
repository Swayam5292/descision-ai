export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const responses: Record<string, string> = {
  tired: "🛌 **Rest is productive too.** Here's a plan:\n\n1. Take a 20-min power nap\n2. Do light stretching\n3. Switch to low-effort tasks\n4. Hydrate and have a healthy snack\n\n*Remember: pushing through burnout creates worse outcomes.*",
  motivated: "🔥 **Ride that momentum!** Here's how to maximize it:\n\n1. Tackle your **hardest task** right now\n2. Set a 90-minute deep focus timer\n3. Eliminate all distractions\n4. Break big goals into today's milestones\n\n*Channel this energy — it's your superpower today.*",
  lazy: "🐌 **Start microscopic.** The trick:\n\n1. Pick the **smallest possible task** (2 minutes)\n2. Just begin — motivation follows action\n3. Use the \"5-minute rule\" — commit to just 5 mins\n4. Reward yourself after each small win\n\n*Newton's first law: objects in motion stay in motion.*",
  bored: "✨ **Boredom is a creativity signal.** Try:\n\n1. Learn something completely new for 15 mins\n2. Start a creative side project\n3. Rearrange your workspace\n4. Connect with someone inspiring\n\n*Some of the best ideas come from boredom.*",
  stressed: "🧘 **Let's decompress first, then plan:**\n\n1. Take 5 deep breaths (4-7-8 technique)\n2. Write down everything stressing you\n3. Circle what you can actually control\n4. Pick ONE thing to address today\n\n*Stress shrinks when you name it and break it down.*",
  overwhelmed: "🌊 **When everything feels urgent:**\n\n1. Brain dump all tasks on paper\n2. Cross out anything that's not truly important\n3. Pick your **top 3** for today\n4. Say no to everything else\n\n*You can do anything, but not everything.*",
  anxious: "💙 **Anxiety management toolkit:**\n\n1. Ground yourself: name 5 things you can see\n2. Challenge the thought: \"Is this fact or fear?\"\n3. Take a short walk outside\n4. Talk to someone you trust\n\n*Anxiety lies about the future. You're safe right now.*",
  happy: "🎉 **Amazing! Amplify this energy:**\n\n1. Document what made you happy\n2. Share the positivity with someone\n3. Use this mood for creative work\n4. Set intentions while feeling great\n\n*Happiness is a launchpad — use it wisely!*",
  confused: "🧩 **Clarity comes from structure:**\n\n1. Write down exactly what's confusing\n2. Break it into smaller questions\n3. Research one question at a time\n4. Ask for help on what remains unclear\n\n*Confusion is the beginning of understanding.*",
  angry: "🔴 **Channel that fire constructively:**\n\n1. Pause — don't act on impulse\n2. Physical outlet: walk, exercise, squeeze something\n3. Write down what triggered you\n4. Decide your response when calm\n\n*Anger is information. Listen to it, don't obey it.*",
};

const suggestions = [
  "I'm feeling tired today",
  "I'm really motivated right now",
  "I feel lazy and unmotivated",
  "I'm stressed about work",
  "I feel overwhelmed by tasks",
  "I'm anxious about something",
];

export function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(responses)) {
    if (lower.includes(keyword)) return response;
  }
  return "🤔 **Tell me more about how you're feeling.**\n\nTry describing your emotion or situation. For example:\n- \"I'm feeling tired\"\n- \"I'm stressed about a deadline\"\n- \"I feel overwhelmed\"\n\n*The more specific you are, the better I can help you decide what to do next.*";
}

export function getSuggestions(): string[] {
  return suggestions.sort(() => Math.random() - 0.5).slice(0, 3);
}

export function createMessage(role: "user" | "assistant", content: string): Message {
  return { id: crypto.randomUUID(), role, content, timestamp: new Date() };
}
