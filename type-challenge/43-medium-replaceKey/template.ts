type ReplaceKeys<U extends object, T extends any, Y extends object, X extends keyof U = keyof U, Z extends keyof Y> = {

}

type NodeA = {
    type: 'A'
    name: string
    flag: number
  }
  
  type NodeB = {
    type: 'B'
    id: number
    flag: number
  }
  
  type NodeC = {
    type: 'C'
    name: string
    flag: number
  }

type union = NodeA | NodeB | NodeC

type c = Permutation<union>