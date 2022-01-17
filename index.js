// this is our api
// use express to create back end app
const express = require ('express');
// use this to make api requests
const request = require ('request-promise');
// now that we have we can initialize our app then call express function
const app = express();
// create port
const PORT = process.env.PORT || 5000;
const generateScraperUrl = (apiKey)=> `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

// allow app to parse json input
app.use(express.json());
// make route for our api to fetch products
app.get('/', (req,res)=>{
  res.send('Welcome to Amazone Scraper API')

})
// get product details
app.get('/products/:productId', async (req,res)=>{
  const{productId} = req.params;
  const {api_key} =req.query
  try{
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`)
      res.json(JSON.parse(response))
  } catch(error){
    res.json(error)
  }
})

app.get('/products/:productId/reviews', async (req,res)=>{
  const{productId} = req.params;
  const {api_key} =req.query

  try{
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`)
      res.json(JSON.parse(response))
  } catch(error){
    res.json(error)
  }
})

app.get('/products/:productId/offers', async (req,res)=>{
  const{productId} = req.params;
  const {api_key} =req.query

  try{
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing${productId}`)
      res.json(JSON.parse(response))
  } catch(error){
    res.json(error)
  }
})
app.get('/search/:searchQuery', async (req,res)=>{
  const {searchQuery} = req.params;
  const {api_key} =req.query

  try{
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}/${productId}`)
      res.json(JSON.parse(response))
  } catch(error){
    res.json(error)
  }
})


// start serve for app to listen
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
