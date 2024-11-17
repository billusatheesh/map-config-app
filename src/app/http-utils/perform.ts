import { NgxSpinnerService } from "ngx-spinner";
import { catchError, Observable } from "rxjs";

export class Perform<T> {
    data: T | undefined;
    hasError = false;
    private spinner: NgxSpinnerService;
    private action$: Observable<T> | undefined;

    constructor(spinner: NgxSpinnerService) {
        this.spinner = spinner;
    }

    load(action$: Observable<T>): void {
        this.spinner.show();
        this.hasError = false;
        this.action$ = action$;
        this.action$
        .pipe(
            catchError(() => {
                this.data = undefined;
                this.spinner.hide();
                this.hasError = true;
                return [];
            })
        )
        .subscribe((data: T) => {
            this.data = data;
            this.spinner.hide();
            this.hasError = false;
        });
    }
}
