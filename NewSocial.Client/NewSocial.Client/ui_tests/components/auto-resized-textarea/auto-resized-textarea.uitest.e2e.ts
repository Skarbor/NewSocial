import { at } from "../../helpers";
import AutoResizedTextareaFixture from "./auto-resized-textarea.fixture";
import { browser } from "protractor";


describe("component =>", () => {
    at("should be visible", async () => {
        AutoResizedTextareaFixture.forUiTests();
        await browser.pause();       
    });
});