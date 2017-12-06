import MockModuleBuilder from "../../mock/mockModuleBuilder";
import Helpers from "../../helpers";

export default class AutoResizedTextareaFixture {
    public static async forUiTests() {
        const moduleBuilder = new MockModuleBuilder()
            .withComponentBinding([{
                name: "placeholder",
                value: "dupa-1"
            }])
            .withRouteToComponent("auto-resized-textarea");
            
        const mockModule = moduleBuilder.build();

        await Helpers.prepareBrowser(mockModule);

        return new AutoResizedTextareaFixture();
    }
}
