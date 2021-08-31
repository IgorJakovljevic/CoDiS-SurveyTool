export class PrivacySelection {
    public id?: number;
    public name: string = "";
    public description: string = "";
    public icon: string = "";
    constructor() {
        this.name = "Friends";
        this.description = "Your friends only";
        this.icon = "people";
    }
}

export class SentimentSelection {
    public id?: number;
    public color: string = "";
    public description: string = "";
    public icon: string = "";
    constructor() {
        this.color = "gray";
        this.description = "Neutral";
        this.icon = "sentiment_neutral";
    }
}


export class Tag {
    public id?: number;
    public text: string = "";
    constructor(text = "") {
        this.text = text;
    }
}

export class Task {
    public id?: number;
    public text: string = "";
    public done?: boolean = false;
    constructor(text = "") {
        this.text = text;
    }
}

export class Post {
    public id: number = 0;
    public title: string = "";
    public text: string = "";
    public source: string = "";
    public sentiment!: SentimentSelection;
    public sentiment_id?: number;
    public privacy!: PrivacySelection;
    public privacy_id?: number;
    public tags: Tag[] = [];
    public commenting: boolean = false;
    public sharing: boolean = false;
    public tweeting: boolean = false;
    public retweeting: boolean = false;

    public doSentiment: boolean = false;
    public doPrivacy: boolean = false;
    public doTags: boolean = false;
    public doShare: boolean = false;
    public doComment: boolean = false;
    public doTweet: boolean = false;

    public notifications: Notification[] = [];
    public tasks: Task[] = [];
    constructor() { }
}

export class Notification {
    public id: number = 0;
    public title: string = "";
    public text: string = "";
    public source: string = "";
    public tags: string[] = [];
    public hideTimeout: number = 0;
    public positionClass: string = "toast-top-right";
    public toastClass: string = 'ngx-toastr';
    public shown: boolean = false;
    constructor() {
    }
}
