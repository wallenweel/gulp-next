import fs from 'fs'
import pug from 'gulp-pug'
import filter from 'gulp-filter'
import replace from 'gulp-replace'
import plumber from 'gulp-plumber'

export default (
  { task, src, dest, changed, $if },
  c,
  cfg
) => {
  const { getValidFiles, path, env, styles, scripts } = cfg

  /**
   * Getting Files'name of A Path
   * @param  {String} type the name in config's origin property
   * @return {Array}       a collection of these files's name, no postfix
   */
  const getFilesName = type =>
    getValidFiles(path.src(cfg[type].cwd.src)).map(k => k.replace(/\.\w+$/, ''))

  const stylesFilenames = getFilesName('styles').join('|')
  const stylesReg = new RegExp(`(\\<link.+href\\=[\\'\\"].*)(${stylesFilenames})(\\.css[\\'\\"].*\\>)`, 'g')

  const scriptsFilenames = getFilesName('scripts').join('|')
  const scriptsReg = new RegExp(`(\\<script.+src\\=[\\'\\"].*)(${scriptsFilenames})(\\.js[\\'\\"].*\\>\\<\\/script\\>)`, 'g')

  const pugFilter = filter('**/*.pug', { restore: true })
  const htmlFilter = filter('**/*.html')

  task('templates', async () => await src(c.src)
    .pipe(plumber())

    .pipe(pugFilter)
    .pipe(pug(c.pug))
    .pipe(pugFilter.restore)

    .pipe(htmlFilter)

    .pipe($if(env.prod, replace(stylesReg, '$1$2' + styles.min + '$3')))
    .pipe($if(env.prod, replace(scriptsReg, '$1$2' + scripts.min + '$3')))

    .pipe(changed(c.dest))
    .pipe(dest(c.dest))
  )

}
