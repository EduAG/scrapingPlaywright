import {chromium} from 'playwright'

const browser = await chromium.launch(
    {headless: true}
)

const page = await browser.newPage();

await page.goto(
    'https://www.amazon.com.mx/s?k=laptop&i=electronics&__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_1'
)

const products = await page.$$eval(
    '.s-card-container',
    (result) =>(
        result.map((el) =>{
            const title = el.querySelector('h2')?.innerText;
            if(!title) return null;
            const img = el.querySelector('img').getAttribute('src')
            const price = el.querySelector('.a-price .a-offscreen')?.innerText;
             const link = el.querySelector('.a-link-normal').getAttribute('href');

            return {title,img,price,link};
        })
))

console.log(products);
await browser.close();