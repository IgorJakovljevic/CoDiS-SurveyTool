"""empty message

Revision ID: c9e80e960eee
Revises: f754ed5461f8
Create Date: 2021-06-11 09:29:37.814279

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9e80e960eee'
down_revision = 'f754ed5461f8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ABSurvey',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('survey_A_id', sa.Integer(), nullable=True),
    sa.Column('survey_B_id', sa.Integer(), nullable=True),
    sa.Column('visit', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_ABSurvey_id'), 'ABSurvey', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_ABSurvey_id'), table_name='ABSurvey')
    op.drop_table('ABSurvey')
    # ### end Alembic commands ###
