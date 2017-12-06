export class MockRequest {
    constructor(public method: string, public url: string,
        public response: any, public isResponseFunction: boolean = false) {

    }
}
