from fastapi import FastAPI
import json

from app.services.intelligence import build_sidebar_data

app = FastAPI()

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