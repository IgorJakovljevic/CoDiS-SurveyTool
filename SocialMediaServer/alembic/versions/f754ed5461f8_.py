"""empty message

Revision ID: f754ed5461f8
Revises: 4d41c9550841
Create Date: 2021-06-09 17:02:53.647839

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f754ed5461f8'
down_revision = '4d41c9550841'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Evaluation', sa.Column('tracking_id', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Evaluation', 'tracking_id')
    # ### end Alembic commands ###
