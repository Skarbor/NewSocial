export class MockModule {
    public readonly moduleLoader: Function;
    public readonly moduleLoaderArguments: Array<any>;
    public readonly componentRoute: string;
    public readonly componentTest: boolean;

    constructor(moduleLoader: Function, componentTest: boolean, componentRoute: string,
        ...moduleLoaderArguments: Array<any>) {
        this.moduleLoader = moduleLoader;
        this.moduleLoaderArguments = moduleLoaderArguments;
        this.componentTest = componentTest;
        this.componentRoute = componentRoute;
    }
}
