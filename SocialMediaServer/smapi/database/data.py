import hashlib
import uuid

from sqlalchemy.orm import joinedload

from smapi.database.engine import Base, SessionLocal
from smapi.config import Config
from contextlib import contextmanager
from typing import List
from smapi.database import models, schemas
from fastapi.encoders import jsonable_encoder


class CRUD:
    def __init__(self, entity_type, session):
        self.entity_type = entity_type
        self.session = session

    def get_orm_object(self, element: Base) -> Base:
        print(jsonable_encoder(element))
        return self.entity_type(**jsonable_encoder(element))

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Base]:
        """Retrive All instances of type Entity from databse

        Args:
            entity (Base): Type of Object (e.g. models.User)
            skip (int, optional): Determines how many elements to skip. Defaults to 0.
            limit (int, optional): Determines how many elements to retrieve. Defaults to 100.

        Returns:
            List[Base]: List of Entity Objects
        """
        with self.session() as session:
            return session.query(self.entity_type).offset(skip).limit(limit).all()

    def update(self, entity: Base):
        with self.session() as session:
            to_update = (
                session.query(self.entity_type)
                .filter(self.entity_type.id == entity.id)
                .one()
            )
            # Update model class variable from requested fields
            for var, value in vars(entity).items():
                setattr(to_update, var, value) if value else None
            session.add(to_update)
            return to_update

    def get(self, id: int) -> Base:
        """Retrieves Entity by Id

        Args:
            entity (Base): Entity to retrieve (e.g. models.User)
            id (int): Id of the Entity

        Returns:
            Base: Entity with searched id
        """
        with self.session() as session:
            return (
                session.query(self.entity_type).filter(self.entity_type.id == id).one()
            )

    def insert(self, entity: Base) -> Base:
        """Inserts Entity into Database

        Args:
            entity (Base): Entity to insert

        Returns:
            Base: Inserted Entity
        """
        to_insert = self.get_orm_object(entity)
        with self.session() as session:
            session.add(to_insert)
        return to_insert

    def delete(self, id: int) -> bool:
        """Deletes Entity by Id

        Args:
            entity (Base): Entity to retrieve (e.g. models.User)
            id (int): Id of the Entity

        Returns:
            Base: Entity with searched id
        """
        with self.session() as session:
            entity = (
                session.query(self.entity_type)
                .filter(self.entity_type.id == id)
                .first()
            )
            session.delete(entity)
            return True


class DataSource:
    Task: CRUD

    def __init__(self):
        self.Task = CRUD(models.Task, self.session)
        self.Tag = CRUD(models.Tag, self.session)
        self.Notification = CRUD(models.Notification, self.session)
        self.PrivacySelection = CRUD(models.PrivacySelection, self.session)
        self.SentimentSelection = CRUD(models.SentimentSelection, self.session)
        self.Survey = CRUD(models.Survey, self.session)
        self.Article = CRUD(models.Article, self.session)
        self.User = CRUD(models.User, self.session)
        self.Participant = CRUD(models.Participant, self.session)
        self.Evaluation = CRUD(models.Evaluation, self.session)
        self.ABSurvey = CRUD(models.ABSurvey, self.session)

    @contextmanager
    def session(self):
        """Open Session With Database."""
        session = SessionLocal()
        try:
            yield session
            session.commit()
        except Exception as e:
            session.rollback()
            raise
        finally:
            session.expunge_all()
            session.close()

    def get_orm_object(self, element: Base, entity: Base) -> Base:
        print(jsonable_encoder(element))
        return entity(**jsonable_encoder(element))

    def hash_password(self, password: str) -> str:
        return hashlib.pbkdf2_hmac(
            "sha256",  # The hash digest algorithm for HMAC
            password.encode("utf-8"),  # Convert the password to bytes
            str.encode(Config.SALT),  # Provide the salt
            100000,  # It is recommended to use at least 100,000 iterations of SHA-256
        ).hex()

    def create_participant(self):
        db_participant = models.Participant()
        db_participant.hash_code = uuid.uuid4().hex
        with self.session() as session:
            session.add(db_participant)
        return db_participant

    def get_participant(self, hash_code: str):
        with self.session as session:
            return (
                session.query(models.Participant)
                .filter(models.Participant.hash_code == hash_code)
                .first()
            )

    def create_user(self, user: schemas.User) -> schemas.Preview.User:
        db_user = models.User(
            email=(None if not user.email else user.email),
            username=user.username,
            is_active=False,
        )
        db_user.hashed_password = self.hash_password(user.password)
        with self.session() as session:
            session.add(db_user)
        return db_user

    def get_user_by_email(self, email: str):
        with self.session() as session:
            return session.query(models.User).filter(models.User.email == email).first()

    def get_user_by_username(self, username: str):
        with self.session() as session:
            return (
                session.query(models.User)
                .filter(models.User.username == username)
                .first()
            )

    def get_user_by_token(self, token: str) -> models.User:
        with self.session() as session:
            return (
                session.query(models.User)
                .filter(models.User.hashed_password == token)
                .one()
            )

    def set_article(self, to_insert, article, session):
        to_insert.title = article.title
        to_insert.text = article.text
        to_insert.source = article.source
        to_insert.commenting = article.commenting
        to_insert.sharing = article.sharing
        to_insert.tweeting = article.tweeting
        to_insert.retweeting = article.retweeting
        to_insert.doSentiment = article.doSentiment
        to_insert.doPrivacy = article.doPrivacy
        to_insert.doTags = article.doTags
        to_insert.doShare = article.doShare
        to_insert.doComment = article.doComment
        to_insert.doTweet = article.doTweet
        to_insert.sentiment_id = article.sentiment_id
        to_insert.privacy_id = article.privacy_id
        to_insert.owner_id = article.owner_id
        to_insert.survey_id = article.survey_id

        to_insert.sentiment = (
            session.query(models.SentimentSelection)
            .filter(models.SentimentSelection.id == to_insert.sentiment_id)
            .one()
        )
        to_insert.privacy = (
            session.query(models.PrivacySelection)
            .filter(models.PrivacySelection.id == to_insert.privacy_id)
            .one()
        )

        if (
            hasattr(article, "survey_id")
            and article.survey_id is not None
            and article.survey_id > 0
        ):
            to_insert.survey = (
                session.query(models.Survey)
                .filter(models.Survey.id == article.survey_id)
                .one()
            )
        to_insert.tags = []

        for tag in article.tags:
            if tag.id:
                db_tag = session.query(models.Tag).filter(models.Tag.id == tag.id).one()
                to_insert.tags.append(db_tag)
            else:
                to_insert_tag = models.Tag(text=tag.text)
                session.add(to_insert_tag)
                to_insert.tags.append(to_insert_tag)

        to_insert.tasks = []
        for task in article.tasks:
            if task.id:
                db_task = (
                    session.query(models.Task).filter(models.Task.id == task.id).one()
                )
                db_task.text = task.text
                to_insert.tasks.append(db_task)
            else:
                to_insert_task = models.Task(text=task.text)
                session.add(to_insert_task)
                to_insert.tasks.append(to_insert_task)

        to_insert.notifications = []
        for notification in article.notifications:
            if notification.id:
                db_notification = (
                    session.query(models.Notification)
                    .filter(models.Notification.id == notification.id)
                    .one()
                )
                db_notification.text = notification.text
                db_notification.title = notification.title
                db_notification.text = notification.text
                db_notification.source = notification.source
                db_notification.positionClass = notification.positionClass
                db_notification.toastClass = notification.toastClass
                db_notification.hideTimeout = notification.hideTimeout
                to_insert.notifications.append(db_notification)
            else:
                to_insert_notification = models.Notification()
                to_insert_notification.title = notification.title
                to_insert_notification.text = notification.text
                to_insert_notification.source = notification.source
                to_insert_notification.positionClass = notification.positionClass
                to_insert_notification.toastClass = notification.toastClass
                to_insert_notification.hideTimeout = notification.hideTimeout

                session.add(to_insert_notification)
                to_insert.notifications.append(to_insert_notification)
        return to_insert

    def prepare_article_for_save(self, article, session):
        to_insert = models.Article()
        if hasattr(article, "id") and article.id > 0:
            to_insert = session.query(models.Article).get(article.id)

        to_insert = self.set_article(to_insert, article, session)
        if not hasattr(article, "id"):
            session.add(to_insert)
        return to_insert

    def insert_article(self, article):
        with self.session() as session:
            return self.prepare_article_for_save(article, session)

    def insert_survey(self, survey):
        db_survey = models.Survey()

        with self.session() as session:
            if hasattr(survey, "id") and survey.id is not None and survey.id > 0:
                db_survey = session.query(models.Survey).get(survey.id)

                for db_article in db_survey.articles:
                    delete_article = True
                    for survey_article in survey.articles:
                        if db_article.id == survey_article.id:
                            delete_article = False
                            break

                    if delete_article:
                        session.delete(db_article)

            if len(survey.articles) == 0:
                db_survey.articles = []

            for article in survey.articles:
                if (
                    hasattr(db_survey, "id")
                    and db_survey.id is not None
                    and db_survey.id > 0
                ):
                    article.survey_id = db_survey.id
                db_article = self.prepare_article_for_save(article, session)
                if not hasattr(article, "id"):
                    db_survey.articles.append(db_article)

            db_survey.description = survey.description
            db_survey.title = survey.title
            db_survey.survey_json = survey.survey_json
            session.add(db_survey)
        return db_survey

    def get_public_survey(self, id):
        survey = self.get_survey(id)
        print(survey.is_public)
        if not survey.is_public:
            return None
        return survey

    def get_survey(self, id):
        with self.session() as session:
            return (
                session.query(models.Survey)
                .options(
                    joinedload(models.Survey.articles).subqueryload(
                        models.Article.privacy
                    )
                )
                .filter(models.Survey.id == id)
                .one()
            )

    def set_survey_privacy(self, id, is_public):
        with self.session() as session:
            survey = session.query(models.Survey).get(id)
            survey.is_public = is_public
        return survey.is_public

    def submit_evaluation(self, evaluation: schemas.Evaluation):
        db_eval = models.Evaluation()
        db_eval.evaluation_json = evaluation.evaluation_json
        db_eval.survey_id = evaluation.survey_id
        db_eval.tracking_id = evaluation.tracking_id
        with self.session() as session:

            for post in evaluation.post_evaluations:
                db_post = models.PostEvaluation()
                db_post.article_id = post.article_id
                db_post.sentiment_id = post.sentiment_id
                db_post.privacy_id = post.privacy_id
                db_post.text = post.text
                for tag in post.tags:
                    if tag.id:
                        db_tag = (
                            session.query(models.Tag)
                            .filter(models.Tag.id == tag.id)
                            .one()
                        )
                        db_post.tags.append(db_tag)
                    else:
                        to_insert_tag = models.Tag(text=tag.text)
                        session.add(to_insert_tag)
                        db_post.tags.append(to_insert_tag)

                for comment in post.comments:
                    if comment.id:
                        db_comment = (
                            session.query(models.Comment)
                            .filter(models.Comment.id == comment.id)
                            .one()
                        )
                        db_post.comments.append(db_comment)
                    else:
                        to_insert_comment = models.Comment(text=comment.text)
                        session.add(to_insert_comment)
                        db_post.comments.append(to_insert_comment)

                db_eval.post_evaluations.append(db_post)

            session.add(db_eval)

            return True

    def get_survey_evaluations(self, survey_id, skip, limit):
        with self.session() as session:
            return (
                session.query(models.Evaluation)
                .filter(models.Evaluation.survey_id == survey_id)
                .offset(skip)
                .limit(limit)
                .all()
            )

    def get_ab_survey(self, id):

        with self.session() as session:
            ab_survey = (
                session.query(models.ABSurvey).filter(models.ABSurvey.id == id).one()
            )
            ab_survey.visit = ab_survey.visit + 1

            return ab_survey
