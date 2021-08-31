import { Post, Tag } from "./post";

export class Comment {
    public id?: number;
    public text: string = "";
}

export class EvaluationPost {
    public id: number = 0;
    public article_id: number = 0;
    public post!: Post;
    public doShare: boolean = false;
    public comments: Comment[] = [];
}

export class SubmitEvaluationPost {
    constructor(evaluationPost: EvaluationPost) {
        this.article_id = evaluationPost.article_id;
        this.privacy_id = evaluationPost.post.privacy ? evaluationPost.post.privacy.id : 1;
        this.sentiment_id = evaluationPost.post.sentiment ? evaluationPost.post.sentiment.id : 1;
        this.text = evaluationPost.post.text;
        for (let i = 0; i < evaluationPost.comments.length; i++) {
            const comment = evaluationPost.comments[i];
            let postComment = new Comment();
            postComment.text = comment.text;
            this.comments.push(postComment)
        }
        this.comments = evaluationPost.comments;
        this.tags = evaluationPost.post.tags;
    }

    public article_id: number = 0;
    public sentiment_id?: number = 0;
    public privacy_id?: number = 0;
    public text: string = "";
    public comments: Comment[] = [];
    public tags: Tag[] = [];
}

export class SubmitEvaluation {
    constructor(evaulation: Evaluation) {
        this.survey_id = evaulation.survey_id;
        this.evaluation_json = evaulation.evaluation_json;
        this.tracking_id = evaulation.tracking_id;
        evaulation.evaluation_post.forEach(element => {
            this.post_evaluations.push(new SubmitEvaluationPost(element))
        });
        console.log(this);
    }
    public survey_id!: number;
    public evaluation_json: string = "";
    public tracking_id: string = "";
    public post_evaluations: SubmitEvaluationPost[] = [];
}


export class Evaluation {
    constructor() { }

    public id: number = 0;
    public survey_id!: number;
    public user_id!: number;
    public tracking_id: string = "";
    public evaluation_json: string = "";
    public evaluation_post: Map<string, EvaluationPost> = new Map<string, EvaluationPost>();
}
