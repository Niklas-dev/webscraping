from sqlalchemy.orm import relationship

from ...db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean


class StripeCustomer(Base):
    __tablename__ = "stripe_customers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    customer_id = Column(String(255), nullable=False)
    subscription_id = Column(String(255), nullable=False)
    subscription_status = Column(String(64), default="", nullable=False)
    user = relationship('User', back_populates='stripe_customer')
