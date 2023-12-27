from ...db.database import Base
from sqlalchemy import Column, Integer, String

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(Integer)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)