"""empty message

Revision ID: 4d41c9550841
Revises: d267ab65bb2d
Create Date: 2021-04-12 17:04:51.590180

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d41c9550841'
down_revision = 'd267ab65bb2d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('Evaluation_participant_id_fkey', 'Evaluation', type_='foreignkey')
    op.drop_column('Evaluation', 'participant_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Evaluation', sa.Column('participant_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('Evaluation_participant_id_fkey', 'Evaluation', 'Participant', ['participant_id'], ['id'])
    # ### end Alembic commands ###
