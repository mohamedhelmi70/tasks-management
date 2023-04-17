import { Op } from "sequelize"

export default class MainProvider {
  protected providerName: string
  constructor(providerName: string) {
    this.providerName = providerName
  }
  
  protected whereFilters(object: object, fields?: string[]) {
    try {
      var _this = this
      const filters: object = JSON.parse(String(object))
      if (!object || Object.keys(filters).length === 0) return {}
      let where: any = {}
      Object.keys(filters).map(function (key) {
        if (!fields || fields.includes(key)) {
          if (key == "title") {
            where.title = { [Op.like]: `%${filters[`${key}`]}%` }
          } else if (key.substring(0, 2) == "s_") {
            const subKey = _this.lowerize(key.slice(2))
            where[`${subKey}`] = { [Op.like]: `%${filters[`${key}`]}%` }
          } else if (key.substring(0, 3) == "min") {
            const subKey = _this.lowerize(key.slice(3))

            where[`${subKey}`] = { ...where[`${subKey}`], [Op.gte]: Number(filters[`${key}`]) }
          } else if (key.substring(0, 3) == "max") {
            const subKey = _this.lowerize(key.slice(3))
            where[`${subKey}`] = { ...where[`${subKey}`], [Op.lte]: Number(filters[`${key}`]) }
          } else {
            filters[`${key}`] && (where[`${key}`] = filters[`${key}`])
          }
        }
      })
      return where
    } catch (e) {
      return {}
    }
  }
 
  protected lowerize(s: string): string {
    return (s && s[0].toLowerCase() + s.slice(1)) || ""
  }

  protected genrateCode () {
    return Math.floor(1000 + Math.random() * 9000)
  }
}
