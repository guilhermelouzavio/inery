import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import Alarm from '../models/Alarm'
import WeekDay from '../models/WeekDay'
import convertHourToMinutes from '../utils/convertToMinute'
// import convertMinutesToHours from '../utils/convertMinutesToHours'

export default {
  async index(req: Request, res: Response){
    const {recipe_id} = req.params

    const alarmRepository = getRepository(Alarm)

    const alarms = alarmRepository.find({
      where : {recipe_id : Number(recipe_id)},
      relations: ['week_days']
    })

    return res.json(alarms)
  },

  async show(req: Request, res: Response){
    const {id} = req.params

    const alarmRepository = getRepository(Alarm)

    const alarm = alarmRepository.findOneOrFail(id)

    return res.json(alarm)

  },
  async create(req: Request, res: Response){
    const {recipe_id} = req.params
    const {hour} = req.body
    const weeks = req.body.weeks as WeekDay[]

    const alarmRepository = getRepository(Alarm)

    console.log("Fora do map", weeks)
    const week_days = weeks.map((week: WeekDay) => {
      console.log("Dentro do map", week)
      return { week_day: week.week_day }
    })

    const data = {
      recipe_id : Number(recipe_id),
      hour : convertHourToMinutes(hour),
      week_days
    }

    const alarm = alarmRepository.create(data)

    await alarmRepository.save(alarm)

    return res.json(alarm)
  }
  //Acho q isso é no front
  // async sendIoT(req: Request, res: Response){
  //     const {week_days, hours} = req.params

  //     convertMinutesToHours(Number(hours))


  // }
}