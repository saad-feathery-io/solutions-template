import suh from "core/SomeDependency"
import data from "data/SampleData"

console.log(`from form-1: ${suh()}`)

data.forEach(d => console.log(`name: ${d.name}\trole:${d.role}`))

console.log("Hello Freeman")