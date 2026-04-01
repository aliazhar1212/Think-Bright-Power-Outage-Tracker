from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime

# Using SQLite for a zero-cost local MVP
SQLALCHEMY_DATABASE_URL = "sqlite:///./outages.db"

# check_same_thread=False is needed for SQLite in FastAPI
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class OutageRecord(Base):
    __tablename__ = "outage_records"

    id = Column(Integer, primary_key=True, index=True)
    utility_name = Column(String, index=True)
    state = Column(String, index=True)
    zip_code = Column(String, index=True, nullable=True)
    customers_out = Column(Integer, default=0)
    estimated_restoration = Column(DateTime, nullable=True)
    lat = Column(Float, nullable=True)
    lon = Column(Float, nullable=True)
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)

# Create all tables
Base.metadata.create_all(bind=engine)
