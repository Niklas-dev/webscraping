from sqlalchemy.orm import relationship

from ...db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey


class StripeCustomer(Base):
    __tablename__ = "stripe_customer"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    stripeCustomerId = Column(String(255), nullable=False)
    stripeSubscriptionId = Column(String(255), nullable=False)
    user = relationship('Users', back_populates='stripe_customer')




