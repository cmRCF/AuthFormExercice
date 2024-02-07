import { Text, TouchableOpacity } from "react-native";

export function AgeCounter() {
  let age = 30
  function increaseAge() {
    age++
    console.log("J'augmente l'age ! ", age)
  }
  console.log(age)
  return (
    <>
      <TouchableOpacity onPress={increaseAge}>
        <Text style={{ fontSize: 40 }}>Augmenter</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 40 }}>J'ai {age} ans</Text>
    </>
  )
}