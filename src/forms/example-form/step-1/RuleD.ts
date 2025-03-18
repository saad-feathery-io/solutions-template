import { num2Currency, currency2Num } from "core/Currency"
import suh from "core/SomeDependency"
import data from "data/SampleData"
import fromHelper from "./_helper"

console.log(`from form-1: ${suh()}`)

data.forEach(d => console.log(`name: ${d.name}\trole:${d.role}`))

console.log("Hello Freeman")
console.log(fromHelper())


// actual logic for the logic rule