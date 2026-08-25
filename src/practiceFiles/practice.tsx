import React from "react"
import { useState } from "react"

type BountyStatus = "available" | "accepted" | "completed"

interface Bounty {
    id: number
    title: string
    reward: number
    status: BountyStatus
}

const startingBounties: Bounty[] = [
    {
        id: 1,
        title: "Clear the Goblin Camp",
        reward: 250,
        status: "available"
    },
    {
        id: 2,
        title: "Escort the Merchant",
        reward: 125,
        status: "accepted"
    }
]

type Filter = "all" | "available" | "accepted" | "completed"
type FormBounty = {
  title: string
  reward: number
  status: BountyStatus
}

export default function BountyBoard(): React.JSX.Element {
  const [bounty, setBounty] = useState<Bounty[]>(startingBounties)
  const [filter, setFilter] = useState<Filter>("all")
  const [formData, setFormData] = useState<FormBounty>({
  title: '',
  reward: 0,
  status: "available"
})

const userForm: React.JSX.Element = <form>
<label htmlFor="title"> Title </label>  
<input type="text" id="title" name="title" placeholder="Billy the Kid" value={formData.title} onChange={(e)=>{setFormData(prevData => {return {...prevData, title: e.target.value}})}}/>
<label htmlFor="reward"> Reward</label>
<input type="number" id="reward" name="reward" placeholder="1000" value={formData.reward} onChange={(e)=>{setFormData(prevData => {return {...prevData, reward: Number(e.target.value)}})}}/>
<label htmlFor="status"> Status </label>
<select value={formData.status} onChange={(e)=>setFormData(prevData=>{
  const newStatus = e.target.value as BountyStatus
  return {...prevData, statu: newStatus}
  })}>
  <option value="available">Avaialbe</option>
  <option value="accepted">Accepted </option>
  <option value="completed">Completed</option>
</select>
</form>

  function advanceBountyStatus(id:number):void{
    setBounty(bounty.map(bount=>{
      if (bount.id === id){
        const advancement: "accepted"|"completed" = bount.status === "available"? "accepted": bount.status ==="accepted"? "completed" : 'completed'
        return {...bount, status: advancement }
      }
     return bount
    }))
  }

  const filteredBounties: Bounty[] = bounty.filter((bount:Bounty):boolean => {
    if (filter === "all"){
      return true
    }

    return bount.status === filter
  })

  const displayedBounties:React.JSX.Element[] = filteredBounties.map(bount => {
  const buttonText: string = bount.status === 'available'? 'Accept Bounty': bount.status === "accepted"? 'Complete Bounty': "Completed"
   return (
    <div key={bount.id}> 
    <h2> {bount.title} </h2>
    <p> {bount.reward} </p>
    <p> {bount.status} </p>
    <button onClick={()=>{advanceBountyStatus(bount.id)}} disabled={bount.status==="completed" ? true:false}> {buttonText} </button> 
    </div>
  )
  }) 

  const btnArr:Filter[] =["all" , "available" , "accepted" , "completed"]

  const filterButtons: React.JSX.Element[] = btnArr.map((btn:Filter):React.JSX.Element => <button key={btn} onClick={()=>setFilter(btn)} disabled={filter===btn}>{btn}</button>)

  return (
    <main>
    {userForm}  
    {filterButtons}   
    {displayedBounties}
    </main>
  )
}