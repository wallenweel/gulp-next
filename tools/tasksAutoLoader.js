import gulp from 'gulp'
import { config } from '../config'

// Get gulp tasks's path synchronously
// import fs from 'fs'
// const tasks = fs.readdirSync(config.path.tasks())

const tasks = config.tasks.entry

export default tasks.forEach(async task =>
  await require(config.path.tasks(task)).default(gulp, config[task], config)
)
