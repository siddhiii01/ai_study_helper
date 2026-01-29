from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

# Initialize FastAPI
app = FastAPI(title="AI Question Generator")

# Load model and tokenizer
MODEL_NAME = "google/flan-t5-base"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

class QuestionRequest(BaseModel):
    text: str
    num_questions: int = 5
    difficulty: str = "medium"  

@app.post("/generate-questions")
def generate_questions(data: QuestionRequest):

    if len(data.text.strip()) < 30:
        return {"error": "Text too short to generate meaningful questions"}

    # Prompt engineering (THIS MATTERS)
    prompt = (
        f"Generate {data.num_questions} {data.difficulty}-level questions "
        f"based on the following educational text:\n\n{data.text}"
    )

    # Tokenize input
    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )

    # Generate output
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=256,
            num_beams=4,
            early_stopping=True
        )

    # Decode output
    decoded_text = tokenizer.decode(
        outputs[0],
        skip_special_tokens=True
    )

    # Post-processing (simple but effective)
    questions = [
        q.strip()
        for q in decoded_text.split("?")
        if q.strip()
    ]

    questions = [q + "?" for q in questions]

    return {
        "questions": questions
    }
