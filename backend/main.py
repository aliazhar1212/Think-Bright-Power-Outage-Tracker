from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import database

app = FastAPI(title="Power Outage Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Power Outage Tracker Local API is running"}

@app.get("/api/outages")
def get_outages(db: Session = Depends(get_db)):
    """Retrieve all outage records from the local database."""
    records = db.query(database.OutageRecord).all()
    return records
