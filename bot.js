const { chromium } = require('playwright');

(async () => {

  // Open saved browser profile
  const context = await chromium.launchPersistentContext(
    './chrome-data',
    {
      headless: false
    }
  );

  const page = await context.newPage();

  // Open DAC homepage
  await page.goto('https://inception.dachain.io/');

  console.log("Website opened");

  // Wait load
  await page.waitForTimeout(5000);

  // Enter Inception
  try {

    await page.getByRole('button', {
      name: 'Enter Inception'
    }).click();

    console.log("Entered Inception");

  } catch {}

  // Wait
  await page.waitForTimeout(5000);

  // Open dashboard
  await page.goto('https://inception.dachain.io/dashboard');

  console.log("Dashboard opened");

  // Wait
  await page.waitForTimeout(10000);

  // Open faucet
  try {

    await page.getByRole('banner')
      .getByRole('button', {
        name: 'Faucet'
      }).click();

    console.log("Faucet opened");

  } catch {}

  // Wait
  await page.waitForTimeout(10000);

  // Claim faucet
  try {

    await page.getByRole('button', {
      name: 'Claim Testnet DACC'
    }).click({
      force: true
    });

    console.log("FAUCET CLAIMED SUCCESSFULLY");

  } catch (err) {

    console.log("Claim failed");
    console.log(err);

  }

  // Wait
  await page.waitForTimeout(10000);

  // Close browser
  await context.close();

})();