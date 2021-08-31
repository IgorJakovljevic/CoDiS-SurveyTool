"""Init DB

Revision ID: 121fa4996ba9
Revises:
Create Date: 2021-03-23 16:40:51.362861

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "121fa4996ba9"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "Notification",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("text", sa.String(), nullable=True),
        sa.Column("source", sa.String(), nullable=True),
        sa.Column("positionClass", sa.String(), nullable=True),
        sa.Column("toastClass", sa.String(), nullable=True),
        sa.Column("hideTimeout", sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_Notification_id"), "Notification", ["id"], unique=False)
    op.create_index(
        op.f("ix_Notification_positionClass"),
        "Notification",
        ["positionClass"],
        unique=False,
    )
    op.create_index(
        op.f("ix_Notification_source"), "Notification", ["source"], unique=False
    )
    op.create_index(
        op.f("ix_Notification_text"), "Notification", ["text"], unique=False
    )
    op.create_index(
        op.f("ix_Notification_title"), "Notification", ["title"], unique=False
    )
    op.create_index(
        op.f("ix_Notification_toastClass"), "Notification", ["toastClass"], unique=False
    )
    op.create_table(
        "Tag",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("text", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_Tag_id"), "Tag", ["id"], unique=False)
    op.create_index(op.f("ix_Tag_text"), "Tag", ["text"], unique=False)
    op.create_table(
        "Task",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("text", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_Task_id"), "Task", ["id"], unique=False)
    op.create_index(op.f("ix_Task_text"), "Task", ["text"], unique=False)
    op.create_table(
        "User",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(), nullable=True),
        sa.Column("hashed_password", sa.String(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_User_email"), "User", ["email"], unique=True)
    op.create_index(op.f("ix_User_id"), "User", ["id"], unique=False)
    privacy_selection_table = op.create_table(
        "PrivacySelection",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("icon", sa.String(), nullable=True),
        sa.Column("owner_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            ["User.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_PrivacySelection_description"),
        "PrivacySelection",
        ["description"],
        unique=False,
    )
    op.create_index(
        op.f("ix_PrivacySelection_icon"), "PrivacySelection", ["icon"], unique=False
    )
    op.create_index(
        op.f("ix_PrivacySelection_id"), "PrivacySelection", ["id"], unique=False
    )
    op.create_index(
        op.f("ix_PrivacySelection_name"), "PrivacySelection", ["name"], unique=False
    )
    sentiment_selection_table = op.create_table(
        "SentimentSelection",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("color", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("icon", sa.String(), nullable=True),
        sa.Column("owner_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            ["User.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_SentimentSelection_color"),
        "SentimentSelection",
        ["color"],
        unique=False,
    )
    op.create_index(
        op.f("ix_SentimentSelection_description"),
        "SentimentSelection",
        ["description"],
        unique=False,
    )
    op.create_index(
        op.f("ix_SentimentSelection_icon"), "SentimentSelection", ["icon"], unique=False
    )
    op.create_index(
        op.f("ix_SentimentSelection_id"), "SentimentSelection", ["id"], unique=False
    )
    op.create_table(
        "Survey",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("owner_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            ["User.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_Survey_description"), "Survey", ["description"], unique=False
    )
    op.create_index(op.f("ix_Survey_id"), "Survey", ["id"], unique=False)
    op.create_index(op.f("ix_Survey_title"), "Survey", ["title"], unique=False)
    op.create_table(
        "Article",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("text", sa.String(), nullable=True),
        sa.Column("source", sa.String(), nullable=True),
        sa.Column("commenting", sa.Boolean(), nullable=True),
        sa.Column("sharing", sa.Boolean(), nullable=True),
        sa.Column("tweeting", sa.Boolean(), nullable=True),
        sa.Column("retweeting", sa.Boolean(), nullable=True),
        sa.Column("doSentiment", sa.Boolean(), nullable=True),
        sa.Column("doPrivacy", sa.Boolean(), nullable=True),
        sa.Column("doTags", sa.Boolean(), nullable=True),
        sa.Column("doShare", sa.Boolean(), nullable=True),
        sa.Column("doComment", sa.Boolean(), nullable=True),
        sa.Column("doTweet", sa.Boolean(), nullable=True),
        sa.Column("sentiment_id", sa.Integer(), nullable=True),
        sa.Column("privacy_id", sa.Integer(), nullable=True),
        sa.Column("owner_id", sa.Integer(), nullable=True),
        sa.Column("survey_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            ["User.id"],
        ),
        sa.ForeignKeyConstraint(
            ["privacy_id"],
            ["PrivacySelection.id"],
        ),
        sa.ForeignKeyConstraint(
            ["sentiment_id"],
            ["SentimentSelection.id"],
        ),
        sa.ForeignKeyConstraint(
            ["survey_id"],
            ["Survey.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_Article_id"), "Article", ["id"], unique=False)
    op.create_index(op.f("ix_Article_source"), "Article", ["source"], unique=False)
    op.create_index(op.f("ix_Article_text"), "Article", ["text"], unique=False)
    op.create_index(op.f("ix_Article_title"), "Article", ["title"], unique=False)
    op.create_table(
        "article_notification_table",
        sa.Column("article_id", sa.Integer(), nullable=True),
        sa.Column("notificaiton_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["article_id"],
            ["Article.id"],
        ),
        sa.ForeignKeyConstraint(
            ["notificaiton_id"],
            ["Notification.id"],
        ),
    )
    op.create_table(
        "article_tag_table",
        sa.Column("article_id", sa.Integer(), nullable=True),
        sa.Column("tag_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["article_id"],
            ["Article.id"],
        ),
        sa.ForeignKeyConstraint(
            ["tag_id"],
            ["Tag.id"],
        ),
    )
    op.create_table(
        "article_task_table",
        sa.Column("article_id", sa.Integer(), nullable=True),
        sa.Column("task_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["article_id"],
            ["Article.id"],
        ),
        sa.ForeignKeyConstraint(
            ["task_id"],
            ["Task.id"],
        ),
    )
    # ### end Alembic commands ###

    op.bulk_insert(
        privacy_selection_table,
        [
            {"name": "Friends", "description": "Your friends only", "icon": "people"},
            {"name": "Public", "description": "Everybody", "icon": "public"},
            {"name": "Only Me", "description": "Only Me", "icon": "lock"},
        ],
    )

    op.bulk_insert(
        sentiment_selection_table,
        [
            {
                "icon": "sentiment_very_dissatisfied",
                "description": "Very Dissatisfied",
                "color": "red",
            },
            {
                "icon": "sentiment_dissatisfied",
                "description": "Dissatisfied",
                "color": "red",
            },
            {"icon": "sentiment_neutral", "description": "Neutral", "color": "gray"},
            {
                "icon": "sentiment_satisfied",
                "description": "Satisfied",
                "color": "green",
            },
            {
                "icon": "sentiment_very_satisfied",
                "description": "Very Satisfied",
                "color": "green",
            },
        ],
    )


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("article_task_table")
    op.drop_table("article_tag_table")
    op.drop_table("article_notification_table")
    op.drop_index(op.f("ix_Article_title"), table_name="Article")
    op.drop_index(op.f("ix_Article_text"), table_name="Article")
    op.drop_index(op.f("ix_Article_source"), table_name="Article")
    op.drop_index(op.f("ix_Article_id"), table_name="Article")
    op.drop_table("Article")
    op.drop_index(op.f("ix_Survey_title"), table_name="Survey")
    op.drop_index(op.f("ix_Survey_id"), table_name="Survey")
    op.drop_index(op.f("ix_Survey_description"), table_name="Survey")
    op.drop_table("Survey")
    op.drop_index(op.f("ix_SentimentSelection_id"), table_name="SentimentSelection")
    op.drop_index(op.f("ix_SentimentSelection_icon"), table_name="SentimentSelection")
    op.drop_index(
        op.f("ix_SentimentSelection_description"), table_name="SentimentSelection"
    )
    op.drop_index(op.f("ix_SentimentSelection_color"), table_name="SentimentSelection")
    op.drop_table("SentimentSelection")
    op.drop_index(op.f("ix_PrivacySelection_name"), table_name="PrivacySelection")
    op.drop_index(op.f("ix_PrivacySelection_id"), table_name="PrivacySelection")
    op.drop_index(op.f("ix_PrivacySelection_icon"), table_name="PrivacySelection")
    op.drop_index(
        op.f("ix_PrivacySelection_description"), table_name="PrivacySelection"
    )
    op.drop_table("PrivacySelection")
    op.drop_index(op.f("ix_User_id"), table_name="User")
    op.drop_index(op.f("ix_User_email"), table_name="User")
    op.drop_table("User")
    op.drop_index(op.f("ix_Task_text"), table_name="Task")
    op.drop_index(op.f("ix_Task_id"), table_name="Task")
    op.drop_table("Task")
    op.drop_index(op.f("ix_Tag_text"), table_name="Tag")
    op.drop_index(op.f("ix_Tag_id"), table_name="Tag")
    op.drop_table("Tag")
    op.drop_index(op.f("ix_Notification_toastClass"), table_name="Notification")
    op.drop_index(op.f("ix_Notification_title"), table_name="Notification")
    op.drop_index(op.f("ix_Notification_text"), table_name="Notification")
    op.drop_index(op.f("ix_Notification_source"), table_name="Notification")
    op.drop_index(op.f("ix_Notification_positionClass"), table_name="Notification")
    op.drop_index(op.f("ix_Notification_id"), table_name="Notification")
    op.drop_table("Notification")
    # ### end Alembic commands ###
