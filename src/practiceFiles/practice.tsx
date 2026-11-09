// import React from "react"
// import { useState } from "react"

// type BountyStatus = "available" | "accepted" | "completed"

// interface Bounty {
//     id: number
//     title: string
//     reward: number
//     status: BountyStatus
// }

// const startingBounties: Bounty[] = [
//     {
//         id: 1,
//         title: "Clear the Goblin Camp",
//         reward: 250,
//         status: "available"
//     },
//     {
//         id: 2,
//         title: "Escort the Merchant",
//         reward: 125,
//         status: "accepted"
//     }
// ]

// type Filter = "all" | "available" | "accepted" | "completed"
// type FormBounty = {
//   title: string
//   reward: number
//   status: BountyStatus
// }

// export default function BountyBoard(): React.JSX.Element {
//   const [bounty, setBounty] = useState<Bounty[]>(startingBounties)
//   const [filter, setFilter] = useState<Filter>("all")
//   const [formData, setFormData] = useState<FormBounty>({
//   title: '',
//   reward: 0,
//   status: "available"
// })

// function handleSubmit(e:React.FormEvent<HTMLFormElement>):void{
// e.preventDefault()
// const bountyIds: number[] = bounty.map((bount:Bounty):number=> bount.id)
// let maxId: number = bountyIds.length === 0 ? 0 : Math.max(...bountyIds)
// const newBounty ={
//   id: ++maxId,
//   ...formData
// }
// setBounty(prevBounty => [...prevBounty, newBounty])
// setFormData({
//   title: '',
//   reward: 0,
//   status: "available"
// })
// }

// const userForm: React.JSX.Element = <form onSubmit={handleSubmit}>
// <label htmlFor="title"> Title </label>  
// <input type="text" id="title" name="title" placeholder="Billy the Kid" value={formData.title} onChange={(e)=>{setFormData(prevData => {return {...prevData, title: e.target.value}})}}/>
// <label htmlFor="reward"> Reward</label>
// <input type="number" id="reward" name="reward" placeholder="1000" value={formData.reward} onChange={(e)=>{setFormData(prevData => {return {...prevData, reward: Number(e.target.value)}})}}/>
// <label htmlFor="status"> Status </label>
// <select value={formData.status} onChange={(e)=>setFormData(prevData=>{
//   const newStatus = e.target.value as BountyStatus
//   return {...prevData, status: newStatus}
//   })}>
//   <option value="available">Avaialbe</option>
//   <option value="accepted">Accepted </option>
//   <option value="completed">Completed</option>
// </select>
// <button>Submit</button>
// </form>

//   function advanceBountyStatus(id:number):void{
//     setBounty(bounty.map(bount=>{
//       if (bount.id === id){
//         const advancement: "accepted"|"completed" = bount.status === "available"? "accepted": bount.status ==="accepted"? "completed" : 'completed'
//         return {...bount, status: advancement }
//       }
//      return bount
//     }))
//   }

//   const filteredBounties: Bounty[] = bounty.filter((bount:Bounty):boolean => {
//     if (filter === "all"){
//       return true
//     }

//     return bount.status === filter
//   })

//   const displayedBounties:React.JSX.Element[] = filteredBounties.map(bount => {
//   const buttonText: string = bount.status === 'available'? 'Accept Bounty': bount.status === "accepted"? 'Complete Bounty': "Completed"
//    return (
//     <div key={bount.id}> 
//     <h2> {bount.title} </h2>
//     <p> {bount.reward} </p>
//     <p> {bount.status} </p>
//     <button onClick={()=>{advanceBountyStatus(bount.id)}} disabled={bount.status==="completed" ? true:false}> {buttonText} </button> 
//     </div>
//   )
//   }) 

//   const btnArr:Filter[] =["all" , "available" , "accepted" , "completed"]

//   const filterButtons: React.JSX.Element[] = btnArr.map((btn:Filter):React.JSX.Element => <button key={btn} onClick={()=>setFilter(btn)} disabled={filter===btn}>{btn}</button>)

//   return (
//     <main>
//     {userForm}  
//     {filterButtons}   
//     {displayedBounties}
//     </main>
//   )
// }

// import { useState } from "react"

// type Transaction = {
//     id: string
//     description: string
//     amount: number
//     category: "income" | "expense"
// }

// const transactions: Transaction[] = [
//     { id: "1", description: "Paycheck", amount: 2500, category: "income" },
//     { id: "2", description: "Groceries", amount: 120, category: "expense" },
//     { id: "3", description: "Freelance", amount: 500, category: "income" },
//     { id: "4", description: "Gas", amount: 45, category: "expense" }
// ]

// export default function TransactionList(){
  
//   const [filter, setFilter] = useState<"all"|"income"|"expense">("all")

//   const filteredList = transactions.filter(transaction => transaction.category === filter || filter === "all")

//   const displayedTransactions = filteredList.map(transaction =>{
//       return <li key={transaction.id}>transaction</li>
//   })

//   const total = filteredList.reduce((accumulator, transaction)=> {return accumulator + transaction.amount}, 0)

//   return (
//     <>
//     <ul>
//     {displayedTransactions}
//     </ul>
//     {total}
//     <button onClick={()=>{setFilter("all")}}> All </button>
//     <button onClick={()=>{setFilter("income")}}> Income </button>
//     <button onClick={()=>{setFilter("expense")}}> Expense </button>
//     </>
//   )
// }

// async function getUserAnswer(question:string): Promise<string>{
//   try{
//     const {route} = await routeUserQuestion(question)
//     let answer = ''

//     switch (route){
//       case "direct":
//         answer = await getDirectAnswer(question)
//         break
//       case "knowledge_base":
//         answer  = await getKnowledgeAnswer(question)
//         break
//       case "web":
//         answer = await getWebAnswer(question)
//         break
//       default:
//         throw new Error("unable to get result")

//     }

//     return answer

//   }catch(error){
//     console.error(error)
//     throw error
//   }

// }

async function getPackageSummary(package:string):Promise<string>{
  try{
    const info = await fetchPackageInfo(package)
    if (!info){
      return "package not found"
    }
    const dependenciesArrCOnversion = Object.entries(info.dependencies)
     return `${info.name}, ${info.version} has ${dependenciesArrCOnversion.length} dependencies.`
  }catch(error){
    console.log(error)
    throw error
  }
}

const limit = Math.min(100, Math.max(1, Number(limitQuery)))



type Pagination = {
    page: number
    limit: number
    offset: number
}

function getPagination(pageQuery: string, limitQuery: string): Pagination {
  const pageNumber = Number(pageQuery)
  const limitNumber = Number(limitQuery)
  let page = Math.max(1, pageNumber)
  let limit = Math.max(1, limitNumber)
  if(Number.isNaN(pageNumber) || !Number.isInteger(pageNumber)){
    page = 1 
  }
  if(Number.isNaN(limitNumber) || !Number.isInteger(limitNumber) || 0){
    limit = 10 
  }
  
  const offset = page * limit - limit 

  return {page,limit, offset}
  
}