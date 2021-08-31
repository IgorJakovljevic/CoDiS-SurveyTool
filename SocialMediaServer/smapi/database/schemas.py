from typing import List, Optional
from smapi.database import models
from pydantic import BaseModel
from pydantic_sqlalchemy import sqlalchemy_to_pydantic


class OwnableModel(BaseModel):
    """Ownable Model Schema

    Args:
        BaseModel (BaseModel): Inherits from BaseModel
    """

    owner_id: int


class IdentityModel(BaseModel):
    """Identity Model Schema

    Args:
        BaseModel (BaseModel): Inherits from BaseModel
    """

    id: int


class OwnableIdentityModel(BaseModel):
    """Ownable Identity Model Schema

    Args:
        BaseModel (BaseModel): Inherits from BaseModel
    """

    id: Optional[int]
    owner_id: int


class Task(BaseModel):
    """Task Identity Model

    Args:
        IdentityModel (schema.IdentityModel): Inherits Identity Properties
    """

    id: Optional[int]
    text: str = ""

    class Config:
        orm_mode = True


class Tag(BaseModel):
    """Tag Schema Model

    Args:
        BaseModel (schema.BaseModel): Inherits Identity Properties
    """

    id: Optional[int]
    text: str = ""

    class Config:
        orm_mode = True


class Comment(BaseModel):
    """Comment Schema Model

    Args:
        BaseModel (schema.BaseModel): Inherits Identity Properties
    """

    id: Optional[int]
    text: str = ""

    class Config:
        orm_mode = True


class User(BaseModel):
    """User Schema Model

    Args:
        BaseModel (schema.BaseModel): Inherits Identity Properties
    """

    email: Optional[str]
    username: str
    password: str

    class Config:
        orm_mode = True


class Notification(BaseModel):
    """Notification Schema Model

    Args:
        BaseModel (schema.BaseModel): Inherits Identity Properties
    """

    id: Optional[int]
    title: str = ""
    text: str = ""
    source: str = ""
    positionClass: str = ""
    toastClass: str = ""
    hideTimeout: int = 0

    class Config:
        orm_mode = True


class PrivacySelection(BaseModel):
    id: Optional[int]
    name: str
    description: str
    icon: str

    class Config:
        orm_mode = True


class SentimentSelection(BaseModel):
    id: Optional[int]
    color: str
    description: str
    icon: str

    class Config:
        orm_mode = True


class ArticleSurvey(BaseModel):
    title: str
    description: str

    class Config:
        orm_mode = True


class AuthToken(BaseModel):
    """User Schema Model

    Args:
        BaseModel (schema.BaseModel): Inherits Identity Properties
    """

    access_token: str
    token_type: str
    user_id: int


class SurveyArticle(OwnableModel):
    title: str
    text: str
    source: str

    commenting: bool
    sharing: bool
    tweeting: bool
    retweeting: bool

    doSentiment: bool
    doPrivacy: bool
    doTags: bool
    doShare: bool
    doComment: bool
    doTweet: bool

    sentiment_id: Optional[int]
    privacy_id: Optional[int]

    tags: Optional[List[Tag]] = []
    tasks: Optional[List[Task]] = []
    notifications: Optional[List[Notification]] = []

    class Config:
        orm_mode = True


class Article(SurveyArticle):
    id: Optional[int]
    survey_id: Optional[int]
    privacy: Optional[PrivacySelection]
    sentiment: Optional[SentimentSelection]


class Survey(BaseModel):
    title: str
    description: str
    survey_json: str
    articles: Optional[List[Article]] = None


class PostEvaluation(BaseModel):
    id: Optional[int]
    article_id: Optional[int]
    sentiment_id: Optional[int]
    privacy_id: Optional[int]
    evaluation_id: Optional[int]
    text: str = ""
    tags: Optional[List[Tag]] = []
    comments: Optional[List[Comment]]

    class Config:
        orm_mode = True


class Evaluation(BaseModel):
    id: Optional[int]
    survey_id: Optional[int]
    tracking_id: str = ""
    evaluation_json: str = ""
    post_evaluations: Optional[List[PostEvaluation]] = None


class ParticipantSimple(BaseModel):
    id: Optional[int]
    hash_code: Optional[str]

    class Config:
        orm_mode = True


class Participant(ParticipantSimple):
    evaluations: Optional[List[Evaluation]] = []


class ABSurvey(BaseModel):
    id: Optional[int]
    survey_A_id: Optional[int]
    survey_B_id: Optional[int]
    visit: Optional[int]

    class Config:
        orm_mode = True


class Preview:
    class User(IdentityModel):
        email: Optional[str]
        username: str
        is_active: bool

        class Config:
            orm_mode = True

    class Survey(IdentityModel, Survey):
        is_public: bool = False

        class Config:
            orm_mode = True

    class Task(IdentityModel, Task):
        pass

    class Tag(IdentityModel, Tag):
        pass

    class Notification(IdentityModel, Notification):
        pass

    class PrivacySelection(IdentityModel, PrivacySelection):
        pass

    class SentimentSelection(IdentityModel, SentimentSelection):
        pass

    class Article(IdentityModel, Article):
        pass

    class EvaluationSimple(IdentityModel):
        survey_id: int
        evaluation_json: str = ""
        post_evaluations: Optional[List[PostEvaluation]] = None

        class Config:
            orm_mode = True

    class ABSurvey(IdentityModel):
        survey_A_id: Optional[int]
        survey_B_id: Optional[int]
        visit: Optional[int]

        class Config:
            orm_mode = True


PydanticArticle = sqlalchemy_to_pydantic(models.Article)
PydanticSurvey = sqlalchemy_to_pydantic(models.Survey)
