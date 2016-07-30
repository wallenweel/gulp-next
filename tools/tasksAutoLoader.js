import fs from 'fs'
import gulp from 'gulp'

// Get gulp tasks's path synchronously
const tasks = fs.readdirSync('./tasks')

export default tasks.forEach(task => require(`../tasks/${task}`).default(gulp))
