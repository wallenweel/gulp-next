import fs from 'fs'
import gulp from 'gulp'
import { config } from '../config'

// Get gulp tasks's path synchronously
const tasks = fs.readdirSync(config.path.tasks())

export default tasks.forEach(task =>
  require(config.path.tasks(task)).default(gulp, config)
)
