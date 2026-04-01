import datetime
from sqlalchemy.orm import Session
from .database import SessionLocal, OutageRecord

def fetch_kubra_data(db: Session):
    print("Fetching FirstEnergy KUBRA data... (Using Seed Data for MVP)")
    # Using seed data for MVP verification (in real production, requests.get is used here)
    record = OutageRecord(
        utility_name="FirstEnergy (KUBRA)",
        state="PA/OH",
        customers_out=8430,
        lat=40.4406,
        lon=-79.9959,
        last_updated=datetime.datetime.utcnow()
    )
    db.add(record)
    db.commit()
    print("FirstEnergy KUBRA data saved to DB.")

def fetch_esri_data(db: Session):
    print("Fetching CenterPoint Esri data... (Using Seed Data for MVP)")
    record = OutageRecord(
        utility_name="CenterPoint Energy (Esri)",
        state="TX",
        customers_out=15020,
        lat=29.7604,
        lon=-95.3698,
        last_updated=datetime.datetime.utcnow()
    )
    db.add(record)
    db.commit()
    print("CenterPoint Esri data saved to DB.")

def run_scrapers():
    db = SessionLocal()
    try:
        print("--- Starting Scraping Cycle ---")
        db.query(OutageRecord).delete()
        db.commit()
        fetch_kubra_data(db)
        fetch_esri_data(db)
        print("--- Scraping Cycle Complete ---")
    finally:
        db.close()

if __name__ == '__main__':
    run_scrapers()
