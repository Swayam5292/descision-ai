import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google.adk.agents.llm_agent import Agent
from typing import List, Optional

load_dotenv()

app = FastAPI(title="Decision AI Backend")

# Tool Functions
def swot_analysis(subject: str):
    """
    Performs a SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for a given subject.
    """
    return f"SWOT Analysis for {subject}: [Simulated result from ADK Agent]"

def eisenhower_matrix(tasks: List[str]):
    """
    Categorizes tasks into the Eisenhower Matrix (Urgent/Important).
    """
    return f"Eisenhower Matrix: [Tasks prioritized by ADK Agent]"

# Initialize ADK Agent
agent = Agent(
    model=os.getenv("MODEL_NAME", "gemini-2.0-flash"),
    name="DecisionExpert",
    description="A specialist in decision frameworks and mood-based advice.",
    instruction=(
        "You are 'Decision Expert', an agent developed with the Google ADK. "
        "Your goal is to help users make clear decisions. "
        "Use frameworks like SWOT, the Eisenhower Matrix, and Pro/Con lists. "
        "Maintain a minimal, professional, and helpful tone. "
        "Avoid AI fluff. Be direct and actionable."
    ),
    tools=[swot_analysis, eisenhower_matrix]
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

@app.get("/")
async def root():
    return {"status": "online", "agent": agent.name}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Using ADK agent to process the prompt
        response = agent.run(request.message)
        return {"content": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
