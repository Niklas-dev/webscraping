
from sqlalchemy.orm import relationship

from ...db.database import Base
from sqlalchemy import Column, Integer, String


class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_plan_name = Column(String, unique=False, nullable=True, default="")
    full_price_name = Column(String, unique=False, nullable=True, default="")
    product_name = Column(String, unique=True, nullable=False)
    product_id = Column(String, unique=True, nullable=False)
    price_id = Column(String, unique=True, nullable=False)
    price = Column(String, unique=False, nullable=False)
    monthly_uses = Column(Integer, default=0)


class TokenPackage(Base):
    __tablename__ = "token_packages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_name = Column(String, unique=True, nullable=False)
    product_id = Column(String, unique=True, nullable=False)
    price_id = Column(String, unique=True, nullable=False)
    price = Column(String, unique=False, nullable=False)
    uses_amount = Column(Integer, default=0)

