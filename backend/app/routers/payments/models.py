
from sqlalchemy.orm import relationship

from ...db.database import Base
from sqlalchemy import Column, Integer, String


class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_name = Column(String, unique=True, nullable=False)
    product_id = Column(String, unique=True, nullable=False)
    price_id = Column(String, unique=True, nullable=False)
    price = Column(String, unique=False, nullable=False)
    weekly_uses = Column(Integer, default=0)

