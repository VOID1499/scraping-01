//import puppeter from "puppeteer";
import { CronJob } from "cron";
import axios from "axios";
import dotenv from "dotenv";
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();


async function getRandomImageUrl() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `https://api.unsplash.com/photos/random?count=1`;
      const headers = {
        Authorization: process.env.UNSPLASH_KEY,
      };
      const res = await axios.get(url, { headers });
      let urlDownloadImage = `${res.data[0].links.download}&force=true&w=640`;
      //console.log(`Url de la imagen  ${urlDownloadImage}`)
      resolve(urlDownloadImage);
    } catch (error) {
      reject(error);
    }
  });
}

async function downloadImage(url) {

  return new Promise(async (resolve, reject) => {
    try {
      const headers = {
        Authorization: process.env.UNSPLASH_KEY,
      };
      const res = await axios.get(url, { headers, responseType: "stream" });
    
      const currentModulePath = fileURLToPath(import.meta.url);
      const currenPathDir = path.dirname(currentModulePath);
      const savePath = path.resolve(currenPathDir, 'images', 'image.jpg');

      await writeFile(savePath,res.data)
      resolve("Imagen descargada")
    } catch (error) {
      reject(error)
    }
  });
}

const job = new CronJob(
  "*/5 * * * * *",
  async () => {
    try {
      const url = await getRandomImageUrl();
      const res = await downloadImage(url)
      console.log(res)
    } catch (error) {
        console.log(error)
    }
  },
  null,
  true
);



/*

async function login(username,password) {
  const browser = await puppeter.launch({
    headless: false,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(90000);
  await page.goto("https://www.instagram.com");

  const inputUserName = await page.waitForSelector('input[name="username"]');
  const inputPassword = await page.waitForSelector('input[name="password"]');
  await inputUserName.type(username, { delay: 0 });
  await inputPassword.type(password, { delay: 0 });
  await page.click('button[type="submit"]');
  //login

  //browser.close();
  /*
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' }); 
    await page.click('div[role="button"]');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' }); 
    await page.click('button._a9--._a9_1');
    
    await page.click('html._9dls.js-focus-visible._aa4c.wbloks_2 body._a3wf.system-fonts--body.segoe div#mount_0_0_Y0 div div div.x9f619.x1n2onr6.x1ja2u2z div.x78zum5.xdt5ytf.x1n2onr6.x1ja2u2z div.x78zum5.xdt5ytf.x1n2onr6 div.x78zum5.xdt5ytf.x1n2onr6.xat3117.xxzkxad div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1.x1dr59a3.xixxii4.x13vifvy.xeq5yr9.x1n327nk div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj div.x78zum5.x1q0g3np.x1gvbg2u.x1qughib.xleuxlb.xxfw5ft.x1mh60rb.x1f91t4q.x1n2onr6 div.xopu45v.xu3j5b3.xm81vs4.x1vjfegm div.x1xgvd2v.x1o5hw5a.xaeubzz.x1cy8zhl.xvbhtw8.x9f619.x78zum5.xdt5ytf.x1gvbg2u.x1y1aw1k.xn6708d.xx6bls6.x1ye3gou div.x1iyjqo2.xh8yej3 div div.x1n2onr6 span.x4k7w5x.x1h91t0o.x1h9r5lt.x1jfb8zj.xv2umb2.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1qrby5j div.x1n2onr6 a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz._a6hd div.x9f619.x3nfvp2.xr9ek0c.xjpr12u.xo237n4.x6pnmvc.x7nr27j.x12dmmrz.xz9dl7a.xn6708d.xsag5q8.x1ye3gou.x80pfx3.x159b3zp.x1dn74xm.xif99yt.x172qv1o.x10djquj.x1lhsz42.xzauu7c.xdoji71.x1dejxi8.x9k3k5o.xs3sg5q.x11hdxyr.x12ldp4w.x1wj20lx.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c div.x6s0dn4.x9f619.xxk0z11.x6ikm8r.xeq5yr9.x1swvt13.x1s85apg.xzzcqpx div div span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.xl565be.xo1l8bm.x5n08af.x1tu3fi.x3x7a5m.x10wh9bi.x1wdrske.x8viiok.x18hxmgj span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft')
 
    //const page2 = await browser.newPage();
    //page2.setDefaultNavigationTimeout(90000);
    //await page.goto("https://www.instagram.com/void.1499");
  }
  */
