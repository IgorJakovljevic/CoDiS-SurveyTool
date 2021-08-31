import { Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safeHtml' })
export class SafeHTML {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: any) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
