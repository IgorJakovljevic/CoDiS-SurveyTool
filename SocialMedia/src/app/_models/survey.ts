import { Post } from "./post";

export class Survey {
    constructor() { }


    newSurvey(id: number) {
        let survey = new Survey();
        survey.id = id;
        return survey
    }

    public id: number = 0;
    public name: string = ""; //TODO: Remove
    public title: string = "";
    public description: string = "";
    public agree: boolean = false;
    public articles: Post[] = [];
    public survey_json: string = "";
    public is_public!: boolean;
}

export class ABSurvey {
    constructor() { }
    public id!: number;
    public survey_A_id!: number;
    public survey_B_id!: number;
    public visit!: number;
}
