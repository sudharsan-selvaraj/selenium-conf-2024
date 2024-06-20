import { browser } from "@wdio/globals";

async function performLogin(userName = "admin", password = "1234") {
  await browser.takeScreenshot();
  await $('//android.widget.EditText[@text="admin"]').clearValue();
  await $('//android.widget.EditText[@text=""]').addValue(userName);

  await $('//android.widget.EditText[@text="••••"]').clearValue();
  await $('//android.widget.EditText[@text=""]').addValue(password);
  await $("~login_button").click();
  await browser.pause(10000);
}

async function openScreen(screenTitle: string) {
  try {
    await $(
      `//android.view.View[contains(@content-desc,'${screenTitle}')]`
    ).click();
  } catch (e) {
    await browser
      .action("pointer")
      .move({ x: 492, y: 1949 })
      .down()
      .pause(100)
      .move({ duration: 500, x: 481, y: 1226 })
      .up()
      .perform();

    await browser
      .action("pointer")
      .move({ x: 492, y: 1949 })
      .down()
      .pause(100)
      .move({ duration: 500, x: 481, y: 1226 })
      .up()
      .perform();

    await $(
      `//android.view.View[contains(@content-desc,'${screenTitle}')]`
    ).click();
  }
}

async function performDragAndDrop(
  source: WebdriverIO.Element,
  destination: WebdriverIO.Element
) {
  await browser.executeScript("gesture: dragAndDrop", [
    {
      sourceId: source.elementId,
      destinationId: destination.elementId,
    },
  ]);
}

describe("My Login application", () => {
  afterEach(async () => {
    await browser.reloadSession();
  });

  xit("Drag and drop test", async () => {
    await performLogin();

    await openScreen("Drag & Drop");
    await performDragAndDrop(await $("~drag_me"), await $("~drop_zone"));
    await browser.pause(5000);
  });

  it("Mock api test", async () => {
    await performLogin();
    await browser.execute("interceptor: addMock", {
      config: {
        url: "**/sudharsan-selvaraj**",
        method: "GET",
        updateResponseBody: [
          {
            regexp: "<div>Automation enthusiast",
            value: "<div>Oh! My profile is hacked",
          },
        ],
      },
    });
    await browser.execute("interceptor: startListening");
    await openScreen("Web View");
    await browser.pause(10000);
    const apiRequests = await browser.execute("interceptor: stopListening");
    console.log(apiRequests);
  });
});
