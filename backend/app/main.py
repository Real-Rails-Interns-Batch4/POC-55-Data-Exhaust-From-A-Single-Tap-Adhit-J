from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from app.services.intelligence import build_sidebar_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/api/replay")
def replay():

    with open(
        "mock_data/event_sequence.json",
        "r"
    ) as file:

        data = json.load(file)

    return data

@app.get("/api/intelligence")
def intelligence():
    return build_sidebar_data()