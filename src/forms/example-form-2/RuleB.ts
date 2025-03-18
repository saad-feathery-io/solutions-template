import suh from "core/SomeDependency"
import data from "data/SampleData"

console.log(`from form-1: ${suh()}`)

data.forEach(d => console.log(`role: ${d.role}\t name: ${d.name}`))