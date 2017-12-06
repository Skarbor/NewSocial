import { MockModule } from "./MockModule";
import { MockRequest } from "./MockRequest";

declare var angular: any;
export class ComponentBinding {
    name: string;
    value: any;
}
export default class MockModuleBuilder {
    public viewRoute: string;
    public componentRoute: string;
    public requests: Array<MockRequest> = new Array();
    public mockRoutesEnabled: boolean = false;
    public mockRequestsEnabled: boolean = false;
    public componentTestEnabled: boolean = false;
    public runFunctionAtStart = false;
    public functionTuRunAtStart = "";

    private mockOuterControllerEnabled: boolean = false;
    private mockedScopeData: ComponentBinding[];

    withRouteToView(route: string) {
        this.mockRoutesEnabled = true;
        this.viewRoute = route;
        return this;
    }

    withMethodRunAtStart(functionToRun: string) {
        this.runFunctionAtStart = true;
        this.functionTuRunAtStart = functionToRun;
        return this;
    }

    withRouteToComponent(route: string) {
        this.componentTestEnabled = true;
        this.componentRoute = route;
        return this;
    }
    withGet(url: string, response: any) {
        this.mockRequestsEnabled = true;
        this.requests.push(new MockRequest("GET", url, response));
        return this;
    }
    withPost(url: string, response: any) {
        this.mockRequestsEnabled = true;
        this.requests.push(new MockRequest("POST", url, response));
        return this;
    }
    public withComponentBinding(scopeArgs: ComponentBinding[]) {
        this.mockOuterControllerEnabled = true;
        this.mockedScopeData = scopeArgs;
        return this;
    }

    private moduleLoader = (route: string, requests: Array<MockRequest>, mockedScopeData: ComponentBinding[],
        mockRoutesEnabled: boolean, mockRequestsEnabled: boolean,
        mockOuterControllerEnabled: boolean, runFunctionAtStart: boolean, functionTuRunAtStart: string) => {

        let angularE2eModule = angular.module("appmap-e2e", ["appmap", "ngMockE2E"]);
        if (mockRoutesEnabled) {
            angularE2eModule = angularE2eModule.config(["$urlRouterProvider", "$locationProvider",
                ($urlRouterProvider: any, $locationProvider: any) => {
                    $locationProvider.html5Mode(false).hashPrefix("");
                    $urlRouterProvider.otherwise(route);
                }]);
        }

        if (mockRequestsEnabled) {
            angularE2eModule.run(($httpBackend: any) => {
                requests.forEach(r => {
                    const response = r.response;
                    switch (r.method) {
                    case "GET":
                        $httpBackend.whenGET(new RegExp(r.url + ".*"))
                            .respond((method: any, url: any, data: any) => {
                                if (url == null) {
                                    url = "url";
                                }
                                const json = angular.toJson(response);
                                console.warn(`GET: ${url} data retured ${json}`);
                                return [200, response, {}];
                            });
                        break;
                    case "POST":
                        $httpBackend.whenPOST(new RegExp(r.url + ".*"))
                            .respond((method: any, url: any, data: any) => {
                                if (url == null) {
                                    url = "url";
                                }
                                const json = angular.toJson(response);
                                console.warn(`POST: ${url} data retured ${json}`);
                                return [200, response, {}];
                            });
                        break;
                    }
                });
            });
        }

        console.warn(runFunctionAtStart);
        if (runFunctionAtStart) {
            console.warn("running below function at start");
            const functionToRun = "angularE2eModule = angular.module(\"appmap-e2e\");"
                + "angularE2eModule.run( " +
                functionTuRunAtStart +
                " );";

            console.warn(functionToRun);
            /* tslint:disable:no-eval*/
            eval(functionToRun);
        }

        if (mockOuterControllerEnabled) {
            // it is impossible to send function as a argument here.
            // protractor is using apply with null as this and it 
            // is serializing arguments to string 
            angularE2eModule.controller("mockedCtrl", ($scope: any) => {
                mockedScopeData.forEach((obj: ComponentBinding) => {
                    $scope[obj.name] = obj.value;
                });
            });
        }
    }
    build(): MockModule {

        return new MockModule(
            this.moduleLoader, this.componentTestEnabled, this.componentRoute, this.viewRoute,
            this.requests, this.mockedScopeData, this.mockRoutesEnabled, this.mockRequestsEnabled,
            this.mockOuterControllerEnabled, this.runFunctionAtStart, this.functionTuRunAtStart);
    };
}
