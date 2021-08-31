"""empty message

Revision ID: dbdcd6fa5589
Revises: d3efc7e81b4b
Create Date: 2021-04-10 17:23:53.667709

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dbdcd6fa5589'
down_revision = 'd3efc7e81b4b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Survey', sa.Column('survey_json', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Survey', 'survey_json')
    # ### end Alembic commands ###
