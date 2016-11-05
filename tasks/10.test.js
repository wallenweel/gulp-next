export default (
  { task },
  c,
  cfg
) => {
  const test = async () => {
    // console.log(process.argv)
    console.log(cfg.templates.src)
  }

  task(test)
}
