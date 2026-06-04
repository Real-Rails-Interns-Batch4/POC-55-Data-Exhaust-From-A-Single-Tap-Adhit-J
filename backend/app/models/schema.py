from pydantic import BaseModel


class Event(BaseModel):
    time: str
    event: str
    actor: str