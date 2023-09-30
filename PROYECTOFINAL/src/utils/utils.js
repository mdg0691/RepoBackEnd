import path, { dirname, join } from "path"
import { fileURLToPath } from "url"


// const __filename = path.dirname(fileURLToPath(import.meta.url))// una forma de llegar a src
const __dirname = join(dirname(fileURLToPath(import.meta.url)),'/..')


export default __dirname
