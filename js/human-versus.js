var ligne6=document.querySelectorAll(".ligne6>td");
i=0
for(items of ligne6){
 console.log(items)
 items.addEventListener("click",function(){
  items=ligne6
   items[i].classList="td-player2";
   console.log(items);
   i++
 })
}
