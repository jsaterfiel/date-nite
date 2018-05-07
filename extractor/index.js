const db = require('./db')
const source = require('./source')

class Extractor {
  /**
   * make initial call to get first page of results which will tell us how many total restaurants there are
   */
  async getPage (page) {
    const data = await source.getPage(page)
    return data
  }

  async saveData (locs) {
    await db.insertBulkLocations(locs)
  }

  async purgeData () {
    await db.emptyLocations()
  }

  async addGeoIndex () {
    await db.addGeoIndex()
  }

  async run () {
    await this.purgeData()

    let currentPage = 1
    console.log('Page ' + currentPage)
    let data = await this.getPage(currentPage)
    while (data.restaurants.length > 0) {
      currentPage++
      await this.saveData(data.restaurants)
      data = await this.getPage(currentPage)
      console.log('Page ' + currentPage)
    }

    await this.addGeoIndex()
  }
}

const app = new Extractor()
app.run()
