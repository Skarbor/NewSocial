import { browser, by, element } from "protractor";
import { MockModule } from "./mock/mockModule";

export default class Helpers {
    static async prepareBrowser(mockModule: MockModule) {
        let url = "/e2e/mock.html";
        if (mockModule.componentTest) {
            url = "/e2e/" + mockModule.componentRoute + ".html";
        }
        console.log(url);
        browser.removeMockModule("AppModule");
        browser.addMockModule("AppModule", mockModule.moduleLoader, ...mockModule.moduleLoaderArguments);
        await browser.get(url);

        element(by.id("mock-view")).evaluate("$apply()");
    };
};

export function at(expectation: string, assertion: () => Promise<void>, checkConsoleErrors: boolean = true): void {
    it(expectation, async (done) => {
        await executeTest(expectation, assertion, checkConsoleErrors);
        done();
    });
};

async function executeTest(expectation: string, assertion: () => Promise<void>, checkConsoleErrors: boolean = true) {
    console.log(`\n ${expectation} \t result:`);
    await assertion();
    let logs = await browser.manage().logs().get("browser");
    logs = logs.filter((log) => {
        return ((log.level || {}) as any).name === "SEVERE";
    });
    if (logs.length > 0) {
        console.warn(`Test ${expectation} error on console`);
        console.log(logs);
    }
    if (checkConsoleErrors) {
        expect(logs.length).toBe(0, logs);
    }
}