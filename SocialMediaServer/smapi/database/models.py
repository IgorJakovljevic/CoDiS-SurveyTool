from sqlalchemy import Table, Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from smapi.database.engine import Base


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    articles = relationship("Article", back_populates="owner")
    surveys = relationship("Survey", back_populates="owner")


class Tag(Base):
    __tablename__ = "Tag"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)


class Task(Base):
    __tablename__ = "Task"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)


class Notification(Base):
    __tablename__ = "Notification"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    text = Column(String, index=True)
    source = Column(String, index=True)
    positionClass = Column(String, index=True)
    toastClass = Column(String, index=True)
    hideTimeout = Column(Integer)


class PrivacySelection(Base):
    __tablename__ = "PrivacySelection"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    icon = Column(String, index=True)

    articles = relationship("Article", back_populates="privacy")


class SentimentSelection(Base):
    __tablename__ = "SentimentSelection"

    id = Column(Integer, primary_key=True, index=True)
    color = Column(String, index=True)
    description = Column(String, index=True)
    icon = Column(String, index=True)

    articles = relationship("Article", back_populates="sentiment")


article_tag_table = Table(
    "article_tag_table",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("Article.id")),
    Column("tag_id", Integer, ForeignKey("Tag.id")),
)

article_task_table = Table(
    "article_task_table",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("Article.id")),
    Column("task_id", Integer, ForeignKey("Task.id")),
)

article_notification_table = Table(
    "article_notification_table",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("Article.id")),
    Column("notificaiton_id", Integer, ForeignKey("Notification.id")),
)

post_evaluation_tag_table = Table(
    "post_evaluation_tag_table",
    Base.metadata,
    Column("post_evaluation_id", Integer, ForeignKey("PostEvaluation.id")),
    Column("tag_id", Integer, ForeignKey("Tag.id")),
)

post_evaluation_comment_table = Table(
    "post_evaluation_comment_table",
    Base.metadata,
    Column("post_evaluation_id", Integer, ForeignKey("PostEvaluation.id")),
    Column("comment_id", Integer, ForeignKey("Comment.id")),
)


class Article(Base):
    __tablename__ = "Article"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    text = Column(Text)
    source = Column(String, index=True)

    commenting = Column(Boolean, default=True)
    sharing = Column(Boolean, default=True)
    tweeting = Column(Boolean, default=True)
    retweeting = Column(Boolean, default=True)

    doSentiment = Column(Boolean, default=True)
    doPrivacy = Column(Boolean, default=True)
    doTags = Column(Boolean, default=True)
    doShare = Column(Boolean, default=True)
    doComment = Column(Boolean, default=True)
    doTweet = Column(Boolean, default=True)

    sentiment_id = Column(Integer, ForeignKey("SentimentSelection.id"))
    sentiment = relationship(
        "SentimentSelection", back_populates="articles", lazy="subquery"
    )

    privacy_id = Column(
        Integer, ForeignKey("PrivacySelection.id", onupdate="CASCADE"), nullable=False
    )
    privacy = relationship(
        "PrivacySelection", back_populates="articles", lazy="subquery"
    )

    tags = relationship("Tag", secondary=article_tag_table, lazy="joined")
    tasks = relationship(
        "Task",
        secondary=article_task_table,
        order_by="Task.id",
        lazy="joined",
    )
    notifications = relationship(
        "Notification", secondary=article_notification_table, lazy="joined"
    )

    #  comments = relationship("Comment", back_populates="article")

    owner_id = Column(Integer, ForeignKey("User.id"))
    owner = relationship("User", lazy=True)

    survey_id = Column(Integer, ForeignKey("Survey.id"))
    survey = relationship("Survey", lazy=True)


class Survey(Base):
    __tablename__ = "Survey"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    articles = relationship(
        "Article",
        back_populates="survey",
        lazy="joined",
        order_by="Article.id",
        cascade="all, delete-orphan",
    )

    is_public = Column(Boolean, default=False)
    survey_json = Column(Text, default="")
    owner_id = Column(Integer, ForeignKey("User.id"))
    owner = relationship("User", back_populates="surveys")


class Participant(Base):
    __tablename__ = "Participant"

    id = Column(Integer, primary_key=True, index=True)
    hash_code = Column(String)


class Comment(Base):
    __tablename__ = "Comment"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)


class PostEvaluation(Base):
    __tablename__ = "PostEvaluation"
    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer)
    sentiment_id = Column(Integer)
    privacy_id = Column(Integer)
    text = Column(Text, default="")
    tags = relationship("Tag", secondary=post_evaluation_tag_table, lazy="joined")
    comments = relationship(
        "Comment", secondary=post_evaluation_comment_table, lazy="joined"
    )

    evaluation_id = Column(Integer, ForeignKey("Evaluation.id"))
    evaluation = relationship("Evaluation", lazy=True)


class Evaluation(Base):
    __tablename__ = "Evaluation"
    id = Column(Integer, primary_key=True, index=True)
    survey_id = Column(Integer)
    evaluation_json = Column(Text, default="")
    tracking_id = Column(Text, default="")
    post_evaluations = relationship(
        "PostEvaluation",
        back_populates="evaluation",
        lazy="joined",
        order_by="PostEvaluation.id",
        cascade="all, delete-orphan",
    )


class ABSurvey(Base):
    __tablename__ = "ABSurvey"
    id = Column(Integer, primary_key=True, index=True)
    survey_A_id = Column(Integer)
    survey_B_id = Column(Integer)
    visit = Column(Integer, default=0)
