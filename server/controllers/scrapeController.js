const puppeteer = require('puppeteer');
const fs = require('fs');

const scrapeData = async (req, res) => {

    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    await page.goto('https://www.carproblemzoo.com/');

    // Extract all car makes
    const makes = await page.evaluate(() => {
    const makeOptions = Array.from(document.querySelectorAll('#select_make option'));
        return makeOptions.slice(1).map(option => option.value);
    });
    console.log(makes)

    const carData = [];

    for (const make of makes) {
    const makeData = {
        make,
        models: [],
    };
    console.log(makeData)
    
    await page.goto('https://www.carproblemzoo.com/');
    await page.waitForSelector('#select_make');
    await page.select('#select_make', make);
    await page.waitForNavigation()

    // Extract all car models for the current make
    const models = await page.evaluate(() => {
        const modelOptions = Array.from(document.querySelectorAll('#select_model option'));
        return modelOptions.slice(1).map(option => option.value);
    });

    for (const model of models) {
        const modelData = {
        model,
        years: [],
        };

        await page.waitForSelector('#select_model');
        await page.select('#select_model', model);
        await page.waitForNavigation()
        console.log('URL model', page.url())

        // Extract all car years for the current model
        const years = await page.evaluate(() => {
        const yearOptions = Array.from(document.querySelectorAll('#select_year option'));
            return yearOptions.slice(1).map(option => option.value);
        });

        modelData.years = years;
        makeData.models.push(modelData);

    }

    carData.push(makeData);
    console.log(carData)
    }

    // Save the scraped data to a JSON file
    const outputData = JSON.stringify(carData, null, 2);
    const filePath = path.join(__dirname, '..', "data", "car_data.json");
    fs.writeFileSync(filePath, outputData);

    res.status(200)

    await browser.close();
};

const scrapeProblem = async (req, res) => {
    const {make, model, year, category} = req.body

    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    await page.goto(`https://www.carproblemzoo.com/${make}${model}${year}`);

    const categoryElement = await page.$x(`//a[text()="${category}"]`);

    if (categoryElement.length > 0) {
      await categoryElement[0].scrollIntoView();
      await categoryElement[0].click();
      await page.waitForNavigation();

      const categoryLinks = await page.$x(`//td/span/a[contains(., "${category}")]`);
  
      if (categoryLinks.length > 0) {
          await categoryLinks[0].scrollIntoView();
          await categoryLinks[0].click();
          await page.waitForNavigation();

          // Scrape text from all elements with class "ptext_list"
          const scrapedData = await page.$$eval('.ptext_list', elements =>
              elements.map(element => element.textContent)
          );

          res.json(scrapedData);
      } else {
          // Scrape text from all elements with class "ptext_list" without clicking
          const scrapedData = await page.$$eval('.ptext_list', elements =>
              elements.map(element => element.textContent)
          );

          res.json(scrapedData);
      }
    } else {
      const error = 'Category link not found';
      res.status(404).json({ error });
    }

    await browser.close();
}

module.exports = {
    scrapeData,
    scrapeProblem
}